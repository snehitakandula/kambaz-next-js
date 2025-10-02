"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname(); 

  const links = [
    { href: "/Courses/1234/Home", label: "Home" },
    { href: "/Courses/1234/Modules", label: "Modules" },
    { href: "/Courses/1234/Piazza", label: "Piazza" },
    { href: "/Courses/1234/Zoom", label: "Zoom" },
    { href: "/Courses/1234/Assignments", label: "Assignments" },
    { href: "/Courses/1234/Quizzes", label: "Quizzes" },
    { href: "/Courses/1234/Grades", label: "Grades" },
    { href: "/Courses/1234/People/Table", label: "People" },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item list-group-item-action ${
            pathname === link.href ? "active" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
