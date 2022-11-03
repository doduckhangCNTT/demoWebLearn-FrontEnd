import { createSlice } from "@reduxjs/toolkit";
import { IGetBlogsCategory } from "../../utils/Typescript";
import { IGetBlogsCategoryType } from "../types/blogType";

const initialState: IGetBlogsCategory[] = [];

export const blogsCategorySlice = createSlice({
  name: "blogsCategory",
  initialState,
  reducers: {
    getBlogsCategory: (state, action: IGetBlogsCategoryType) => {
      return action.payload;
    },
  },
});
