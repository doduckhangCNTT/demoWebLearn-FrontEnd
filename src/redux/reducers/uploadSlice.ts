import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadImg: (state, action: any) => {
      return action.payload;
    },
  },
});
