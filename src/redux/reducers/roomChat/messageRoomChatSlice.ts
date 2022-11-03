import { createSlice } from "@reduxjs/toolkit";
import { IMessageRoom } from "../../../utils/Typescript";

import { IRoomChatList } from "../../../utils/Typescript";

const initialState = {
  room: {} as IRoomChatList,
  messages: [] as IMessageRoom[],
};

export const messageRoomSlice = createSlice({
  name: "messageRoom",
  initialState,
  reducers: {
    getMessages: (state, action: any) => {
      return {
        ...state,
        room: action.payload[0]?.roomChat,
        messages: action.payload,
      };
    },

    createMessage: (state, action: any) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },

    deleteMessage: (state, action: any) => {
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== action.payload.id
        ),
      };
    },

    addUserRoomChat: (state, action: any) => {
      return {
        ...state,
        room: {
          ...state.room,
          users: [...state.room.users, action.payload.user],
        },
      };
    },

    addUserAdminRoomChat: (state, action: any) => {
      return {
        ...state,
        room: {
          ...state.room,
          admin: [...state.room.admin, action.payload.user],
        },
      };
    },

    deleteUserRoomChat: (state, action: any) => {
      return {
        ...state,
        room: {
          ...state.room,
          users: action.payload.usersInRoom.users,
        },
      };
    },

    deleteUserAdminRoomChat: (state, action: any) => {
      return {
        ...state,
        room: {
          ...state.room,
          admin: action.payload.adminsInRoom.admin,
        },
      };
    },
  },
});
