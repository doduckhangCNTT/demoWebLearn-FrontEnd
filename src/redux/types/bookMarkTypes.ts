import { IBlog, IBookMarkBlogUser } from "../../utils/Typescript";

export interface IBookMarkUser {
  blogsSave: IBookMarkBlogUser[];
  count: number;
  id: string;
}

export interface IBookMarkType {
  payload: IBookMarkUser;
}
