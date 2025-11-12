"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseNavigationProps {
  cid: string;
}

export default function CourseNavigation({ cid }: CourseNavigationProps) {
  const pathname = usePathname();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((label) => {
        
        const href = label === "People"
          ? `/Courses/${cid}/People/Table`
          : `/Courses/${cid}/${label}`;

        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`list-group-item list-group-item-action ${isActive ? "active" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
