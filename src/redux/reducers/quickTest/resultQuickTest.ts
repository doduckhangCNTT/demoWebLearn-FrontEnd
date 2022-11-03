import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const resultQuickTestSlice = createSlice({
  name: "result_quickTest",
  initialState,
  reducers: {
    createResultQT: (state, action: PayloadAction<any>) => {},
  },
});
