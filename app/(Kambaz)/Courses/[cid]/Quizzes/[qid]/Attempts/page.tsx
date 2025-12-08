"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizAttemptsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const quizId = qid as string;
  const courseId = cid as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(quizId);
      setQuiz(q);

      const a = await client.findLastAttemptForQuiz(quizId);
      setAttempt(a);
    };
    load();
  }, [quizId]);

  if (!quiz) return <div className="p-3">Loading...</div>;
  if (!attempt)
    return (
      <div className="p-3">
        <h4>No attempts yet</h4>
      </div>
    );

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>Your Latest Attempt</h3>

      <div className="alert alert-info">
        Score: {attempt.score} / {quiz.points} <br />
        Submitted: {new Date(attempt.submittedAt).toLocaleString()}
      </div>

      {quiz.questions.map((q: any, idx: number) => {
        const ans = attempt.answers.find(
          (a: any) => a.questionId === q._id
        );

        let isCorrect = false;

        if (q.type === "MULTIPLE_CHOICE") {
          const correctChoice = q.choices.find((c: any) => c.isCorrect)?._id;
          isCorrect = ans?.selectedChoiceId === correctChoice;
        } else if (q.type === "TRUE_FALSE") {
          isCorrect = ans?.selectedBoolean === q.correctBoolean;
        } else if (q.type === "FILL_IN_BLANK") {
          const text = ans?.textAnswer?.trim().toLowerCase();
          isCorrect =
            q.correctAnswers?.some(
              (a: any) => a.trim().toLowerCase() === text
            ) ?? false;
        }

        return (
          <Card key={q._id} className="mb-3">
            <Card.Header>
              <strong>
                Question {idx + 1}: {q.title}
              </strong>
              <span className="float-end">
                {isCorrect ? "✔ Correct" : "✘ Incorrect"}
              </span>
            </Card.Header>

            <Card.Body>
              <p>{q.questionText}</p>

              <div>
                <strong>Your answer: </strong>
                {q.type === "MULTIPLE_CHOICE" &&
                  q.choices.find((c: any) => c._id === ans?.selectedChoiceId)
                    ?.text}

                {q.type === "TRUE_FALSE" &&
                  (ans?.selectedBoolean ? "True" : "False")}

                {q.type === "FILL_IN_BLANK" && ans?.textAnswer}
              </div>

              <div className="mt-2">
                <strong>Correct answer: </strong>
                {q.type === "MULTIPLE_CHOICE" &&
                  q.choices.find((c: any) => c.isCorrect)?.text}

                {q.type === "TRUE_FALSE" &&
                  (q.correctBoolean ? "True" : "False")}

                {q.type === "FILL_IN_BLANK" &&
                  q.correctAnswers.join(", ")}
              </div>
            </Card.Body>
          </Card>
        );
      })}

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={() =>
            router.push(`/Courses/${courseId}/Quizzes`)
          }
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}
