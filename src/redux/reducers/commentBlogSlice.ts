import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../utils/Typescript";
import {
  IDeleteCommentBlogType,
  IUpdateCommentBlogType,
} from "../types/blogType";
import { ICommentType, IGetCommentType } from "../types/commentType";

const initialState: IComment[] = [];

export const commentBlogSlice = createSlice({
  name: "commentBlog",
  initialState,
  reducers: {
    createComment: (state, action: ICommentType) => {
      if (!(state as any)?.comments) {
        return;
      }

      return {
        ...state,
        comments: [action.payload, ...(state as any)?.comments],
        count: (state as any).comments.length + 1,
      };
    },

    getComments: (state, action: IGetCommentType) => {
      return action.payload;
    },

    updateComment: (state, action: IUpdateCommentBlogType) => {
      const result = (state as any).comments.map((item: { _id: string }) => {
        return action.payload._id === item._id
          ? { ...item, content: action.payload.body }
          : item;
      });

      return {
        ...state,
        comments: result,
      };
    },

    updateReplyComment: (state, action: IUpdateCommentBlogType) => {
      const result = (state as any).comments.map(
        (item: { _id: string; reply_comment: IComment[] }) => {
          return action.payload._id === item._id
            ? {
                ...item,
                reply_comment: [...item.reply_comment, action.payload.idReply],
              }
            : item;
        }
      );

      return {
        ...state,
        comments: result,
      };
    },

    deleteReplyComment: (state, action: IDeleteCommentBlogType) => {
      const idReply = action.payload.idReply;

      if (!idReply) return;
      const result = (state as any).comments.map(
        (comment: { _id: string; reply_comment: string[] }) => {
          return action.payload._id === comment._id
            ? {
                ...comment,
                reply_comment: comment.reply_comment.filter(
                  (item) => item !== idReply
                ),
              }
            : comment;
        }
      );

      return {
        ...state,
        comments: result,
      };
    },

    deleteComment: (state, action: IDeleteCommentBlogType) => {
      const comments = (state as any).comments.filter(
        (item: { _id: string }) => action.payload?._id !== item._id
      );

      return {
        ...state,
        comments: comments,
        count: comments.length,
      };
    },
  },
});
