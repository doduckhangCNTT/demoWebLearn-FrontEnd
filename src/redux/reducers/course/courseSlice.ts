import { createSlice } from "@reduxjs/toolkit";
import { ICourses } from "../../../utils/Typescript";
import {
  ICourseType,
  ICreateChapterOfCourseType,
  IGetCourseType,
} from "../../types/courseType";

const initialState: ICourses[] = [];

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    createCourse: (state, action: ICourseType) => {
      return [...state, action.payload];
    },

    getCourses: (state, action: IGetCourseType) => {
      return action.payload;
    },

    createChapterOfCourse: (state, action: ICreateChapterOfCourseType) => {
      return state.map((course) => {
        if (course._id === action.payload.courseId) {
          return { ...course, content: action.payload.content };
        } else {
          return course;
        }
      });
    },

    addLessonInChapter: (state, action: any) => {
      return state.map((course) => {
        if (course?._id === action.payload.courseId) {
          return { ...course, content: action.payload.content };
        } else {
          return course;
        }
      });
    },

    updateCourse: (state, action: any) => {},

    deleteCourse: (state, action: any) => {},
  },
});
