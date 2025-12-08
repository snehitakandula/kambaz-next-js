import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

interface Course {
  _id?: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  img?: string;
  description: string;
} 

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module?: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: Lesson[];
}

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  availableUntil: string;
  dueDate: string;
  points: number;
}


const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: Partial<Module>) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axios.delete(
   `${COURSES_API}/${courseId}/modules/${moduleId}`
 );
 return response.data;
};


export const updateModule = async (courseId: string, module: Partial<Module>) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};



// ----------------- ASSIGNMENTS API --------------------
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// Get assignments for a course
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// Get one assignment by ID
export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

// Create new assignment for a course
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Partial<Assignment>
) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

// Update assignment
export const updateAssignment = async (assignment: Partial<Assignment>) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

// Delete assignment
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
  return data;
};

// ----------------- QUIZZES API --------------------

export interface Choice {
  _id?: string;
  text: string;
  isCorrect: boolean;
}

export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";

export interface Question {
  _id?: string;
  title: string;
  questionText: string;
  points: number;
  type: QuestionType;
  choices?: Choice[];
  correctBoolean?: boolean;
  correctAnswers?: string[];
}

export interface Quiz {
  _id?: string;
  course: string;
  title: string;
  description: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  isPublished: boolean;
  questions: Question[];
}

const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// All quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

// Create quiz for a course (backend creates default values)
export const createQuizForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    {}
  );
  return data;
};

// Get single quiz
export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

// Update quiz (details + questions)
export const updateQuiz = async (quiz: Partial<Quiz>) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

// Delete quiz
export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

// Publish / Unpublish quiz
export const setQuizPublished = async (quizId: string, isPublished: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { isPublished }
  );
  return data;
};

// ---------- Quiz Attempts ----------

export interface AttemptAnswer {
  questionId: string;
  selectedChoiceId?: string;
  selectedBoolean?: boolean;
  textAnswer?: string;
}

export const submitQuizAttempt = async (
  quizId: string,
  answers: AttemptAnswer[]
) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    { answers }
  );
  return data; // expect { score, answers, submittedAt, ... }
};

export const findLastAttemptForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/me/last`
  );
  return data; // null or attempt
};

