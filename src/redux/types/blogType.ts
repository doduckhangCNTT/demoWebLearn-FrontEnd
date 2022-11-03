import {
  IBlog,
  IDeleteBlog,
  IDeleteCommentBlog,
  IDeleteSaveBlog,
  IGetBlogsCategory,
  IGetBlogsUser,
  IUpdateCommentBlog,
} from "../../utils/Typescript";

export interface IBlogType {
  payload: IBlog;
}
export interface IGetBlogType {
  payload: IBlog[];
}
export interface IGetBlogsCategoryType {
  payload: IGetBlogsCategory[];
}
export interface IGetBlogsUserType {
  payload: IGetBlogsUser[];
}
export interface IDeleteBlogType {
  payload: IDeleteBlog;
}
export interface IDeleteSaveBlogType {
  payload: IDeleteSaveBlog;
}
export interface IDeleteCommentBlogType {
  payload: IDeleteCommentBlog;
}
export interface IUpdateCommentBlogType {
  payload: IUpdateCommentBlog;
}
