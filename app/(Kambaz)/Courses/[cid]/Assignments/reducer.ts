
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "@/app/(Kambaz)/Database";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  availableUntil: string;
  dueDate: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: db.assignments, // initialize from your Database
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const index = state.assignments.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(a => a._id !== action.payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
