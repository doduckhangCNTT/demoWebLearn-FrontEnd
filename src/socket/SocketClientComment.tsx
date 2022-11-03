import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { commentBlogSlice } from "../redux/reducers/commentBlogSlice";
import { replyCommentsBlogSlice } from "../redux/reducers/replyCommentSlice/replyCommentBlogSlice";
import { socketSelector } from "../redux/selector/selectors";
import { IComment } from "../utils/Typescript";

const SocketClientComment = () => {
  const { socket } = useSelector(socketSelector);
  const dispatch = useDispatch();

  // --------------------- Comment Blog --------------------------------
  useEffect(() => {
    (socket.value as Socket)?.on("createCommentBlog", (data: any) => {
      dispatch(commentBlogSlice.actions.createComment(data));
    });

    return () => {
      (socket.value as Socket)?.off("createCommentBlog");
    };
  }, [socket, dispatch]);

  // --------------------- Update Comment --------------------
  useEffect(() => {
    (socket.value as Socket)?.on("updateCommentBlog", (data: IComment) => {
      dispatch(
        commentBlogSlice.actions.updateComment({
          _id: data._id ? data._id : "",
          body: data.content,
        })
      );
    });

    return () => {
      (socket.value as Socket)?.off("updateCommentBlog");
    };
  }, [dispatch, socket.value]);

  // --------------------- Delete Comment --------------------
  useEffect(() => {
    (socket.value as Socket)?.on("deleteCommentBlog", (data: IComment) => {
      dispatch(commentBlogSlice.actions.deleteComment(data));
    });

    return () => {
      (socket.value as Socket)?.off("deleteCommentBlog");
    };
  }, [dispatch, socket.value]);

  // --------------------- Reply Comment --------------------
  useEffect(() => {
    (socket.value as Socket)?.on("replyCommentBlog", (data: any) => {
      dispatch(
        commentBlogSlice.actions.updateReplyComment({
          _id: data.idComment,
          idReply: data._id,
          body: "",
        })
      );
      dispatch(replyCommentsBlogSlice.actions.createComment(data));
    });

    return () => {
      (socket.value as Socket)?.off("replyCommentBlog");
    };
  }, [socket, dispatch]);

  // --------------------- Update Reply Comment --------------------
  useEffect(() => {
    (socket.value as Socket)?.on("updateReplyCommentBlog", (data: any) => {
      console.log("Data: ", data);
      dispatch(
        replyCommentsBlogSlice.actions.updateComment({
          _id: data?._id,
          body: data.content,
        })
      );
    });

    return () => {
      (socket.value as Socket)?.off("updateReplyCommentBlog");
    };
  }, [socket, dispatch]);

  // --------------------- Delete Reply Comment --------------------
  useEffect(() => {
    (socket.value as Socket)?.on("deleteReplyCommentBlog", (data: any) => {
      dispatch(
        commentBlogSlice.actions.deleteReplyComment({
          _id: data.idComment,
          idReply: data._id,
        })
      );

      dispatch(
        replyCommentsBlogSlice.actions.deleteComment({
          _id: data?._id,
        })
      );
    });

    return () => {
      (socket.value as Socket)?.off("deleteReplyCommentBlog");
    };
  }, [dispatch, socket.value]);

  return <div></div>;
};

export default SocketClientComment;
