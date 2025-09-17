import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

interface CoursesLayoutProps {
  children: ReactNode;
  params: Promise<{ cid: string }>; // Changed from { cid: string } to Promise<{ cid: string }>
}

// Layout can be async in Next.js 15
export default async function CoursesLayout({ children, params }: CoursesLayoutProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { cid } = await params;

  return (
    <div id="wd-courses">
      <h2>Course {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}