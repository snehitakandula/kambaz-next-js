"use client";

import Link from "next/link";

import { ListGroup, ListGroupItem, Button, Form, InputGroup } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaSearch, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

export default function Assignments() {
  return (
    <div style={{ flex: 3 }} className="p-3">
      {/* Top bar (search left, buttons right) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "360px" }}>
          <span className="input-group-text"><FaSearch /></span>
          <Form.Control placeholder="Search for Assignments" />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="secondary"><FaPlus className="me-1" /> Group</Button>
          <Button variant="danger"><FaPlus className="me-1" /> Assignment</Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaChevronDown className="me-2 fs-5" />
            <span>ASSIGNMENTS</span>
            <span className="ms-auto badge bg-light text-dark border">40% of Total</span>
            <FaPlus className="ms-2 text-muted" />
            <BsThreeDotsVertical className="ms-3 fs-5 text-muted" />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {/* Assignment row 1 */}
            <ListGroupItem className="wd-lesson p-3 ps-3 d-flex align-items-center wd-lesson-left-line">
              <div className="me-3"><BsGripVertical className="fs-4 text-muted" /></div>
              <FaRegFileAlt className="me-3 fs-4 text-muted" /> 
              <div>
                <div className="fw-bold">
      <Link 
        href={`/Courses/1234/Assignments/123`} 
        className="text-decoration-none text-dark"
      >
        A1
      </Link>
    </div>
                <div className="text-muted small">
                 <span className="text-danger"> Multiple Modules </span> | <strong>Not available until</strong> May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
                </div>
              </div>

              <FaCheckCircle className="text-success ms-auto fs-4" />
              <BsThreeDotsVertical className="ms-3 fs-5 text-muted" />
            </ListGroupItem>

            {/* Assignment row 2 */}
            <ListGroupItem className="wd-lesson p-3 ps-3 d-flex align-items-center wd-lesson-left-line">
              <div className="me-3"><BsGripVertical className="fs-4 text-muted" /></div>
              <FaRegFileAlt className="me-3 fs-4 text-muted" />
              <div>
                <div className="fw-bold">
      <Link 
        href={`/Courses/1234/Assignments/124`} 
        className="text-decoration-none text-dark"
      >
        A2
      </Link>
    </div>
                <div className="text-muted small">
                  <span className="text-danger"> Multiple Modules </span> | <strong>Not available until</strong> May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
                </div>
              </div>

              <FaCheckCircle className="text-success ms-auto fs-4" />
              <BsThreeDotsVertical className="ms-3 fs-5 text-muted" />
            </ListGroupItem>

            {/* Assignment row 3 */}
            <ListGroupItem className="wd-lesson p-3 ps-3 d-flex align-items-center wd-lesson-left-line">
              <div className="me-3"><BsGripVertical className="fs-4 text-muted" /></div>
              <FaRegFileAlt className="me-3 fs-4 text-muted" />
              <div>
                <div className="fw-bold">
      <Link 
        href={`/Courses/1234/Assignments/125`} 
        className="text-decoration-none text-dark"
      >
        A3
      </Link>
    </div>
                <div className="text-muted small">
                  <span className="text-danger"> Multiple Modules </span> | <strong>Not available until</strong> May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts
                </div>
              </div>

              <FaCheckCircle className="text-success ms-auto fs-4" />
              <BsThreeDotsVertical className="ms-3 fs-5 text-muted" />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
