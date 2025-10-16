"use client";

import Link from "next/link";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from "react-bootstrap";
import { courses } from "../Database"; // import courses from Database

export default function Dashboard() {
  const defaultImg = "/images/default-course.png"; // fallback image

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
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                    <CardImg
                      variant="top"
                      src={defaultImg} // use default image
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
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
