import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { conversationIcons, searchIcon } from "../../components/icons/Icons";
import useDebounce from "../../hooks/useDebounce";
import {
  authSelector,
  messageRoomChatSelector,
  messageSelector,
  roomChatSelector,
} from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import { InputChangedEvent, IUser } from "../../utils/Typescript";

const Conversations = () => {
  const { authUser } = useSelector(authSelector);
  const { roomChats } = useSelector(roomChatSelector);
  const { conversation } = useSelector(messageSelector);
  const { messageRoom } = useSelector(messageRoomChatSelector);

  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const debounced = useDebounce(searchUser, 800);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setSearchUser(value);
  };

  useEffect(() => {
    const solution = async () => {
      const listUserSearch = await getApi(
        `search_user?username=${debounced}`,
        authUser.access_token
      );
      setUsers(listUserSearch?.data.users);
    };

    if (debounced.trim()) solution();
  }, [authUser.access_token, debounced]);

  return (
    <div className="sticky top-[60px]">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="text-[25px] font-bold">Conversation</h1>
            {/* Options */}
            <div className="flex gap-2">
              {conversationIcons.map((option, index) => {
                return (
                  <Link
                    to={option.path}
                    key={index}
                    className="rounded-full p-2 bg-gray-300 hover:opacity-[0.8] cursor-pointer items-center justify-center "
                  >
                    {option.icon}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex border-2 rounded-full">
            {/* Search */}
            <form action="" className="flex items-center w-full ">
              <input
                type="text"
                placeholder="Search..."
                className="outline-0 rounded-full w-full px-5 py-2"
                onChange={handleChangeInput}
              />
              <button className="hover:bg-sky-600 hover:text-white rounded-r-full h-full transition px-3 ">
                {searchIcon.icon}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col touch-pan-y">
          {/* List room joined */}
          <ul>
            {roomChats.rooms?.map((room, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`roomChat/${room?._id}`}
                    className="flex justify-between p-2 border-2"
                  >
                    {/* Title && text chat */}
                    <div>
                      <h1 className="text-[20p] font-bold">{room?.name}</h1>
                      <small>
                        {
                          messageRoom.messages[messageRoom.messages.length - 1]
                            ?.text
                        }
                      </small>
                    </div>

                    {/* Show a little users in Room Chat */}
                    <div>
                      <div className="mt-3 flex -space-x-2 overflow-hidden">
                        {room?.users.slice(0, 3).map((user, index) => {
                          return (
                            <img
                              key={index}
                              className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                              src={user.avatar}
                              alt=""
                            />
                          );
                        })}
                      </div>
                      <div className="mt-3 text-sm font-medium">
                        <div className="text-blue-500">
                          {room?.users.length - 3 < 0
                            ? ""
                            : `+${room?.users.length - 3} others`}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Lists of conversations */}
          <ul className="w-full touch-pan-y">
            {(searchUser ? users : conversation.usersChatted).map(
              (user, index) => {
                return (
                  <li
                    key={index}
                    className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md"
                  >
                    <div className="relative">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={`${user.avatar}`}
                        alt="man"
                      />
                      <span
                        className={`absolute bottom-0 right-0  w-[10px] h-[10px] bg-green-500 rounded-full `}
                      ></span>
                    </div>
                    <div className="ml-3 overflow-hidden w-full flex flex-col">
                      <Link
                        to={`chat/${user._id}`}
                        className="text-sm font-medium text-slate-900"
                      >
                        {user.name}
                      </Link>

                      <small className="text-sm text-slate-500 truncate">
                        {user.text
                          ? user.text.length > 20
                            ? user.text.slice(0, 20) + "..."
                            : user.text
                          : user.account}
                      </small>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
