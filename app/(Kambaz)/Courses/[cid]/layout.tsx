import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../Database";

interface CoursesLayoutProps {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}

export default async function CoursesLayout({ children, params }: CoursesLayoutProps) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      {/* Course title with breadcrumb inline */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <span>{course?.name}</span>
        <span className="ms-3 text-danger" style={{ fontWeight: 400 }}>
          &gt; <Breadcrumb course={course} />
        </span>
      </h2>

      <hr />

      <div className="d-flex">
        {/* Sidebar navigation */}
        <div className="d-none d-md-block me-3">
          <CourseNavigation cid={cid} />
        </div>

        {/* Main content area */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
