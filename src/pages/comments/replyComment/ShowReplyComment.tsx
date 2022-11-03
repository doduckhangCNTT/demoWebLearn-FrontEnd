import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentBlogAction from "../../../redux/action/commentBlogAction";
import ReplyCommentsBlogAction from "../../../redux/action/replyCommentAction/replyCommentBlogAction";
import {
  authSelector,
  commentBlogSelector,
} from "../../../redux/selector/selectors";
import {
  FormSubmit,
  IBlog,
  InputChangedEvent,
  IReplyCommentBlog,
  IUser,
} from "../../../utils/Typescript";
import InputReplyComment from "./InputReplyComment";
import replyCommentBlogAction from "../../../redux/action/replyCommentAction/replyCommentBlogAction";

interface IProps {
  comment: IReplyCommentBlog;
  blog?: IBlog;
}

const ShowReplyComment: React.FC<IProps> = ({ blog, comment }) => {
  const initialState = {
    text: "",
    bodyUpdate: "",
  };
  const [commentBody, setCommentBody] = useState(initialState);
  const [checkEdit, setCheckEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const { authUser } = useSelector(authSelector);
  const { commentsBlog } = useSelector(commentBlogSelector);
  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setCommentBody({ ...commentBody, [name]: value });
  };

  const handleSaveCommentBlog = () => {
    if (!authUser.access_token || !blog) return;
    const body = { ...comment, content: commentBody.bodyUpdate.trim() };
    replyCommentBlogAction.updateReplyCommentBlog(
      body,
      authUser.access_token,
      dispatch
    );

    setCheckEdit(false);
  };

  const handleUpdateReplyCommentBlog = () => {
    if (!authUser.access_token) return;
    setCheckEdit(true);
    setCommentBody({ ...commentBody, bodyUpdate: comment.content });
  };

  const handleDeleteReplyCommentBlog = () => {
    const solution = async () => {
      if (!authUser.access_token || !blog) return;

      // Tìm kiếm comment gốc chứa id của reply comment
      const commentRoot = (commentsBlog as any).comments.find(
        (item: { _id: any }) => item._id === comment.rootComment_answeredId
      );
      // Lọc ra các id reply mà ko phải reply muốn xóa
      const replyComment = commentRoot?.reply_comment?.filter(
        (item: string) => item !== comment?._id
      );

      await replyCommentBlogAction.deleteReplyCommentBlog(
        { comment: comment, replyComment: replyComment },
        authUser.access_token,
        dispatch
      );

      await CommentBlogAction.getCommentsBlog(blog, dispatch);
      ReplyCommentsBlogAction.getReplyCommentsBlog(blog, dispatch);
    };

    solution();
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    const solution = async () => {
      if (!blog || !authUser.access_token) return;

      const data = {
        content: commentBody?.text.trim(),
        user: authUser.user as IUser,
        blog_id: blog._id as string,
        blog_of_userID: (blog.user as IUser)._id,
        reply_comment: [],
        reply_user: comment.user,
        // rootComment_answeredId: comment._id,
        originCommentHightestId: comment.rootComment_answeredId,
        rootComment_answeredId: comment._id,
        createdAt: new Date().toISOString(),
      };

      await ReplyCommentsBlogAction.createCommentBlog(
        data,
        authUser.access_token,
        dispatch
      );

      // await replyCommentsBlogAction.getReplyCommentsBlog(blog, dispatch);
      // CommentBlogAction.getCommentsBlog(blog, dispatch);
    };

    solution();
    setOnReply(!onReply);
  };

  return (
    <div className="flex gap-3 mt-2 w-full">
      <div className="">
        <img
          src={comment?.user.avatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-2 bg-slate-300 rounded-lg p-2">
          <div className="">
            <h1 className="font-bold text-[20px]">{comment.user.name}</h1>
          </div>

          {checkEdit ? (
            <div className="relative">
              <input
                type="text"
                name="bodyUpdate"
                onChange={handleChangeInput}
                value={commentBody.bodyUpdate}
                className="w-full outline-none p-2 rounded"
              />

              <div
                onClick={() => setCheckEdit(false)}
                className="rounded-full w-[25px] h-[25px] -top-[10px] -right-[10px] absolute border-2 hover:bg-sky-600 hover:text-white flex justify-center items-center cursor-pointer p-2 transition"
              >
                X
              </div>
            </div>
          ) : (
            <div className="">{comment.content}</div>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1">
            <div className="flex gap-3">
              <div className="hover:text-sky-600 transition cursor-pointer">
                Like
              </div>
              <div
                onClick={() => setOnReply(!onReply)}
                className="hover:text-sky-600 transition cursor-pointer"
              >
                Reply
              </div>
            </div>
            <small className="">
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>

          {comment.user._id === authUser.user?._id ? (
            <div className="flex gap-2">
              {checkEdit ? (
                <button
                  onClick={handleSaveCommentBlog}
                  className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleUpdateReplyCommentBlog}
                  className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
                >
                  Update
                </button>
              )}

              <button
                onClick={handleDeleteReplyCommentBlog}
                className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
              >
                Delete
              </button>
            </div>
          ) : (blog?.user as IUser)._id === authUser.user?._id ? (
            <button
              onClick={handleDeleteReplyCommentBlog}
              className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
        {onReply ? (
          <InputReplyComment
            handleChangeInput={handleChangeInput}
            handleSubmit={handleSubmit}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ShowReplyComment;
