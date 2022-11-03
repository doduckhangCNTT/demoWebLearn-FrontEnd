import { createSlice } from "@reduxjs/toolkit";
import { IAlert, IAlertType } from "../types/alertType";

const initialState: IAlert = {};

export const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    alertAdd: (state, action: IAlertType) => {
      return action.payload;
    },
  },
});
