import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuickTest } from "../../../utils/Typescript";

interface IUpdateQuickTestPage {
  data: IQuickTest[];
}

const initialState = {
  data: [] as IQuickTest[],
  totalCount: 0,
};

export const quickTestsPageSlice = createSlice({
  name: "quickTestPage",
  initialState,
  reducers: {
    createQuickTestPage: (state, action: any) => {
      return action.payload;
    },

    updateQuickTestPage: (
      state,
      action: PayloadAction<IUpdateQuickTestPage>
    ) => {
      return {
        ...state,
        data: [...action.payload?.data],
      };
    },
  },
});
