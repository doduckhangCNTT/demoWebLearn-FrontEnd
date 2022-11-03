import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { IMessage, IMessageRoom, IUser } from "../../utils/Typescript";
import messageAction from "../../redux/action/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector/selectors";
import messageRoomChatAction from "../../redux/action/roomChat/messageRoomChatAction";

interface IProps {
  msg: IMessage | IMessageRoom;
}

const OptionMessage: React.FC<IProps> = ({ msg }) => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!authUser.access_token) return;

    // Check roomChat and Message Chat
    if (((msg as IMessageRoom).roomChat?.users as IUser[])?.length > 0) {
      // console.log("Room Chat");
      messageRoomChatAction.deleteMessage(msg, authUser.access_token, dispatch);
    } else {
      // console.log("Message Chat");

      messageAction.deleteMessage(
        msg as IMessage,
        authUser.access_token,
        dispatch
      );
    }
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
          <div>
            <Menu.Item>
              <button onClick={handleDelete}>Delete</button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionMessage;
