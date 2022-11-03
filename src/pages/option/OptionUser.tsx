import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { IRoomChatList, IUser } from "../../utils/Typescript";
import roomChatAction from "../../redux/action/roomChat/roomChatAction";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector/selectors";

interface IProps {
  user: IUser;
  room: IRoomChatList;
}

const OptionUser: React.FC<IProps> = ({ user, room }) => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!authUser.access_token) return;
    console.log("User: ", user);
    const value = {
      user: user,
      room: room,
    };
    roomChatAction.deleteUserRoomChat(value, dispatch, authUser.access_token);
  };

  const handleAddAdmin = () => {
    if (!authUser.access_token) return;
    const value = {
      user,
      room,
    };
    roomChatAction.addUserAdminRoomChat(value, dispatch, authUser.access_token);
  };

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-white">
          . . .
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-bottom-right z-20 right-0 top-5 absolute mt-2 p-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {room.admin.find((ad) => ad._id === authUser.user?._id) ? (
            <div>
              <Menu.Item>
                <button onClick={handleDelete}>Delete</button>
              </Menu.Item>
            </div>
          ) : (
            <div></div>
          )}

          <div>
            <Menu.Item>
              <button onClick={() => handleAddAdmin()}>Add Admin</button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionUser;
