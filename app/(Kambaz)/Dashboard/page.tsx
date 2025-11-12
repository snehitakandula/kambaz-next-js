"use client";

import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "../Enrollments/reducer";
import { RootState } from "../store";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  img?: string;
  description: string;
}

interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    img: "/images/reactjs.jpg",
    description: ""
  });

  const [showAll, setShowAll] = useState(false);

  const defaultImg = "/images/default-course.png";

  // Helper function to check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  // Faculty always see all courses, students toggle between all and enrolled
  const displayedCourses = (currentUser?.role === "FACULTY" || showAll) 
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  
  const handleCourseClick = (e: React.MouseEvent, courseId: string) => {
    // Faculty can access any course
    if (currentUser?.role === "FACULTY") {
      return; 
    }
    
    // Non-faculty users can only access enrolled courses
    if (!isEnrolled(courseId)) {
      e.preventDefault();
    
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        {/* toggle button is displayed only for non-faculty users */}
        {currentUser?.role !== "FACULTY" && (
          <Button
            className="btn btn-info"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Enrollments" : "Enrollments"}
          </Button>
        )}
      </div>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>
          <br />

          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="New Course"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            placeholder="New Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={4} lg={5} className="g-4">
          {displayedCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            
            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link 
                    href={`/Courses/${course._id}/Home`} 
                    className="text-decoration-none text-dark"
                    onClick={(e) => handleCourseClick(e, course._id)}
                  >
                    <CardImg
                      variant="top"
                      src={course.img || defaultImg}
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

                      {/* enrollment buttons for non-faculty users */}
                      {currentUser && currentUser.role !== "FACULTY" && (
                        enrolled ? (
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(unenrollCourse({ user: currentUser._id, course: course._id }));
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(enrollCourse({ user: currentUser._id, course: course._id }));
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}

                      {/* course management buttons for faculty */}
                      {currentUser?.role === "FACULTY" && (
                        <>
                          <Button variant="primary">Go</Button>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}