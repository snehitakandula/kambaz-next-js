"use client";

import { useState } from "react";

export default function CourseHome() {
  const [progressVisible, setProgressVisible] = useState(false);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left + Middle (Modules) */}
      <div style={{ flex: 3 }}>
        {/* Top control buttons */}
        <div style={{ marginBottom: "10px" }}>
          <button>Collapse All</button>
          <button onClick={() => setProgressVisible(!progressVisible)}>
            View Progress
          </button>
          <button>Publish All</button>
          <button>+ Module</button>
        </div>

        {progressVisible && (
          <div style={{ marginBottom: "10px", color: "green" }}>
             Progress: 2 of 6 lessons completed
          </div>
        )}

        <ul id="wd-modules">
          {/* Week 1 */}
          <li className="wd-module">
            <div className="wd-title">
              Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            </div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to the course
                  </li>
                  <li className="wd-content-item">
                    Learn what is Web Development
                  </li>
                </ul>
              </li>

              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 1 - Introduction
                  </li>
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 2 - Creating User Interfaces
                  </li>
                </ul>
              </li>

              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to Web Development
                  </li>
                  <li className="wd-content-item">
                    Creating an HTTP Server with Node.js
                  </li>
                  <li className="wd-content-item">
                    Creating a React Application
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Week 1, Lecture 2 */}
          <li className="wd-module">
            <div className="wd-title">
              Week 1, Lecture 2 - Formatting User Interfaces with HTML
            </div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Learn how to create user interfaces using HTML
                  </li>
                  <li className="wd-content-item">
                    Deploy the assignment to Netlify
                  </li>
                </ul>
              </li>

              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 3
                  </li>
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 4
                  </li>
                </ul>
              </li>

              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to HTML and DOM
                  </li>
                  <li className="wd-content-item">
                    Formating web content with headings
                  </li>
                  <li className="wd-content-item">
                    Formating content with lists and tables
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Week 2 */}
          <li className="wd-module">
            <div className="wd-title">Week 2 - Advanced Topics</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Deep dive into CSS</li>
                  <li className="wd-content-item">Responsive Web Design</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 5
                  </li>
                  <li className="wd-content-item">
                    Full Stack Developer - Chapter 6
                  </li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to Web Development
                  </li>
                  <li className="wd-content-item">
                    Creating an HTTP Server with Node.js
                  </li>
                  <li className="wd-content-item">
                    Creating a React Application
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

     
      
    </div>
  );
}
