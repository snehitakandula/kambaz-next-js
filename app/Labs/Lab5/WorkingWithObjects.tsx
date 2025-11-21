import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

export default function WorkingWithObjects() {
  // Assignment state
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  // Module state
  const [module, setModule] = useState({
    id: "M101",
    name: "Intro to NodeJS",
    description: "Learn NodeJS basics",
    course: "CS101",
  });
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/*Assignment */}
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Properties</h4>

      {/* Update Title */}
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
          assignment.title
        )}`}
      >
        Update Assignment Title
      </a>
      <br />

      {/* Update Score */}
      <FormControl
        className="w-25 mb-2"
        type="number"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <br />

      {/* Update Completed */}
      <FormCheck
        type="checkbox"
        id="wd-assignment-completed"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary mb-4"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <hr />

      {/* Module  */}
      <h4>Module Operations</h4>

      {/* Get full module */}
      <a
        id="wd-get-module"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <br />

      {/* Get module name */}
      <a
        id="wd-get-module-name"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <br />

      {/* Update module name */}
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(module.name)}`}
      >
        Update Module Name
      </a>
      <br />

      {/* Update module description */}
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(
          module.description
        )}`}
      >
        Update Module Description
      </a>
    </div>
  );
}
