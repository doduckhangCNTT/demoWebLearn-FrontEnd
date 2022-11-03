import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { messageSlice } from "../redux/reducers/message/messageSlice";
import { authSelector, socketSelector } from "../redux/selector/selectors";
import { IMessage } from "../utils/Typescript";

const SocketClientMessage = () => {
  const { authUser } = useSelector(authSelector);
  const { socket } = useSelector(socketSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.user) return;
    (socket.value as Socket).emit("joinUser", authUser.user._id);
  }, [authUser.user, socket.value]);

  useEffect(() => {
    (socket.value as Socket)?.on("createMessage", (msg: IMessage) => {
      console.log("Message: ", msg);

      dispatch(messageSlice.actions.createMessage(msg));
      dispatch(
        messageSlice.actions.updateMessageConversation({
          id: msg?.recipient as string,
          text: msg.text || "files",
        })
      );
    });
  }, [dispatch, socket.value]);

  useEffect(() => {
    (socket.value as Socket)?.on("deleteMessage", (msg: IMessage) => {
      console.log("Message: ", msg);

      dispatch(
        messageSlice.actions.deleteMessage({ id: msg._id ? msg._id : "" })
      );
    });
  }, [dispatch, socket.value]);

  return <div></div>;
};

export default SocketClientMessage;
