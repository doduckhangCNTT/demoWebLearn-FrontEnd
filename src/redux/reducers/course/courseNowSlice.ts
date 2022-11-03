import { createSlice } from "@reduxjs/toolkit";

interface ICourseIdNow {
  payload: {
    courseId: string;
  };
}
interface IChapterIdNow {
  payload: { chapterId: string };
}

const initialState = {
  courseId: "",
  chapterId: "",
};

export const courseNowSlice = createSlice({
  name: "courseId",
  initialState,
  reducers: {
    getCourseIdNow: (state, action: ICourseIdNow) => {
      return { ...state, courseId: action.payload.courseId };
    },
    getChapterIdNow: (state, action: IChapterIdNow) => {
      return { ...state, chapterId: action.payload.chapterId };
    },

    // updateChapterId: (state, action: any) => {
    //   return {...state, chapterId: action.payload.chapterId}
    // }
  },
});
