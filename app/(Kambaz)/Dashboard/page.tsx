"use client";

import Link from "next/link";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    { id: "1234", title: "CS1234 React JS", description: "Full Stack software developer", img: "/images/reactjs.jpg" },
    { id: "1235", title: "CS1235 DBMS", description: "Database Management Systems", img: "/images/dbms.jpg" },
    { id: "1236", title: "CS1236 PDP", description: "Software Architecture & Patterns", img: "/images/pdp.jpg" },
    { id: "1237", title: "CS1237 Algorithms", description: "Problem Solving & Optimization", img: "/images/algorithms.jpg" },
    { id: "1238", title: "CS1238 Web Development", description: "Front-End & Back-End Engineering", img: "/images/webdev.jpg" },
    { id: "1239", title: "CS1239 HCI", description: "User Experience & Interface Design", img: "/images/hci.jpg" },
    { id: "1233", title: "CS1233 Node JS", description: "Server-Side JavaScript Development", img: "/images/nodejs.png" },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <div style={{ paddingLeft: "20px" }}>
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
        <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} sm={2} md={4} lg={5} className="g-4">
            {courses.map((course) => (
              <Col key={course.id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={`/Courses/${course.id}/Home`} className="text-decoration-none text-dark">
                    <CardImg variant="top" src={course.img} width="100%" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.title}</CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </CardText>
                      <Button variant="primary">Go</Button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
