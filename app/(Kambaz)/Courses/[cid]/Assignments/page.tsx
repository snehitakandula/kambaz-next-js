"use client"; 
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 – ENV + HTML
          </Link>
          <div className="wd-assignment-details">
            Module 1 | Not available until Sep 10 at 12:00am <br />
            Due Sep 17 at 11:59pm | 100 pts <br />
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link">
            A2 – CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-details">
            Module 2 | Not available until Sep 19 at 12:00am <br />
            Due Sep 26 at 11:59pm | 100 pts <br />
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link">
            A3 – JAVASCRIPT
          </Link>
          <div className="wd-assignment-details">
            Module 3 | Not available until Sep 28 at 12:00am <br />
            Due Oct 05 at 11:59pm | 100 pts <br />
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/126" className="wd-assignment-link">
            A4 – REACT
          </Link>
          <div className="wd-assignment-details">
            Module 1 | Not available until Oct 07 at 12:00am <br />
            Due Oct 14 at 11:59pm | 100 pts <br />
          </div>
        </li>
      </ul>
    </div>
  );
}
