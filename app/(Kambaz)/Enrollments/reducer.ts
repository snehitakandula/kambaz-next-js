import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "@/app/(Kambaz)/Database";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: db.enrollments, 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const exists = state.enrollments.some(
        (e) => e.user === action.payload.user && e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push({ user: action.payload.user, course: action.payload.course });
      }
    },
    unenrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course === action.payload.course)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
