"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <div id="wd-courses">
      {/* Course title with breadcrumb inline */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={toggleNavigation}
        />
        <span suppressHydrationWarning>
          {course ? (
            <>
              {course.name}
              <span className="ms-3 text-danger" style={{ fontWeight: 400 }}>
                &gt; <Breadcrumb course={course} />
              </span>
            </>
          ) : (
            "Course Not Found"
          )}
        </span>
      </h2>

      <hr />

      <div className="d-flex">
        {/* Sidebar navigation */}
        {showNavigation && (
          <div className="d-none d-md-block me-3">
            <CourseNavigation cid={cid as string} />
          </div>
        )}

        {/* Main content area */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}