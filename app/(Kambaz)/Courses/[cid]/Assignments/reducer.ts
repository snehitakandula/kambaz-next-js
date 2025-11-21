import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  assignments: [],   // ⭐ REQUIRED: empty (no DB)
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
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

export const { setAssignments, addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
