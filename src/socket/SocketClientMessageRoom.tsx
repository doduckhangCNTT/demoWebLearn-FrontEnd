import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { messageRoomSlice } from "../redux/reducers/roomChat/messageRoomChatSlice";
import { messageRoomChatSelector } from "../redux/selector/selectors";
import { IMessageRoom } from "../utils/Typescript";

const SocketClientMessageRoom = () => {
  const { socket } = useSelector(messageRoomChatSelector);
  const dispatch = useDispatch();

  // ------------------------ Create Message Room ------------------------
  useEffect(() => {
    (socket.value as Socket)?.on(
      "createMessageRoom",
      (message: IMessageRoom) => {
        dispatch(messageRoomSlice.actions.createMessage(message));
      }
    );
  }, [dispatch, socket.value]);

  // ------------------------ Delete Message Room ------------------------
  useEffect(() => {
    (socket.value as Socket)?.on("deleteMsg", (message: IMessageRoom) => {
      dispatch(messageRoomSlice.actions.deleteMessage({ id: message._id }));
    });
  }, [dispatch, socket.value]);

  return <div></div>;
};

export default SocketClientMessageRoom;
