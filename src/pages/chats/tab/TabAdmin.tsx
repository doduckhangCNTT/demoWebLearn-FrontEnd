import React from "react";
import { useSelector } from "react-redux";
import { messageRoomChatSelector } from "../../../redux/selector/selectors";
import { IRoomChatList } from "../../../utils/Typescript";
import OptionUserAdmin from "../../option/OptionUserAdmin";

interface IProps {
  room: IRoomChatList;
}

const TabAdmin: React.FC<IProps> = ({ room }) => {
  const { messageRoom } = useSelector(messageRoomChatSelector);

  return (
    <ul>
      {messageRoom.room?.admin?.map((ad) => {
        return (
          <li
            key={ad._id}
            className=" flex justify-between hover:bg-slate-200 transition p-2 mt-2 rounded-md"
          >
            <div className="flex p-2 mt-2 w-1/3 rounded-md">
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={`${ad.avatar}`}
                  alt="man"
                />
                <span
                  className={`absolute bottom-0 right-0  w-[10px] h-[10px] bg-green-500 rounded-full `}
                ></span>
              </div>
              <div className="ml-3 overflow-hidden w-full flex flex-col">
                <div className="text-sm font-medium text-slate-900">
                  {ad.name}
                </div>
                <small className="text-sm text-slate-500 truncate">admin</small>
              </div>
            </div>

            <div className="p-2">
              <OptionUserAdmin admin={ad} room={room} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TabAdmin;
