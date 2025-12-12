"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as client from "../../../client";
import type { Quiz } from "../../../client";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector, useDispatch } from "react-redux";
import { updateQuizInState } from "../reducer";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(quizId);
      setQuiz(q);
    };
    load();
  }, [quizId]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const navToEdit = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Edit`);
  const navToPreview = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Preview`);
  const navToTake = () =>
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/Take`);

  const togglePublish = async () => {
    const updated = await client.setQuizPublished(
      quiz._id as string,
      !quiz.published
    );
    setQuiz(updated);                     // local state
    dispatch(updateQuizInState(updated)); // global Redux (list + menu + icon)
  };

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>{quiz.title}</h3>

      <div
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
      />

      <Table bordered size="sm" className="w-auto">
        <tbody>
          <tr>
            <th>Status</th>
            <td>{quiz.published ? "Published" : "Unpublished"}</td>
          </tr>
          <tr>
            <th>Quiz Type</th>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <th>Quiz Description</th>
            <td>{quiz.description}</td>
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
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
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
            <Button
              variant={quiz.published ? "secondary" : "success"}
              onClick={togglePublish}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="secondary" onClick={navToPreview}>
              Preview
            </Button>
            <Button variant="primary" onClick={navToEdit}>
              Edit
            </Button>
          </>
        )}

        {isStudent && quiz.published && (
          <Button variant="primary" onClick={navToTake}>
            Take Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
