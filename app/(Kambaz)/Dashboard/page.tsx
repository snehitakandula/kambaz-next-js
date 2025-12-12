"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardBody, CardTitle, CardText, CardImg,
  Button, FormControl
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as enrollmentClient from "../Enrollments/client";
import * as client from "../Courses/client";
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

const uniqById = <T extends { _id: string }>(arr: T[]) => {
  const map = new Map<string, T>();
  arr.forEach((item) => {
    if (item?._id) map.set(item._id, item);
  });
  return Array.from(map.values());
};


export default function Dashboard() {
  const dispatch = useDispatch();

  // courses from Redux (server-filtered = "my courses")
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

  // local state for "all courses" (unfiltered)
  const [allCourses, setAllCourses] = useState<Course[]>([]);

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

  // Check enrollment based on server-filtered courses array
  const isEnrolled = (courseId: string) => {
    // Check if this course exists in the server-fetched "my courses" list
    return courses.some(course => course._id === courseId);
  };

  // Fetch MY COURSES (server-filtered)
  const fetchMyCourses = useCallback(async () => {
    if (!currentUser) {
      dispatch(setCourses([])); // Clear courses if no user is logged in
      return;
    }
    try {
      const myCourses = await client.findMyCourses();
      dispatch(setCourses(uniqById(myCourses)));
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
  const fetchAllCourses = async () => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      setAllCourses([]);
      return;
    }
    const all = await client.fetchAllCourses();
    setAllCourses(uniqById(all));
  };

  fetchAllCourses();
}, [currentUser]);


   const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setAllCourses([...allCourses, newCourse]);
  };

   const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setAllCourses(allCourses.filter((course) => course._id !== courseId));
  };

   const onUpdateCourse = async () => {
    await client.updateCourse(course);
    setAllCourses(allCourses.map((c) => {
    if (c._id === course._id) { return course; }
    else { return c; }
  }));
  };


  // Reload MY COURSES when user changes
  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);



  // Which list to show?
  const displayedCourses =
    currentUser?.role === "FACULTY"
      ? allCourses // faculty always sees all
      : showAll
        ? allCourses // student toggled "All Courses"
        : courses;   // student default: enrolled-only

  // Handle enrollment with server call and refetch
  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      // Call server API to enroll
      await enrollmentClient.enrollCourse(currentUser._id, courseId);
      // Refetch MY courses from server to get updated list
      await fetchMyCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle unenrollment with server call and refetch
  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      // Call server API to unenroll
      await enrollmentClient.unenrollCourse(currentUser._id, courseId);
      // Refetch MY courses from server to get updated list
      await fetchMyCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>

        {/* Only students get the toggle */}
       {currentUser?.role !== "FACULTY" && (
  <Button
    className="btn btn-info"
    onClick={async () => {
      if (!showAll) {
        const all = await client.fetchAllCourses();
        setAllCourses(all);
      }
      setShowAll(!showAll);
    }}
  >
    {showAll ? "My Courses" : "All Courses"}
  </Button>
)}

      </div>

      <hr />

      {/* Faculty course creation */}
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
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

      <h2 id="wd-dashboard-published">
        {currentUser?.role === "FACULTY"
          ? `All Courses (${displayedCourses.length})`
          : showAll
            ? `All Courses (${displayedCourses.length})`
            : `My Courses (${displayedCourses.length})`}
      </h2>

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

                      {/* Student enrollment buttons */}
                      {currentUser && currentUser.role !== "FACULTY" && (
                        enrolled ? (
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(course._id);
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}

                      {/* Faculty buttons only */}
                      {currentUser?.role === "FACULTY" && (
                        <>
                          <Button variant="primary">Go</Button>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
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