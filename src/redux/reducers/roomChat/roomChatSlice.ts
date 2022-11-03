import { createSlice } from "@reduxjs/toolkit";
import { IRoomChatList, IUser } from "../../../utils/Typescript";
import {
  IAddUserRoomChat,
  ICreateRoomChatType,
  IDeleteUserAdminRoomChat,
  IDeleteUserRoomChat,
} from "../../types/roomChatType";

const initialState = {
  rooms: [] as IRoomChatList[],
};

export const roomChatSlice = createSlice({
  name: "roomChat",
  initialState,
  reducers: {
    getRoomsChat: (state, action: any) => {
      if (state.rooms.every((room) => room._id !== action.payload[0]._id)) {
        return {
          ...state,
          rooms: [...state.rooms, ...action.payload],
        };
      }
    },

    createRoomChat: (state, action: ICreateRoomChatType) => {
      return {
        ...state,
        rooms: [...state.rooms, action.payload.roomChat],
      };
    },

    addUserRoomChat: (state, action: IAddUserRoomChat) => {
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload.usersInRoom._id
            ? { ...room, users: [...room.users, action.payload.user] }
            : room
        ),
      };
    },

    addUserAdminRoomChat: (state, action: IAddUserRoomChat) => {
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload.adminsInRoom?._id
            ? { ...room, admin: [...room.admin, action.payload.user] }
            : room
        ),
      };
    },

    deleteUserRoomChat: (state, action: IDeleteUserRoomChat) => {
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload.usersInRoom._id
            ? { ...room, users: action.payload.usersInRoom.users }
            : room
        ),
      };
    },

    deleteUserAdminRoomChat: (state, action: IDeleteUserAdminRoomChat) => {
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload.adminsInRoom?._id
            ? { ...room, admin: action.payload.adminsInRoom.admin as IUser[] }
            : room
        ),
      };
    },
    deleteRoomChat: (state, action: any) => {
      return {
        ...state,
        rooms: state.rooms.filter(
          (room) => room?._id !== action.payload.roomChat?._id
        ),
      };
    },

    updateRoomChat: (state, action: any) => {
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room?._id === action.payload.roomChat?._id
            ? { ...room, name: action.payload.name }
            : room
        ),
      };
    },
  },
});
