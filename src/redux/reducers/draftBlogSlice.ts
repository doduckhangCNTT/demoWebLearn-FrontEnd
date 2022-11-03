import { createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../../utils/Typescript";
import { IBlogType, IDeleteBlogType, IGetBlogType } from "../types/blogType";

const initialState: IBlog[] = [];

export const draftBlogSlice = createSlice({
  name: "draftBlog",
  initialState,
  reducers: {
    createBlog: (state, action: IBlogType) => {
      return [action.payload, ...state];
    },

    getBlog: (state, action: IGetBlogType) => {
      return action.payload;
    },

    updateBlog: (state, action: any) => {
      const blogs = state.filter((item) => action.payload.id !== item._id);

      return [action.payload.newBlog, ...blogs];
    },

    deleteBlog: (state, action: IDeleteBlogType) => {
      const blogs = state.filter((item) => action.payload.id !== item._id);

      return blogs;
    },
  },
});
