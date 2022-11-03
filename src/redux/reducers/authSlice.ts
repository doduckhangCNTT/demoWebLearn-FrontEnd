import { createSlice } from "@reduxjs/toolkit";
import { IAuth, IAuthType } from "../types/authType";
import { IUploadImg } from "../types/uploadType";

const initialState: IAuth = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser: (state, action: IAuthType) => {
      return action.payload;
    },
    uploadImg: (state, action: IUploadImg) => {
      return { ...state, user: action.payload };
    },
  },
});
