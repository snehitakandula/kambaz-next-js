"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as client from "../../../../client";
import type { Quiz, Question } from "../../../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = cid as string;
  const quizId = qid as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
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

  const grade = () => {
    if (!quiz || !quiz.questions) return;

    let total = 0;

    quiz.questions.forEach((q) => {
      const ans = answers[q._id as string];

      if (q.type === "MULTIPLE_CHOICE") {
        const correct = q.choices?.findIndex((c) => c.correct);
        if (ans === correct) total += q.points;
      } else if (q.type === "TRUE_FALSE") {
        if (ans === q.correctBoolean) total += q.points;
      } else if (q.type === "FILL_IN_BLANK") {
        const cleaned = (ans || "").trim().toLowerCase();
        if (q.correctAnswers?.some((a) => a.trim().toLowerCase() === cleaned)) {
          total += q.points;
        }
      }
    });

    setScore(total);
    setSubmitted(true);
  };

  if (!quiz) return <div className="p-3">Loading preview...</div>;

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>Preview: {quiz.title}</h3>

      {submitted && (
        <div className="alert alert-info">
          Score: {score} / {quiz.points}
        </div>
      )}

      {quiz.questions?.map((q: Question, idx) => (
        <Card className="mb-3" key={q._id || idx}>
          <Card.Header>
            <strong>
              Question {idx + 1}: {q.title}
            </strong>
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

            {/* True / False */}
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

            {/* Fill In The Blank */}
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

      <div className="d-flex justify-content-end gap-2">
        {!submitted && (
          <Button variant="primary" onClick={grade}>
            Submit Preview
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/Courses/${courseId}/Quizzes/${quizId}`)
          }
        >
          Back
        </Button>
      </div>
    </div>
  );
}
