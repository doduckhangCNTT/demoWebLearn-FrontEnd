import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector/selectors";
import { IQuestion, IQuickTest } from "../../utils/Typescript";
import quickTestAction from "../../redux/action/quickTestAction";
import { alertSlice } from "../../redux/reducers/alertSlice";

interface IProps {
  quickTest_OfQuestion: IQuickTest;
  question: IQuestion;
}

const OptionQuestion: React.FC<IProps> = ({
  quickTest_OfQuestion,
  question,
}) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleDeleteQuestion = (question: IQuestion) => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    if (window.confirm("Do you have want delete this question ?")) {
      quickTestAction.deleteQuestion(question, authUser.access_token, dispatch);
    }
  };

  return (
    <div>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
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
            <div>
              {/* Update Question */}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/quick_test/question/${question._id}`}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    // onClick={() => handleUpdateQuestion(question)}
                  >
                    Edit
                  </Link>
                )}
              </Menu.Item>

              {/* Delete blog */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleDeleteQuestion(question)}
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
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default OptionQuestion;
