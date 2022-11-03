import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentBlogAction from "../../redux/action/commentBlogAction";
import ReplyCommentsBlogAction from "../../redux/action/replyCommentAction/replyCommentBlogAction";
import {
  authSelector,
  commentBlogSelector,
  replyCommentBlogSelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  IBlog,
  IComment,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";
import InputComments from "./InputComments";
import ShowReplyComment from "./replyComment/ShowReplyComment";
import ShowComment from "./ShowComment";

interface IProps {
  blog?: IBlog;
}

const Comments: React.FC<IProps> = ({ blog }) => {
  const initialState = {
    text: "",
  };
  const [comment, setComment] = useState(initialState);
  const { commentsBlog } = useSelector(commentBlogSelector);
  const { replyCommentsBlog } = useSelector(replyCommentBlogSelector);
  const { authUser } = useSelector(authSelector);

  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!blog) return;
    CommentBlogAction.getCommentsBlog(blog, dispatch);
    ReplyCommentsBlogAction.getReplyCommentsBlog(blog, dispatch);
  }, [blog, dispatch]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    const solution = async () => {
      if (!blog) return;
      if (!authUser.access_token) return;
      const data = {
        content: comment.text.trim(),
        user: authUser.user as IUser,
        blog_id: blog._id as string,
        blog_of_userID: (blog.user as IUser)._id,
        reply_comment: [],
        createdAt: new Date().toISOString(),
      };
      // setShowComments([data, ...showComments]);
      await CommentBlogAction.createCommentBlog(data, authUser, dispatch);
      CommentBlogAction.getCommentsBlog(blog, dispatch);
    };

    solution();
    setComment(initialState);
  };

  useEffect(() => {
    setShowComments((commentsBlog as any).comments);
  }, [blog?._id, commentsBlog]);

  return (
    <div>
      <div className="mt-[100px]">
        <h1 className="font-bold text-[20px]">
          So luong binh luan {showComments?.length}
        </h1>
      </div>

      {/* Comment your comment */}
      {authUser.access_token ? (
        <div className="mb-5">
          <InputComments
            comment={comment}
            handleSubmit={handleSubmit}
            handleChangeInput={handleChangeInput}
          />
        </div>
      ) : (
        <div className="mt-[10px]">
          You need Login to comment
          <Link to="/login" className="text-sky-600">
            {" "}
            Login{" "}
          </Link>
        </div>
      )}

      {/* List comment  */}
      <div className="flex-col gap-2 w-full ">
        {showComments
          ? showComments?.map(
              (item: IComment, index: React.Key | null | undefined) => {
                return (
                  <div className="" key={index}>
                    <ShowComment blog={blog} comment={item} />

                    <div>
                      {item.reply_comment
                        ? item.reply_comment?.map((i, index) => {
                            const checkReply = (
                              replyCommentsBlog as any
                            ).replyComments?.find(
                              (replyComment: { _id: IComment }) =>
                                replyComment._id === i
                            );

                            if (checkReply) {
                              return (
                                <div
                                  key={index}
                                  className="ml-[50px] relative mt-0 "
                                >
                                  <small className="absolute top-0 right-0 p-1">
                                    {checkReply.user.name} to{" "}
                                    <span className="text-sky-600 underline ">
                                      {checkReply.reply_user.name}
                                    </span>
                                  </small>
                                  <ShowReplyComment
                                    blog={blog}
                                    comment={checkReply}
                                  />
                                </div>
                              );
                            } else {
                              return [];
                            }
                          })
                        : " "}
                    </div>
                  </div>
                );
              }
            )
          : ""}
      </div>
    </div>
  );
};

export default Comments;
