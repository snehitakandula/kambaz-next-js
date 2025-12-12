"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import {
  BsGripVertical,
  BsThreeDotsVertical,
} from "react-icons/bs";
import {
  FaPlus,
  FaSearch,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setQuizzes,
  addQuiz,
  removeQuiz,
  updateQuizInState,
} from "./reducer";
import * as client from "../../client";
import type { Quiz } from "../../client";

export default function Quizzes() {
  const { cid } = useParams();
  const courseId = cid as string;
  const dispatch = useDispatch();

  const { quizzes } = useSelector(
    (state: RootState) => state.quizzesReducer
  );
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  // helper: availability label
  const availabilityLabel = (q: Quiz) => {
    if (!q.availableDate && !q.untilDate) return "Available";

    const now = new Date();
    const available = q.availableDate ? new Date(q.availableDate) : null;
    const until = q.untilDate ? new Date(q.untilDate) : null;

    if (until && now > until) return "Closed";
    if (available && now < available)
      return `Not available until ${available.toLocaleString()}`;
    return "Available";
  };

  useEffect(() => {
    const load = async () => {
      if (!courseId) return;
      let data: Quiz[] = await client.findQuizzesForCourse(courseId);

      // Filter out unpublished quizzes for students
      if (isStudent) {
        data = data.filter(q => q.published);
      }

      // If student, optionally fetch last attempt scores
      if (isStudent) {
        const withScores = await Promise.all(
          data.map(async (q) => {
            try {
              const attempt = await client.findLastAttemptForQuiz(
                q._id as string
              );
              return {
                ...q,
                // @ts-ignore – we can store extra display-only field
                lastScore: attempt ? attempt.score : null,
              };
            } catch {
              return q;
            }
          })
        );
        const sorted = withScores.sort((a, b) => {
          const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
          const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
          return dateA - dateB;
        });
        dispatch(setQuizzes(sorted));
      } else {
        const sorted = data.sort((a, b) => {
          const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
          const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
          return dateA - dateB;
        });
        dispatch(setQuizzes(sorted));
      }
    };
    load();
  }, [courseId, isStudent, dispatch]);

  const handleCreate = async () => {
    if (!courseId) return;
    const created = await client.createQuizForCourse(courseId, {
  title: "New Quiz",
});
    dispatch(addQuiz(created));
    window.location.href = `/Courses/${courseId}/Quizzes/${created._id}/Edit`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quiz?")) return;
    await client.deleteQuiz(id);
    dispatch(removeQuiz(id));
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    const updated = await client.setQuizPublished(
      quiz._id as string,
      !quiz.published
    );
    dispatch(updateQuizInState(updated));
  };

  return (
    <div style={{ flex: 3 }} className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "360px" }}>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <Form.Control placeholder="Search for Quizzes" />
        </InputGroup>

        {isFaculty && (
          <Button variant="danger" onClick={handleCreate}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {/* Empty message */}
      {!quizzes.length && (
        <p className="text-muted">
          No quizzes yet. {isFaculty && "Click + Quiz to create one."}
        </p>
      )}

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaChevronDown className="me-2 fs-5" />
            <span>QUIZZES</span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {quizzes.map((q: any) => (
              <ListGroupItem
                key={q._id}
                className="wd-lesson p-3 ps-3 d-flex align-items-center wd-lesson-left-line"
              >
                <div className="me-3">
                  <BsGripVertical className="fs-4 text-muted" />
                </div>

                {/* Published / Unpublished icon */}
                <div
                  className="me-3"
                  style={{ cursor: isFaculty ? "pointer" : "default" }}
                  onClick={
                    isFaculty ? () => handleTogglePublish(q) : undefined
                  }
                  title={q.isPublished ? "Published" : "Unpublished"}
                >
                </div>

                <div>
                  <div className="fw-bold">
                    <Link
                      href={`/Courses/${courseId}/Quizzes/${q._id}`}
                      className="text-decoration-none text-dark"
                    >
                      {q.title || "Untitled Quiz"}
                    </Link>
                  </div>
                  <div className="text-muted small">
                    {availabilityLabel(q)} | Due{" "}
                    {q.dueDate || "No due date"} | {q.points ?? 0} pts |{" "}
                    {(q.questions?.length ?? 0)} Questions
                    {isStudent && q.lastScore != null && (
                      <> | Score: {q.lastScore} / {q.points ?? 0}</>
                    )}
                  </div>
                </div>

                <FaCheckCircle className="text-success ms-auto fs-4" />

                {isFaculty && (
                  <Dropdown align="end" className="ms-3">
                    <Dropdown.Toggle
                      as="button"
                      className="btn btn-link p-0 border-0"
                    >
                      <BsThreeDotsVertical className="fs-5 text-muted" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        href={`/Courses/${courseId}/Quizzes/${q._id}/Edit`}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleTogglePublish(q)}
                      >
                        {q.isPublished ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDelete(q._id as string)}
                      >
                        Delete
                      </Dropdown.Item>
                      {/* Copy, Sort optional */}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
