import { createSlice } from "@reduxjs/toolkit";
import { IBookMarkBlogUser } from "../../utils/Typescript";
import {
  IBlogType,
  IDeleteSaveBlogType,
  IGetBlogType,
} from "../types/blogType";

const initialState: IBookMarkBlogUser[] = [];

export const saveBlogSlice = createSlice({
  name: "saveBlog",
  initialState,
  reducers: {
    createBlog: (state, action: IBlogType) => {
      console.log("State: ", state);
      return {
        ...state,
        blogs: [action.payload, ...(state as any).blogs],
        count: (state as any).blogs.length + 1,
      };
    },

    getBlog: (state, action: IGetBlogType) => {
      return action.payload;
    },

    deleteBlog: (state, action: IDeleteSaveBlogType) => {
      const blogs = (state as any).blogs.filter(
        (item: { _id: string }) => action.payload._id !== item._id
      );

      return blogs;
    },
  },
});
