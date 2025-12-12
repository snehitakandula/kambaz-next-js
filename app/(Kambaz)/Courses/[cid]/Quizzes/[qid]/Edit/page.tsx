"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import * as client from "../../../../client";
import type {
  Quiz,
  Question,
  QuestionType,
  Choice,
} from "../../../../client";
import { useDispatch } from "react-redux";
import { updateQuizInState } from "../../reducer";

export default function QuizEditPage() {
const params = useParams<{ cid: string; qid: string }>();
const courseId = params.cid;
const quizId = params.qid;

  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );

  useEffect(() => {
    const load = async () => {
      const q: Quiz = await client.findQuizById(quizId);
q.questions = q.questions || [];

      setQuiz(q);
    };
    load();
  }, [quizId]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const updateField = <K extends keyof Quiz>(field: K, value: Quiz[K]) => {
  setQuiz({ ...quiz, [field]: value });
};


  const saveAndGoToDetails = async (publish?: boolean) => {
    const updated = await client.updateQuiz(quizId, quiz);
    dispatch(updateQuizInState(updated));
    if (publish) {
      await client.setQuizPublished(quizId, true);
      router.push(`/Courses/${courseId}/Quizzes`);
    } else {
      router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
    }
  };

  const cancel = () => router.push(`/Courses/${courseId}/Quizzes`);

  const addQuestion = () => {
    const newQ: Question = {
      title: "New Question",
      questionText: "",
      points: 1,
      type: "MULTIPLE_CHOICE",
      choices: [
        { text: "Choice 1", correct: true },
        { text: "Choice 2", correct: false },
      ],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQ] });
  };

  const updateQuestion = (index: number, newQ: Question) => {
    const qs = [...quiz.questions];
    qs[index] = newQ;
    setQuiz({ ...quiz, questions: qs });
  };

  const removeQuestion = (index: number) => {
    const qs = [...quiz.questions];
    qs.splice(index, 1);
    setQuiz({ ...quiz, questions: qs });
  };

  return (
    <div className="p-3" style={{ maxWidth: "900px" }}>
      <h3>Edit Quiz: {quiz.title}</h3>

      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k as any)}
        className="mt-3"
      >
        <Nav.Item>
          <Nav.Link eventKey="details">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* DETAILS TAB */}
      {activeTab === "details" && (
        <div className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Quiz Name</Form.Label>
            <Form.Control
              value={quiz.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Quiz Instructions:</Form.Label>
            <Card className="border">
              <Card.Header className="bg-light p-2">
                <div className="d-flex gap-1 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => document.execCommand("bold")}
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => document.execCommand("italic")}
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => document.execCommand("underline")}
                    title="Underline"
                  >
                    <u>U</u>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => document.execCommand("insertUnorderedList")}
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => document.execCommand("insertOrderedList")}
                    title="Numbered List"
                  >
                    1. List
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      const url = prompt("Enter URL:");
                      if (url) document.execCommand("createLink", false, url);
                    }}
                    title="Insert Link"
                  >
                    Link
                  </button>
                </div>
              </Card.Header>
              <Card.Body>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    updateField("description", e.currentTarget.innerHTML)
                  }
                  dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
                  style={{ minHeight: "150px", outline: "none" }}
                />
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType || "Graded Quiz"}
              onChange={(e) => updateField("quizType", e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={quiz.points || 0}
              onChange={(e) => updateField("points", Number(e.target.value))}
            />
            <Form.Text className="text-muted">
              Current total from questions: {quiz.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup || "QUIZZES"}
              onChange={(e) =>
                updateField("assignmentGroup", e.target.value)
              }
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Form.Group>

          <h5 className="mt-4">Options</h5>
          
          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers ?? true}
              onChange={(e) =>
                updateField("shuffleAnswers", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Time Limit"
              checked={!!quiz.timeLimit}
              onChange={(e) =>
                updateField("timeLimit", e.target.checked ? 20 : 0)
              }
            />
            {!!quiz.timeLimit && (
              <div className="d-flex align-items-center mt-2 ms-4">
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    updateField("timeLimit", Number(e.target.value))
                  }
                  style={{ width: "100px" }}
                  className="me-2"
                />
                <span>Minutes</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts ?? false}
              onChange={(e) =>
                updateField("multipleAttempts", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Show Correct Answers</Form.Label>
            <Form.Select
              value={quiz.showCorrectAnswers || "immediately"}
              onChange={(e) =>
                updateField("showCorrectAnswers", e.target.value)
              }
            >
              <option value="immediately">Immediately</option>
              <option value="after_submission">After Submission</option>
              <option value="after_due_date">After Due Date</option>
              <option value="never">Never</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leave blank for no access code"
              value={quiz.accessCode || ""}
              onChange={(e) =>
                updateField("accessCode", e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime ?? true}
              onChange={(e) =>
                updateField("oneQuestionAtATime", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired ?? false}
              onChange={(e) =>
                updateField("webcamRequired", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering ?? false}
              onChange={(e) =>
                updateField("lockQuestionsAfterAnswering", e.target.checked)
              }
            />
          </Form.Group>

          <Card className="mt-4 mb-3">
            <Card.Header className="bg-light">
              <strong>Assign</strong>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.dueDate || ""}
                  onChange={(e) =>
                    updateField("dueDate", e.target.value || undefined)
                  }
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="date"
                      value={quiz.availableDate || ""}
                      onChange={(e) =>
                        updateField("availableDate", e.target.value || undefined)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="date"
                      value={quiz.untilDate || ""}
                      onChange={(e) =>
                        updateField("untilDate", e.target.value || undefined)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* QUESTIONS TAB */}
      {activeTab === "questions" && (
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-2">
            <h5>Questions ({quiz.questions.length})</h5>
            <Button size="sm" onClick={addQuestion}>
              + New Question
            </Button>
          </div>

          {!quiz.questions.length && (
            <p className="text-muted">
              No questions yet. Click &quot;New Question&quot;.
            </p>
          )}

          {quiz.questions.map((q, index) => (
            <QuestionEditor
              key={q._id || index}
              question={q}
              index={index}
              onChange={(newQ) => updateQuestion(index, newQ)}
              onDelete={() => removeQuestion(index)}
            />
          ))}
        </div>
      )}

      <div className="mt-4 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => saveAndGoToDetails(false)}>
          Save
        </Button>
        <Button variant="success" onClick={() => saveAndGoToDetails(true)}>
          Save &amp; Publish
        </Button>
      </div>
    </div>
  );
}

function QuestionEditor({
  question,
  index,
  onChange,
  onDelete,
}: {
  question: Question;
  index: number;
  onChange: (q: Question) => void;
  onDelete: () => void;
}) {
  const setField = (field: keyof Question, value: any) =>
    onChange({ ...question, [field]: value });

  const setChoices = (choices: Choice[]) =>
    onChange({ ...question, choices });

  const addChoice = () => {
    const choices = question.choices || [];
    setChoices([
      ...choices,
      { text: `Choice ${choices.length + 1}`, correct: false },
    ]);
  };

  const markCorrectChoice = (idx: number) => {
    const choices = (question.choices || []).map((c, i) => ({
      ...c,
      Correct: i === idx,
    }));
    setChoices(choices);
  };

  const removeChoice = (idx: number) => {
    const choices = [...(question.choices || [])];
    choices.splice(idx, 1);
    setChoices(choices);
  };

  const addBlankAnswer = () => {
    const arr = question.correctAnswers || [];
    onChange({ ...question, correctAnswers: [...arr, ""] });
  };

  const updateBlankAnswer = (idx: number, value: string) => {
    const arr = [...(question.correctAnswers || [])];
    arr[idx] = value;
    onChange({ ...question, correctAnswers: arr });
  };

  const removeBlankAnswer = (idx: number) => {
    const arr = [...(question.correctAnswers || [])];
    arr.splice(idx, 1);
    onChange({ ...question, correctAnswers: arr });
  };

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>Question {index + 1}</span>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Card.Header>
      <Card.Body>
        <Row className="mb-2">
          <Col md={7}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={question.title}
                onChange={(e) => setField("title", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={question.points}
                onChange={(e) =>
                  setField("points", Number(e.target.value))
                }
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={question.type}
                onChange={(e) =>
                  setField("type", e.target.value as QuestionType)
                }
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True / False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.questionText}
            onChange={(e) => setField("questionText", e.target.value)}
          />
        </Form.Group>

        {/* Multiple Choice */}
        {question.type === "MULTIPLE_CHOICE" && (
          <div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Choices</strong>
              <Button size="sm" variant="outline-secondary" onClick={addChoice}>
                + Choice
              </Button>
            </div>
            {(question.choices || []).map((choice, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center mb-2"
              >
                <Form.Check
                  type="radio"
                  name={`q-${index}-correct`}
                  checked={choice.correct}
                  onChange={() => markCorrectChoice(idx)}
                  className="me-2"
                />
                <Form.Control
                  value={choice.text}
                  onChange={(e) => {
                    const choices = [...(question.choices || [])];
                    choices[idx] = { ...choice, text: e.target.value };
                    setChoices(choices);
                  }}
                />
                <Button
                  size="sm"
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => removeChoice(idx)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* True / False */}
        {question.type === "TRUE_FALSE" && (
          <div className="mt-2">
            <strong>Correct Answer</strong>
            <div className="mt-2">
              <Form.Check
                type="radio"
                label="True"
                name={`tf-${index}`}
                checked={question.correctBoolean !== false}
                onChange={() => setField("correctBoolean", true)}
              />
              <Form.Check
                type="radio"
                label="False"
                name={`tf-${index}`}
                checked={question.correctBoolean === false}
                onChange={() => setField("correctBoolean", false)}
              />
            </div>
          </div>
        )}

        {/* Fill in the Blank */}
        {question.type === "FILL_IN_BLANK" && (
          <div className="mt-2">
            <div className="d-flex justify-content-between mb-2">
              <strong>Possible Correct Answers</strong>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={addBlankAnswer}
              >
                + Answer
              </Button>
            </div>
            {(question.correctAnswers || []).map((ans, idx) => (
              <div key={idx} className="d-flex align-items-center mb-2">
                <Form.Control
                  value={ans}
                  onChange={(e) =>
                    updateBlankAnswer(idx, e.target.value)
                  }
                />
                <Button
                  size="sm"
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => removeBlankAnswer(idx)}
                >
                  ✕
                </Button>
              </div>
            ))}
            <div className="small text-muted">
              Answers compared case-insensitively.
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
