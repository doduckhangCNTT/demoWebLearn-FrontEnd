import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowUserSearch from "../../../components/chats/ShowUserSearch";
import { closeIcon } from "../../../components/icons/Icons";
import useDebounce from "../../../hooks/useDebounce";
import roomChatAction from "../../../redux/action/roomChat/roomChatAction";
import { authSelector } from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import {
  FormSubmit,
  InputChangedEvent,
  IUser,
} from "../../../utils/Typescript";

const RoomChat = () => {
  const initialRoom = {
    userName: "",
    roomName: "",
  };

  const { authUser } = useSelector(authSelector);
  const [users, setUsers] = useState<IUser[]>([]);

  const [room, setRoom] = useState(initialRoom);
  const [listUserToJoinRoom, setListUserToJoinRoom] = useState<IUser[]>([]);
  const debounced = useDebounce(room.userName, 800);

  const dispatch = useDispatch();

  const handleDeleteUser = (index: number) => {
    const listUser = [...listUserToJoinRoom];
    listUser.splice(index, 1);

    setListUserToJoinRoom(listUser);
  };

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) return;
    const data = {
      nameRoom: room.roomName,
      listUser: listUserToJoinRoom,
    };
    roomChatAction.createRoomChat(data, dispatch, authUser.access_token);
  };

  useEffect(() => {
    const solution = async () => {
      const res = await getApi(
        `search_user?username=${debounced}`,
        authUser.access_token
      );
      setUsers(res.data.users);
    };
    if (debounced.trim()) solution();
  }, [authUser.access_token, debounced]);

  return (
    <div className="mt-[20px]">
      <form action="flex gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="roomName"
              className="p-3 shadow-md w-full outline-none"
              placeholder="Name Room chat"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              name="userName"
              value={room.userName}
              className="p-3 shadow-md w-full outline-none mt-2"
              placeholder="Search user you want to join"
              onChange={handleChangeInput}
            />
            {/* Show User search  */}
            <div className="relative">
              {room.userName ? (
                <div className="absolute bg-white w-full shadow-md z-10 ">
                  <ShowUserSearch
                    users={users}
                    listUserToJoinRoom={listUserToJoinRoom}
                    setListUserToJoinRoom={setListUserToJoinRoom}
                    room={room}
                    setRoom={setRoom}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-end bg-sky-500 text-white items-center hover:opacity-[0.8]"
          >
            Create Room
          </button>
        </div>
      </form>

      {/* List user JoinRoom  */}
      <div className="flex gap-2 flex-wrap">
        {listUserToJoinRoom?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-2 p-2 bg-sky-500 rounded-full mt-[10px] relative peer"
            >
              <span className="">{item.name}</span>
              <button
                onClick={() => handleDeleteUser(index)}
                className="transition absolute -top-[10px] -right-[10px] hover:bg-red-200 rounded-full cursor-pointer p-1"
              >
                {closeIcon.icon}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomChat;
