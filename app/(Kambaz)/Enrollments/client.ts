import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const unenrollCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};