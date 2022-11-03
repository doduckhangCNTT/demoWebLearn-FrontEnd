import React from "react";
import { useSelector } from "react-redux";
import { messageRoomChatSelector } from "../../../redux/selector/selectors";
import { IRoomChatList } from "../../../utils/Typescript";
import OptionUser from "../../option/OptionUser";

interface IProps {
  room: IRoomChatList;
}

const TabAllUser: React.FC<IProps>= ({room}) => {
  const { messageRoom } = useSelector(messageRoomChatSelector);

  return (
    <ul>
      {messageRoom.room?.users?.map((user) => {
        return (
          <li
            key={user._id}
            className="flex justify-between hover:bg-slate-200 transition"
          >
            <div className="flex p-2 mt-2 w-1/3 rounded-md">
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
                <div className="text-sm font-medium text-slate-900">
                  {user.name}
                </div>
                <small className="text-sm text-slate-500 truncate">
                  {messageRoom.room?.admin?.map((ad) => {
                    return (
                      <span key={ad._id} className="">
                        {user._id === ad._id ? "admin" : "user"}
                      </span>
                    );
                  })}
                </small>
              </div>
            </div>

            <div className="p-2">
              <OptionUser user={user} room={room} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TabAllUser;
