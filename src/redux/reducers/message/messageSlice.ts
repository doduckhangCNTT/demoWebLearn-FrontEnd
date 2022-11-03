import { createSlice } from "@reduxjs/toolkit";
import { INewArrUserChatted } from "../../../utils/Typescript";
import {
  IDeleteMessageType,
  IGetMessageType,
  IMessageType,
  IUpdateMessageConversationType,
} from "../../types/messageType";

const initialState = {
  usersChatted: [] as INewArrUserChatted[],
  resultUsers: 0,
  data: [] as IGetMessageType[],
  firstLoad: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMessage: (state, action: any) => {
      return {
        ...state,
        data: {
          ...state.data,
          messages: [...(state.data as any).messages, action.payload],
        },
      };
    },

    updateMessageConversation: (
      state,
      action: IUpdateMessageConversationType
    ) => {
      return {
        ...state,
        usersChatted: state.usersChatted.map((item) => {
          return item._id === action.payload.id
            ? { ...item, text: action.payload.text }
            : item;
        }),
      };
    },

    getConversations: (state, action: IMessageType) => {
      return {
        ...state,
        usersChatted: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };
    },

    getMessages: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },

    deleteMessage: (state, action: IDeleteMessageType) => {
      return {
        ...state,
        data: {
          ...state.data,
          messages: (state.data as any).messages.filter(
            (msg: { _id: string }) => msg._id !== action.payload.id
          ),
        },
      };
    },
  },
});
