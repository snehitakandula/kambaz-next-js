"use client";
import { useParams, useRouter } from "next/navigation";
import Select from "react-select";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  findAssignmentById,
  createAssignmentForCourse,
  updateAssignment as saveAssignmentToServer
} from "../../../client";
import { addAssignment, updateAssignment } from "../reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  availableUntil: string;
  dueDate: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [availableUntil, setAvailableUntil] = useState("");
  const [dueDate, setDueDate] = useState("");

  // ⭐ Load assignment from server
  useEffect(() => {
    const load = async () => {
      if (aid === "new") return;
      const assignment = await findAssignmentById(aid as string);

      if (!assignment) return;

      setTitle(assignment.title);
      setDescription(assignment.description);
      setPoints(assignment.points);
      setAvailableUntil(assignment.availableUntil);
      setDueDate(assignment.dueDate);
    };
    load();
  }, [aid]);

  const handleSave = async () => {
    if (!courseId) return;

    const assignment: Assignment = {
      _id: aid === "new" ? "" : (aid as string),
      title,
      description,
      points,
      course: courseId,
      availableUntil,
      dueDate
    };

    if (aid === "new") {
      const created = await createAssignmentForCourse(courseId, assignment);
      dispatch(addAssignment(created));
    } else {
      const updated = await saveAssignmentToServer(assignment);
      dispatch(updateAssignment(updated));
    }

    router.push(`/Courses/${courseId}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: "900px" }}>
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Card body className="border">
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setDescription(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Card>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="fw-bold">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3} className="fw-bold">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="fw-bold">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Percentage">
              <option>Points</option>
              <option>Percentage</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={3} className="fw-bold">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Online">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </Form.Select>

            <div className="mt-2 ps-3">
              <div className="fw-bold">Online Entry Options</div>
              <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
              <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
              <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
              <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
              <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
            </div>
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3" controlId="wd-assign-section">
          <Form.Label column sm={3} className="fw-bold">
            Assign
          </Form.Label>
          <Col sm={9}>
            <Card className="border p-3">
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label className="fw-bold">Assign To</Form.Label>
                <Select
                  instanceId="assign-to"
                  isMulti
                  defaultValue={[{ value: "everyone", label: "Everyone" }]}
                  options={[
                    { value: "everyone", label: "Everyone" },
                    { value: "students", label: "Students" },
                    { value: "section1", label: "Section 1" },
                    { value: "section2", label: "Section 2" },
                  ]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-from">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-until">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
