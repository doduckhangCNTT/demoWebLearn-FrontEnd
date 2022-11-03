import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import NotFound from "../../../components/global/NotFound";
import messageRoomChatAction from "../../../redux/action/roomChat/messageRoomChatAction";
import {
  authSelector,
  messageRoomChatSelector,
  roomChatSelector,
  socketSelector,
} from "../../../redux/selector/selectors";
import { postApi } from "../../../utils/FetchData";
import {
  FormSubmit,
  IMessageRoom,
  IRoomChatList,
} from "../../../utils/Typescript";
import ShowContentChat from "../ShowContentChat";
import ShowMessages from "../ShowMessages";

const ContentRoomChat = () => {
  const { roomId } = useParams();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const refDisplay = useRef<HTMLDivElement>(null);
  const [roomChat, setRoomChat] = useState<IRoomChatList>();

  const { authUser } = useSelector(authSelector);
  const { messageRoom } = useSelector(messageRoomChatSelector);
  const { roomChats } = useSelector(roomChatSelector);
  const { socket } = useSelector(socketSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const solution = async () => {
      const roomChat = roomChats.rooms?.find(
        (roomChat) => roomChat._id === roomId
      );
      setRoomChat(roomChat);
    };
    solution();
  }, [roomChats.rooms, roomId]);

  useEffect(() => {
    if (!roomId || !authUser.access_token) return;

    messageRoomChatAction.getMessages(roomId, authUser.access_token, dispatch);
  }, [authUser.access_token, dispatch, roomId]);

  // Socket
  useEffect(() => {
    if (!roomId || !socket) return;
    socket && (socket.value as Socket).emit("joinRoom", roomId);

    return () => {
      (socket.value as Socket).emit("outRoom", roomId);
    };
  }, [roomId, socket]);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (text.trim().length === 0 && media.length === 0) return;
    if (!authUser.access_token || !authUser.user || !roomId) return;

    // Upload Img Video
    let imgArr = [];
    if (media.length > 0) {
      for (const item of media) {
        let formData = new FormData();
        if ((item as any).camera) {
          formData.append("file", (item as any).camera);
        } else {
          formData.append("file", item);
        }

        const res = await postApi(
          "upload_imgVideo",
          formData,
          authUser.access_token
        );

        console.log("Res Upload: ", res);
        const data = await res.data;
        imgArr.push({
          mimetype: data.format,
          public_id: data.public_id,
          url: data.secure_url,
        });
      }
    }
    const msg = {
      roomId,
      sender: authUser.user,
      text,
      media: imgArr,
    };
    messageRoomChatAction.createMessage(msg, authUser.access_token, dispatch);
    setText("");
    setMedia([]);

    if (refDisplay.current) {
      refDisplay.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  if (!roomChat?.users.some((user) => user._id === authUser.user?._id)) {
    return <NotFound />;
  }
  return (
    <div>
      <ShowContentChat
        value={roomChat}
        text={text}
        media={media}
        setText={setText}
        setMedia={setMedia}
        handleSubmit={handleSubmit}
        room={roomChat}
      >
        <>
          {messageRoom.messages?.map((msg: IMessageRoom, index) => {
            return (
              <div key={index} className="mt-2">
                <ShowMessages msg={msg} />
              </div>
            );
          })}
        </>
      </ShowContentChat>
    </div>
  );
};

export default ContentRoomChat;
