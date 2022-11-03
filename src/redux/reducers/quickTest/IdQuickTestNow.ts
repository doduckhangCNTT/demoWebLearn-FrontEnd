import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

interface IIdQuickTestNow {
  id: string;
}

export const idQuickTestSlice = createSlice({
  name: "id_QuickTestNow",
  initialState,
  reducers: {
    createIdQuickTestNow: (state, action: PayloadAction<IIdQuickTestNow>) => {
      return { ...state, id: action.payload.id };
    },
    updateEmptyIdQuickTestNow: (state, action: PayloadAction<any>) => {
      return action.payload.id;
    },
  },
});
