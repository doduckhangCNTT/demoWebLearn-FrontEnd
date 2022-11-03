import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowUserAddRoom from "../../../components/chats/ShowUserAddRoom";
import { closeIcon } from "../../../components/icons/Icons";
import useDebounce from "../../../hooks/useDebounce";
import roomChatAction from "../../../redux/action/roomChat/roomChatAction";
import {
  authSelector,
  roomChatSelector,
} from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import {
  FormSubmit,
  InputChangedEvent,
  IRoomChatList,
  IUser,
} from "../../../utils/Typescript";

interface IProps {
  room?: IRoomChatList;
}

const TabAddUser: React.FC<IProps> = ({ room }) => {
  const { authUser } = useSelector(authSelector);
  const { roomChats } = useSelector(roomChatSelector);
  const dispatch = useDispatch();
  const initialUser = { name: "" };
  const [user, setUser] = useState(initialUser);
  const [usersSearch, setUsersSearch] = useState<IUser[]>([]);
  const [listUserToJoinRoom, setListUserToJoinRoom] = useState<IUser[]>([]);
  const debounced = useDebounce(user.name, 800);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Get users search
  useEffect(() => {
    const solution = async () => {
      const res = await getApi(
        `search_user?username=${debounced}`,
        authUser.access_token
      );
      setUsersSearch(res.data.users);
    };
    if (debounced.trim()) solution();
  }, [authUser.access_token, debounced]);

  const handleDeleteUser = (index: number) => {
    const listUser = [...listUserToJoinRoom];
    listUser.splice(index, 1);
    setListUserToJoinRoom(listUser);
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    listUserToJoinRoom.forEach((user) => {
      roomChats.rooms.forEach((room) => {
        if (room.users.find((item) => item._id === user._id)) {
        } else {
          if (!authUser.access_token) return;
          const data = {
            user: user,
            room: room,
          };
          roomChatAction.addUserRoomChat(data, dispatch, authUser.access_token);
        }
      });
      setListUserToJoinRoom([]);
    });
  };

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="p-2 outline-none w-full"
          placeholder="Add user ..."
          name="name"
          value={user.name}
          onChange={handleChangeInput}
        />

        {listUserToJoinRoom.length > 0 ? (
          <button
            type="submit"
            className="hover:bg-sky-600 hover:text-white p-2 border-2"
          >
            Add
          </button>
        ) : (
          ""
        )}
      </form>

      {/* List User Added  */}
      <div className="relative ">
        {user.name ? (
          <div className="absolute bg-white w-full shadow-md z-10 ">
            <ShowUserAddRoom
              users={usersSearch}
              listUserToJoinRoom={listUserToJoinRoom}
              setListUserToJoinRoom={setListUserToJoinRoom}
              user={user}
              setUser={setUser}
            />
          </div>
        ) : (
          ""
        )}
      </div>

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

export default TabAddUser;
