import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";

const Infomation = () => {
  return (
    <div>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className=" p-1 rounded-full text-gray-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <BellIcon className="h-6 w-6" aria-hidden="true" />
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
          <Menu.Items className="origin-top-right absolute z-100 right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <h1 className="flex justify-center">
              There are no notification here
            </h1>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Infomation;
