"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Quiz } from "../../client";

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(state, action: PayloadAction<Quiz[]>) {
      state.quizzes = action.payload;
    },
    addQuiz(state, action: PayloadAction<Quiz>) {
      state.quizzes.push(action.payload);
    },
    updateQuizInState: (state, action) => {
  state.quizzes = state.quizzes.map((q) =>
    q._id === action.payload._id ? action.payload : q
  );
},

    removeQuiz(state, action: PayloadAction<string>) {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
  },
});

export const { setQuizzes, addQuiz, updateQuizInState, removeQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
