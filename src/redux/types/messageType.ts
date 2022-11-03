import { IMessage, INewArrUserChatted, IUser } from "../../utils/Typescript";

export interface IMessageType {
  payload: { newArr: INewArrUserChatted[]; result: number };
}

// export interface IGetMessageType {
//   payload: {
//     value: any;
//     messages: IMessage[];
//     result: number;
//   };
// }

export interface IGetMessageType {
  payload: {
    sender: IUser;
    recipient: IUser;
    idConversation: string;
    messages: IMessage[];
    result: number;
  };
}
export interface IUpdateMessageConversationType {
  payload: {
    id: string;
    text: string;
  };
}
export interface IDeleteMessageType {
  payload: {
    id: string;
  };
}
