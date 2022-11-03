import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { IBlog, IUser } from "../../utils/Typescript";
import { IAuth } from "../../redux/types/authType";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector/selectors";
import blogAction from "../../redux/action/blogAction";

interface IProps {
  props: IBlog | IAuth;
}

const OptionDraft: React.FC<IProps> = ({ props }) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleDeleteBlog = () => {
    if (!authUser.access_token) return;

    if (window.confirm("Are you sure you want to delete this"))
      blogAction.deleteBlog(
        props as IBlog,
        authUser.access_token,
        dispatch,
        "draft"
      );
  };

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
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {(props?.user as IUser)?._id === authUser.user?._id ? (
              <div>
                {/* Update blog */}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/update_draftBlog/${(props as IBlog)._id as string}`}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Edit
                    </Link>
                  )}
                </Menu.Item>

                {/* Delete blog */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDeleteBlog}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      )}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            ) : (
              ""
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default OptionDraft;
