import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector/selectors";
import { IChapter } from "../../../utils/Typescript";
import OptionLesson from "../../option/OptionLesson";

interface IProps {
  chapter: IChapter;
}

const ComboboxLessons: React.FC<IProps> = ({ chapter }) => {
  const [toggle, setToggle] = useState(false);
  const { authUser } = useSelector(authSelector);

  return (
    <div className="">
      {/* Name chapter */}
      <button
        className="
                w-full flex justify-between 
                text-sm px-4 py-2.5 border-2 
                text-center items-center
                hover:bg-slate-200 
                focus:outline-none font-medium 
                "
        onClick={() => setToggle(!toggle)}
      >
        <h1 className="">{chapter.name}</h1>
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        className={`${
          toggle ? "" : "hidden"
        } z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        {chapter.lessons.map((les, i) => {
          return (
            <ul
              key={i}
              className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div className="flex justify-between">
                  <div className="hover:bg-slate-100 flex items-center w-full">
                    <input
                      id={les._id}
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={les._id}
                      className="ml-2 w-full py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {les.name}
                    </label>
                  </div>

                  {/* Option */}
                  <div className="">
                    {authUser.user?.role === "admin" ? (
                      <OptionLesson chapter={chapter} lesson={les} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default ComboboxLessons;
