import { createSlice } from "@reduxjs/toolkit";
import { ILesson } from "../../../utils/Typescript";

interface ILessonType {
  payload: ILesson;
}

const initialState = {} as ILesson;

export const chooseLessonSlice = createSlice({
  name: "chooseLesson",
  initialState,
  reducers: {
    getLesson: (state, action: ILessonType) => {
      return action.payload;
    },
  },
});
