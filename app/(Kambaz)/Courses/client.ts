import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

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
}

export interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: Lesson[];
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

export interface Quiz {
  _id?: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  published?: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

// ---------- QUIZ TYPES ----------

export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "FILL_IN_BLANK";

export interface Choice {
  text: string;
  correct: boolean;
}

export interface Question {
  _id?: string;
  title: string;
  points: number;
  type: QuestionType;
  questionText: string;

  choices?: Choice[];
  correctBoolean?: boolean;
  correctAnswers?: string[];
}

export interface Quiz {
  _id?: string;
  title: string;
  description?: string;
  course: string;

  quizType: string;
  assignmentGroup: string;

  timeLimit: number;
  shuffleAnswers: boolean;
  multipleAttempts: boolean;
  maxAttempts?: number;

  showCorrectAnswers: string;
  accessCode?: string;

  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;

  dueDate?: string;
  availableDate?: string;
  untilDate?: string;

  published?: boolean;

  questions: Question[];
}




const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
export const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;


// ---------- COURSES ----------
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

// ---------- MODULES ----------
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Partial<Module>
) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return data;
};

export const updateModule = async (
  courseId: string,
  module: Partial<Module>
) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

// ---------- ENROLLMENTS ----------
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

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};



// ---------- ASSIGNMENTS ----------
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Partial<Assignment>
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (
  assignment: Partial<Assignment>
) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};


export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const createQuizForCourse = async (
  courseId: string,
  quiz: Partial<Quiz>
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuiz = async (quizId: string, quiz: Partial<Quiz>) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const setQuizPublished = async (
  quizId: string,
  published: boolean
) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    { published }
  );
  return data;
};

export const findLastAttemptForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/last`
  );
  return data;
};

export const submitQuizAttempt = async (
  quizId: string,
  answers: any[]
) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    answers
  );
  return response.data;
};
// ---------- QUESTIONS ----------
export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const findQuestionById = async (quizId: string, questionId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return data;
};

export const createQuestion = async (quizId: string, question: Partial<Question>) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return data;
};

export const updateQuestion = async (quizId: string, questionId: string, question: Partial<Question>) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    question
  );
  return data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return data;
};