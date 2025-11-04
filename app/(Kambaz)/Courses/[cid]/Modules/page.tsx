"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import ModulesControls from "../Modules/ModulesControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addModule, deleteModule, editModule, updateModule } from "./reducer";




export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");

  // ✅ Get modules from Redux
  const modules = useSelector((state: RootState) =>
    state.modulesReducer.modules.filter((m) => m.course === cid)
  );

  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 3 }}>
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName || "New Module", course: cid as string }));
            setModuleName("");
          }}
        />
        <br />
        <br />
        <br />

        <ListGroup id="wd-modules" className="rounded-0">
          {modules.map((module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <FaChevronDown className="me-2 fs-5" />

                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(id) => dispatch(deleteModule(id))}
                  editModule={(id) => dispatch(editModule(id))}
                />
              </div>

              {module.lessons && module.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      <LessonControlButtons />
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
