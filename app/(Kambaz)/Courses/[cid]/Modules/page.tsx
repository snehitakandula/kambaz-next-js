"use client";

import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { FaChevronDown } from "react-icons/fa6";

export default function CourseHome() {
  const [progressVisible] = useState(false);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      <div style={{ flex: 3 }}>
        
        <ModulesControls />
        <br />
        <br />
        <br />

        {progressVisible && (
          <div style={{ marginBottom: "10px", color: "green" }}>
            Progress: 2 of 6 lessons completed
          </div>
        )}

        <ListGroup className="rounded-0" id="wd-modules">
          {/* Week 1, Lecture 1 */}
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> <FaChevronDown className="me-2 fs-5" /> Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
              <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
        
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
                
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          {/* Week 1, Lecture 2 */}
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> <FaChevronDown className="me-2 fs-5" /> Week 1, Lecture 2 - Formatting User Interfaces with HTML 
              <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
                
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
              
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          {/* Week 2 */}
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> <FaChevronDown className="me-2 fs-5" /> Week 2 - Advanced Topics
              <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
               
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
                
              </ListGroupItem>

              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
