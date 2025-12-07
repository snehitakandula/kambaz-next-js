"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import ModulesControls from "../Modules/ModulesControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { editModule, updateModule, setModules } from "./reducer";
import * as client from "../../client";

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: {
    _id: string;
    name: string;
    description?: string;
  }[]; 
  editing?: boolean;
}



export default function Modules() {
  const params = useParams();
const cid = params.cid as string;

  const [moduleName, setModuleName] = useState("");

  const dispatch = useDispatch();

 const onRemoveModule = async (moduleId: string) => {
   await client.deleteModule(cid, moduleId);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
 };



  const onCreateModuleForCourse = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, createdModule]));
  };

 const onUpdateModule = async (module: Module) => {
  await client.updateModule(cid, module);

  const newModules = modules.map((m: Module) =>
    m._id === module._id ? module : m
  );

  dispatch(setModules(newModules));
};




  // ⭐ REQUIRED CHANGE: remove .filter() because server already filters
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  useEffect(() => {
  const fetchModules = async () => {
    const data = await client.findModulesForCourse(cid as string);
    dispatch(setModules(data));
  };

  fetchModules();
}, [cid, dispatch]);


  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 3 }}>
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
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
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                          onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
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
