import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomChatAction from "../../../redux/action/roomChat/roomChatAction";
import { authSelector } from "../../../redux/selector/selectors";
import {
  FormSubmit,
  InputChangedEvent,
  IRoomChatList,
} from "../../../utils/Typescript";

interface IProps {
  room: IRoomChatList;
}

const TabEditRoom: React.FC<IProps> = ({ room }) => {
  const initialState = {
    nameRoom: "",
  };

  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [editRoom, setEditRoom] = useState(initialState);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;

    setEditRoom({ ...editRoom, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) return;

    const value = {
      room,
      name: editRoom.nameRoom,
    };

    roomChatAction.updateRoomChat(value, dispatch, authUser.access_token);
    setEditRoom(initialState);
  };

  return (
    <div className="w-full">
      <form
        action=""
        className="w-full flex justify-between gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="p-2 outline-none w-full"
          name="nameRoom"
          placeholder="Name need edit ... "
          value={editRoom.nameRoom}
          onChange={handleChangeInput}
        />

        <button
          type="submit"
          className="hover:bg-sky-600 hover:text-white border-2 p-2 "
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default TabEditRoom;
