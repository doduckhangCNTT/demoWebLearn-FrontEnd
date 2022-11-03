import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import lessonAction from "../../redux/action/course/lessonAction";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, courseSelector } from "../../redux/selector/selectors";
import { IChapter, ILesson } from "../../utils/Typescript";
import { alertSlice } from "../../redux/reducers/alertSlice";
import courseAction from "../../redux/action/course/courseAction";
import { chooseLessonSlice } from "../../redux/reducers/course/chooseLessonSlice";
import { courseNowSlice } from "../../redux/reducers/course/courseNowSlice";

interface IProps {
  chapter: IChapter;
  lesson: ILesson;
}

const OptionLesson: React.FC<IProps> = ({ chapter, lesson }) => {
  const { authUser } = useSelector(authSelector);
  const { courseNow } = useSelector(courseSelector);
  const dispatch = useDispatch();

  const handleUpdateLesson = () => {
    // console.log("Lesson: ", lesson);
    dispatch(chooseLessonSlice.actions.getLesson(lesson));
    dispatch(
      courseNowSlice.actions.getChapterIdNow({
        chapterId: chapter._id ? chapter._id : "",
      })
    );
  };

  const handleDeleteLesson = () => {
    if (window.confirm("You have want to delete this lesson ?")) {
      if (!authUser.access_token) {
        return dispatch(
          dispatch(
            alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
          )
        );
      }

      lessonAction.deleteLesson(
        { courseId: courseNow.courseId, chapter, lesson },
        authUser.access_token,
        dispatch
      );

      courseAction.getCourses(authUser.access_token, dispatch);
    }
  };

  return (
    <div>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white hover:bg-slate-100 transition">
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
                  <div
                    className="p-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleUpdateLesson()}
                  >
                    Edit
                  </div>
                )}
              </Menu.Item>

              {/* Delete blog */}
              <Menu.Item>
                {({ active }) => (
                  <div
                    className="p-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleDeleteLesson()}
                  >
                    Delete
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default OptionLesson;
