"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import * as db from "../../../Database";
import ModulesControls from "../Modules/ModulesControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useState } from "react";

// Define TypeScript types
interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();
  const [progressVisible] = useState(false);

  // Filter modules for the current course
  const modules: Module[] = db.modules.filter((module: Module) => module.course === cid);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 3 }}>
        <ModulesControls />
        <br /><br /><br />

        {progressVisible && (
          <div style={{ marginBottom: "10px", color: "green" }}>
            Progress: 2 of 6 lessons completed
          </div>
        )}

        <ListGroup id="wd-modules" className="rounded-0">
          {modules.map((module: Module) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <FaChevronDown className="me-2 fs-5" />
                {module.name} <ModuleControlButtons />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
