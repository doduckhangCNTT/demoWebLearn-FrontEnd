import { createSlice } from "@reduxjs/toolkit";
import { IQuickTest } from "../../../utils/Typescript";
import { IQuickTestType } from "../../types/quickTestType";

const initialState: IQuickTest[] = [];

interface IQuestionUpdateType {
  payload: {
    quickQuestion: IQuickTest;
  };
}
interface IQuestionDeleteType {
  payload: {
    quickQuestion: IQuickTest;
  };
}

export const quickTestSlice = createSlice({
  name: "quickTest",
  initialState,
  reducers: {
    createQuickTests: (state, action: IQuickTestType) => {
      return action.payload;
    },

    updateQuestionQuickTest: (state, action: any) => {
      const value = state.map((item) => {
        if (item._id === action.payload.idQuickTest) {
          return {
            ...item,
            questions: action.payload.quickTest.questions,
          };
        } else {
          return item;
        }
      });

      return value;
    },

    updateQuestion: (state, action: IQuestionUpdateType) => {
      const value = state.map((item) => {
        if (item._id === action.payload.quickQuestion._id) {
          return action.payload.quickQuestion;
        } else {
          return item;
        }
      });

      return value;
    },

    deleteQuestion: (state, action: IQuestionDeleteType) => {
      const value = state.map((item) => {
        if (item._id === action.payload.quickQuestion._id) {
          return action.payload.quickQuestion;
        } else {
          return item;
        }
      });

      return value;
    },
  },
});
