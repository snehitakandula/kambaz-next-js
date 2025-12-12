"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as client from "../../../../client";
import type { Quiz, Question } from "../../../../client";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = cid as string;
  const quizId = qid as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(quizId);
      setQuiz(q);
    };
    load();
  }, [quizId]);

  const setAnswer = (qid: string, ans: any) => {
    setAnswers({ ...answers, [qid]: ans });
  };

  const submitQuiz = async () => {
    const list = Object.entries(answers).map(([qid, ans]) => ({
      questionId: qid,
      selectedChoiceId:
        typeof ans === "string" && ans.startsWith("choice:") 
          ? ans.replace("choice:", "")
          : undefined,
      selectedBoolean:
        typeof ans === "boolean" ? ans : undefined,
      textAnswer:
        typeof ans === "string" && !ans.startsWith("choice:")
          ? ans
          : undefined,
    }));

    const attempt = await client.submitQuizAttempt(quizId, list);
    setSubmitted(true);

    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Attempts`);
  };

  if (!quiz) return <div className="p-3">Loading quiz...</div>;

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>Take Quiz: {quiz.title}</h3>

      {quiz.questions.map((q: Question, idx) => (
        <Card className="mb-3" key={q._id || idx}>
          <Card.Header>
            <strong>Question {idx + 1}:</strong> {q.title}
            <span className="float-end">{q.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p>{q.questionText}</p>

            {/* Multiple Choice */}
            {q.type === "MULTIPLE_CHOICE" &&
              q.choices?.map((c) => (
                <Form.Check
                  key={idx}
                  type="radio"
                  name={`q-${q._id}`}
                  label={c.text}
                  checked={answers[q._id as string] === idx}
                  onChange={() => setAnswer(q._id as string, idx)}
                />
              ))}

            {/* True/False */}
            {q.type === "TRUE_FALSE" && (
              <>
                <Form.Check
                  type="radio"
                  label="True"
                  name={`q-${q._id}`}
                  checked={answers[q._id as string] === true}
                  onChange={() => setAnswer(q._id as string, true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={`q-${q._id}`}
                  checked={answers[q._id as string] === false}
                  onChange={() => setAnswer(q._id as string, false)}
                />
              </>
            )}

            {/* Fill in the Blank */}
            {q.type === "FILL_IN_BLANK" && (
              <Form.Control
                placeholder="Enter answer"
                value={answers[q._id as string] || ""}
                onChange={(e) =>
                  setAnswer(q._id as string, e.target.value)
                }
              />
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="primary" onClick={submitQuiz}>
          Submit Quiz
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/Courses/${courseId}/Quizzes/${quizId}`)
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
