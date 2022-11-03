import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    socketComment: (state, action: any) => {
      return { ...state, value: action.payload };
    },
  },
});
