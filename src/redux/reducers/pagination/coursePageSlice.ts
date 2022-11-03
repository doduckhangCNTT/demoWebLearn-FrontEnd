import { createSlice } from "@reduxjs/toolkit";
import { ICourses } from "../../../utils/Typescript";

const initialState = {
  courses: [] as ICourses[],
  totalCount: 0,
};

export const coursePageSlice = createSlice({
  name: "coursePage",
  initialState,
  reducers: {
    getCoursesPage: (state, action: any) => {
      return action.payload;
    },
  },
});
