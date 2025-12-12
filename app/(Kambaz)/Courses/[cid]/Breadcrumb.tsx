"use client";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../client";

interface BreadcrumbProps {
  course?: { name: string };
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
  const pathname = usePathname();
  const params = useParams();
  const [quizTitle, setQuizTitle] = useState<string>("");
  const currentPage = pathname.split("/").pop();
  
  // Check if we're on a quiz details or related page
  const isQuizPage = pathname.includes("/Quizzes/") && params.qid;
  
  useEffect(() => {
    if (isQuizPage) {
      const fetchQuizTitle = async () => {
        try {
          const quiz = await client.findQuizById(params.qid as string);
          setQuizTitle(quiz.title || "Untitled Quiz");
        } catch (error) {
          console.error("Error fetching quiz title:", error);
          setQuizTitle(currentPage || "");
        }
      };
      fetchQuizTitle();
    }
  }, [isQuizPage, params.qid, currentPage]);

  // If it's a quiz page and we have the title, show that
  if (isQuizPage && quizTitle) {
    return <>{quizTitle}</>;
  }

  return <>{currentPage}</>; 
}
