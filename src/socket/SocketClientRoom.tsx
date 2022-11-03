import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { roomChatSlice } from "../redux/reducers/roomChat/roomChatSlice";
import { messageRoomChatSelector } from "../redux/selector/selectors";

const SocketClientRoom = () => {
  const { socket } = useSelector(messageRoomChatSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (socket.value as Socket)?.on("createRoom", (data: any) => {
      console.log("Data: ", data);
      dispatch(
        roomChatSlice.actions.createRoomChat({
          roomChat: data,
          media: [],
          name: "",
          text: "",
          users: [],
          _id: "",
        })
      );
    });
  }, [dispatch, socket.value]);

  return <div></div>;
};

export default SocketClientRoom;
