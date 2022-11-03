import { ChangeEvent, FormEvent } from "react";
import store from "../redux/stores";

export type InputChangedEvent = ChangeEvent<
  (HTMLInputElement & EventTarget) | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IUserLogin {
  account: string;
  password: string;
}
export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  text?: string;
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  bio?: string;
  telephoneNumber?: string;
  updatedAt: string;
  _id: string;
  rf_token: string;
}

export interface IUserProfile extends IUserRegister {
  bio: string;
  telephoneNumber: string;
  avatar: File | string;
}

export interface IPayloadResetPass {
  password: string;
  cf_password: string;
}

export interface IPayloadResetPass_noCf {
  password: string;
}

export interface ICategory {
  _id?: string;
  name?: string;
  quality?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  count?: number;
  // thumbnail: string | File;
  thumbnail: {
    url: string | File;
    public_id: string;
  };
  category: string;
  createdAt: string;
}

export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_of_userID: string;
  content: string;
  reply_comment: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}
export interface IReplyCommentBlog {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_of_userID: string;
  content: string;
  reply_comment: IComment[];
  reply_user?: IUser;
  originCommentHightestId?: string;
  rootComment_answeredId?: string;
  createdAt: string;
}

export interface ICommentBlog {
  _id: string;
  userComment: IUser;
  comments: IComment[];
  count: number;
}

export interface IBookMarkBlogUser extends IBlog {
  id_blog?: string;
  userSaved?: string | IUser;
  blogs?: IBookMarkBlogUser[];
}

export interface IBlogsSavedUser {
  _id: string;
  userSaved?: string | IUser;
  blogs: IBlog[];
  count: number;
}

export interface IGetBlogsCategory {
  _id: string;
  blogs: IBlog[];
  category: ICategory;
  total?: number;
  search?: string;
  count?: number;
}
export interface IGetBlogsUser extends IBlog {
  id: string;
  blogs: IBlog[];
  count?: number;
}

export interface IDeleteBlog {
  id: string;
}
export interface IDeleteSaveBlog {
  _id: string;
}
export interface IDeleteCommentBlog {
  _id?: string;
  idReply?: string;
}
export interface IUpdateCommentBlog {
  _id: string;
  body: string;
  idReply?: string;
}

export interface IMessage {
  conversation?: string;
  createdAt?: string;
  media?: any[];
  _id?: string;
  sender: IUser;
  recipient: IUser | string;
  text: string;
}

export interface IConversation {
  recipients: IUser[];
  text: string;
  media: any[];
}

export interface INewArrUserChatted extends IUser {
  text: string;
  media: any[];
}

export interface IRoomChat {
  nameRoom: string;
  listUser: IUser[];
}

export interface IRoomChatList {
  _id?: string;
  name: string;
  users: IUser[];
  admin: IUser[];
}

export interface IMessageRoom {
  roomId?: string;
  media?: any[];
  _id?: string;
  createdAt?: string;
  sender: IUser;
  text: string;
  roomChat?: IRoomChatList;
}

// -------------- quick test interface --------------
export interface IQuickTest {
  _id?: string;
  user?: IUser | string;
  titleTest: string;
  category: string | object;
  time: number;
  description: string;
  image: {
    url: string | File;
    public_id: string;
  };
  numberOfTimes: number;
  questions?: IQuestion[];
  idQuickTest?: string;
  createdAt?: string;
}

export interface IQuestion {
  _id?: string;
  titleQuestion: string;
  typeQuestion: string;
  correctly: string;
  answers: IAnswer[];
}

export interface IAnswer {
  content: string;
}

export interface IQuestionNow {
  _id: string;
  user: IUser;
  questions: IQuestion[];
}

export interface ICourse {
  name: string;
  url: string;
  description: string;
  price: string;
  oldPrice: string;
  link: string;
}

export interface ICourses {
  _id?: string;
  user?: IUser;
  name: string;
  thumbnail: {
    public_id: string;
    url: string | File;
  };
  description: string;
  accessModifier: string;
  category: string;
  videoIntro: string;
  format: string;
  price: number;
  oldPrice: number;
  // courses: [{ name: "", lessons: [{ name: "", url: "", description: "" }] }],
  content: IChapter[];
}

export interface IChapter {
  _id?: string;
  name: string;
  lessons: ILesson[];
}

export interface ILesson {
  _id?: string;
  name: string;
  url: string | File;
  fileUpload: {
    public_id: string;
    secure_url: string;
    mimetype: string;
  };
  description: string;
}
