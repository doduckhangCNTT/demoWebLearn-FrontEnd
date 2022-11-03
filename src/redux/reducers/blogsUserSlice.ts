import { createSlice } from "@reduxjs/toolkit";
import { IGetBlogsUser } from "../../utils/Typescript";
import { IGetBlogsUserType } from "../types/blogType";

const initialState: IGetBlogsUser[] = [];

export const blogsUserSlice = createSlice({
  name: "blogsUser",
  initialState,
  reducers: {
    getBlogsUser: (state, action: IGetBlogsUserType) => {
      // return [...state, action.payload];
      return action.payload;
    },
  },
});
