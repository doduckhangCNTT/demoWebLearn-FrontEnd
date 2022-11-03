import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import messageAction from "../../redux/action/message/messageAction";
import roomChatAction from "../../redux/action/roomChat/roomChatAction";
import { authSelector } from "../../redux/selector/selectors";
import Conversations from "./Conversations";

const Chats = () => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [toggleConversation, setToggleConversation] = useState<boolean>(false);

  useEffect(() => {
    if (!authUser.access_token) return;
    messageAction.getConversations(authUser, dispatch);
    roomChatAction.getRoomChats(dispatch, authUser.access_token);
  }, [authUser, dispatch]);

  return (
    <div className="flex gap-2 relative my-2">
      {/* Content chats  */}
      <div
        className={`${
          toggleConversation ? "w-full" : "lg:w-2/3 md:w-full sm:w-full w-full"
        } `}
      >
        <Outlet />
        <div className="flex justify-end fixed z-20 top-[60px] right-0">
          <button
            onClick={() => setToggleConversation(!toggleConversation)}
            className="
            p-1
            top-[100px] right-0 z-10 rounded-md 
            cursor-pointer font-bold 
            bg-gray-100 
            hover:bg-sky-500 hover:text-white
            transition
            "
          >
            {toggleConversation ? "Open" : "Close"}
          </button>
        </div>
      </div>

      {/* Conversation chats  */}
      <div
        className={`${
          toggleConversation
            ? "lg:w-0"
            : ` md:sticky sm:absolute absolute
                top-[70px] right-0 h-full 
                lg:mt-0 md:mt-0 sm:mt-[30px] mt-[30px] 
                lg:w-1/3 md:w-full sm:w-full w-full
                touch-pan-y
              `
        } 
          bg-slate-400
          border-2 
        `}
      >
        {!toggleConversation && <Conversations />}
      </div>
    </div>
  );
};

export default Chats;
