import { createSlice } from "@reduxjs/toolkit";
import { IReplyCommentBlog } from "../../../utils/Typescript";
import {
  IDeleteCommentBlogType,
  IUpdateCommentBlogType,
} from "../../types/blogType";
import {
  IGetReplyCommentBlogType,
  IReplyCommentBlogType,
} from "../../types/replyCommentType";

const initialState: IReplyCommentBlog[] = [];

export const replyCommentsBlogSlice = createSlice({
  name: "replyCommentBlog",
  initialState,
  reducers: {
    createComment: (state, action: IReplyCommentBlogType) => {
      if (!(state as any)?.replyComments) return;

      console.log("Action Reply: ", action.payload);

      return {
        ...state,
        replyComments: [action.payload, ...(state as any)?.replyComments],
        count: (state as any).replyComments.length + 1,
      };
    },

    getComments: (state, action: IGetReplyCommentBlogType) => {
      return action.payload;
    },

    updateComment: (state, action: IUpdateCommentBlogType) => {
      const result = (state as any).replyComments.map(
        (item: { _id: string }) => {
          return action.payload._id === item._id
            ? { ...item, content: action.payload.body }
            : item;
        }
      );

      return {
        ...state,
        replyComments: result,
      };
    },

    deleteComment: (state, action: IDeleteCommentBlogType) => {
      const replyComments = (state as any).replyComments.filter(
        (item: { _id: string }) => action.payload._id !== item._id
      );

      return {
        ...state,
        replyComments: replyComments,
        count: replyComments.length,
      };
    },
  },
});
