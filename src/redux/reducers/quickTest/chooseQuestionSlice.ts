import { createSlice } from "@reduxjs/toolkit";
import { IQuestion, IQuickTest } from "../../../utils/Typescript";

const initialState = {
  question: {} as IQuestion,
  quickTest_OfQuestion: {} as IQuickTest,
};

interface IChooseQuestion {
  payload: {
    question: IQuestion;
    quickTest_OfQuestion: IQuickTest;
  };
}

export const chooseQuestionSlice = createSlice({
  name: "chooseQuestion",
  initialState,
  reducers: {
    createQuestionAndQuickTestNow: (state, action: IChooseQuestion) => {
      return action.payload;
    },
  },
});
