import { Tab } from "@headlessui/react";

import TabAllUser from "./TabAllUser";
import TabAdmin from "./TabAdmin";
import TabAddUser from "./TabAddUser";
import { IRoomChatList } from "../../../utils/Typescript";
import TabEditRoom from "./TabEditRoom";

interface IProps {
  room?: IRoomChatList;
}

const TabOption: React.FC<IProps> = ({ room }) => {
  const tabs = [
    { name: "All User" },
    { name: "Admins" },
    { name: "Add User" },
    { name: "Edit Room Chat" },
  ];

  return (
    <div className="w-2/3 px-2 py-16 sm:px-0 m-auto">
      <Tab.Group vertical>
        <Tab.List className="w-full flex justify-around border-2 ">
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                className="hover:bg-sky-600 hover:text-white text-center rounded-full p-2"
              >
                {tab.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="border-2 mt-1 p-1">
          {/* Tab All User  */}
          <Tab.Panel>{room && <TabAllUser room={room} />}</Tab.Panel>

          {/* Tab Admin */}
          <Tab.Panel>{room && <TabAdmin room={room} />}</Tab.Panel>

          {/* Tab Add User */}
          <Tab.Panel>
            <TabAddUser room={room} />
          </Tab.Panel>

          {/* Tab Edit Room */}
          <Tab.Panel>{room && <TabEditRoom room={room} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabOption;
