"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as client from "../../../client";
import type { Quiz } from "../../../client";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [lastAttempt, setLastAttempt] = useState<any | null>(null);

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(quizId);
      setQuiz(q);
      if (isStudent) {
        const attempt = await client.findLastAttemptForQuiz(quizId);
        setLastAttempt(attempt);
      }
    };
    load();
  }, [quizId, isStudent]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const navToEdit = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Edit`);
  const navToPreview = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Preview`);
  const navToTake = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Take`);

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>{quiz.title}</h3>
      <div
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
      />

      {isStudent && lastAttempt && (
        <div className="alert alert-info">
          Last attempt: score {lastAttempt.score} / {quiz.points} —{" "}
          {new Date(lastAttempt.submittedAt).toLocaleString()}
        </div>
      )}

      <Table bordered size="sm" className="w-auto">
        <tbody>
          <tr>
            <th>Quiz Type</th>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <th>Points</th>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <th>Assignment Group</th>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <th>Shuffle Answers</th>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Time Limit</th>
            <td>{quiz.timeLimit} minutes</td>
          </tr>
          <tr>
            <th>Multiple Attempts</th>
            <td>
              {quiz.multipleAttempts ? "Yes" : "No"}{" "}
              {quiz.multipleAttempts && `(Max ${quiz.maxAttempts})`}
            </td>
          </tr>
          <tr>
            <th>Show Correct Answers</th>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <th>Access Code</th>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <th>One Question at a Time</th>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Webcam Required</th>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Lock Questions After Answering</th>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Due</th>
            <td>{quiz.dueDate || "None"}</td>
          </tr>
          <tr>
            <th>Available From</th>
            <td>{quiz.availableDate || "None"}</td>
          </tr>
          <tr>
            <th>Until</th>
            <td>{quiz.untilDate || "None"}</td>
          </tr>
        </tbody>
      </Table>

      <div className="d-flex gap-2 mt-3">
        {isFaculty && (
          <>
            <Button variant="secondary" onClick={navToPreview}>
              Preview
            </Button>
            <Button variant="primary" onClick={navToEdit}>
              Edit
            </Button>
          </>
        )}
        {isStudent && (
          <Button variant="primary" onClick={navToTake}>
            Take Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
