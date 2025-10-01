"use client";
import Select from "react-select";

import { Form, Button, Card, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: "900px" }}>
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Card body className="border">
            <div>
              The assignment is  <span className="text-danger">available online</span>
              <br />
              <br />
              Submit a link to the landing page of your Web application running on Netlify.
              <br />
              <br />
              The landing page should include the following:
              <ul>
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              The Kanbas application should include a link to navigate back to the landing page.
            </div>
          </Card>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="fw-bold">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="number" defaultValue={100} />
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

        {/* ASSIGN section: left heading 'Assign' and everything else stacked to the right */}
        <Form.Group as={Row} className="mb-3" controlId="wd-assign-section">
  <Form.Label column sm={3} className="fw-bold">
    Assign
  </Form.Label>
  <Col sm={9}>
    <Card className="border p-3">
      {/* Assign To with react-select */}
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

      {/* Due */}
      <Form.Group className="mb-3" controlId="wd-due-date">
        <Form.Label className="fw-bold">Due</Form.Label>
        <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59" />
      </Form.Group>

      {/* Available From / Until */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-bold">Available from</Form.Label>
            <Form.Control type="datetime-local" defaultValue="2024-05-06T00:00" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-until">
            <Form.Label className="fw-bold">Until</Form.Label>
            <Form.Control type="datetime-local" defaultValue="2024-05-20T23:59" />
          </Form.Group>
        </Col>
      </Row>
    </Card>
  </Col>
</Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
