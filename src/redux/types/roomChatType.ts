import { IUser } from "../../utils/Typescript";

export interface Room {
  media: string[];
  name: string;
  text: string;
  users: IUser[];
  _id: string;
}
export interface IRoomChat extends Room {
  admin: IUser[] | string[];
}

export interface CreateRoomChat extends Room {
  admin: IUser[];
}
export interface ICreateRoomChat extends Room {
  msg?: string;
  roomChat: CreateRoomChat;
}
export interface ICreateRoomChatType {
  payload: ICreateRoomChat;
}

export interface IAddUserRoomChat {
  payload: { user: IUser; usersInRoom: IRoomChat; adminsInRoom?: IRoomChat };
}
export interface IDeleteUserRoomChat {
  payload: {
    users: IUser[];
    usersInRoom: IRoomChat;
  };
}
export interface IDeleteUserAdminRoomChat {
  payload: {
    adminsInRoom: IRoomChat;
    admin: IUser[];
  };
}
