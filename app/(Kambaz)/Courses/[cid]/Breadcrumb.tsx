"use client";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  course?: { name: string };
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop(); // last part of URL

  return <>{currentPage}</>; // only the current page
}
