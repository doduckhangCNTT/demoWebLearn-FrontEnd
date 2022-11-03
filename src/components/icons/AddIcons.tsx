import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { reactions } from "./Icons";

interface IProps {
  text: string;
  setText: (value: string) => void;
}

const AddIcons: React.FC<IProps> = ({ text, setText }) => {
  return (
    <div>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
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
          <Menu.Items className="origin-bottom-right absolute z-20 right-0 bottom-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {reactions.map((react, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="text-[20px] px-2">{react.name}</div>
                  <Menu.Item>
                    <div className="flex flex-wrap p-2 gap-1">
                      {react.icons.map((icon) => (
                        <span
                          key={icon}
                          className="cursor-pointer hover:bg-sky-300"
                          onClick={() => setText(text + icon)}
                        >
                          {icon}
                        </span>
                      ))}
                    </div>
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AddIcons;
