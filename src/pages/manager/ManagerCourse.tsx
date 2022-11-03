import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import {
  LIMIT_COURSE_PAGE,
  LIMIT_COURSE_PAGE_SEARCH,
} from "../../constants/coursePage";
import fCheckedAll from "../../features/fCheckedAll";
import fCheckedList from "../../features/fCheckedList";
import useOptionLocationUrl from "../../hooks/useOptionLocationUrl";
import courseAction from "../../redux/action/course/courseAction";
import coursePageAction from "../../redux/action/pagination/coursePageAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { courseNowSlice } from "../../redux/reducers/course/courseNowSlice";
import {
  authSelector,
  coursePageSelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  ICategory,
  ICourses,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";

const ManagerCourse = () => {
  const { page } = useOptionLocationUrl();
  const [checkedCourses, setCheckedCourses] = useState<string[]>([]);
  const [toggleCheckedAll, setToggleCheckedAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();

  // const { courses } = useSelector(courseSelector);
  const { authUser } = useSelector(authSelector);
  const { coursePage } = useSelector(coursePageSelector);

  const dispatch = useDispatch();

  // ===================================== Get courses =================================
  // const handleGetCourses = useCallback(async () => {
  //   if (!authUser.access_token) {
  //     return dispatch(
  //       alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
  //     );
  //   }
  //   if (courses.length <= 0) {
  //     courseAction.getCourses(authUser.access_token, dispatch);
  //   }
  // }, [authUser.access_token, courses.length, dispatch]);

  const handleGetCoursesPage = useCallback(() => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (searchValue) {
      const data = {
        page: page ? Number(page) : 1,
        limit: LIMIT_COURSE_PAGE_SEARCH,
        search: searchValue,
      };
      coursePageAction.getCoursesPageSearch(
        data,
        authUser.access_token,
        dispatch
      );
    } else {
      const data = {
        page: page ? Number(page) : 1,
        limit: LIMIT_COURSE_PAGE,
      };
      coursePageAction.getCoursesPage(data, authUser.access_token, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.access_token, dispatch, page]);

  useEffect(() => {
    handleGetCoursesPage();
  }, [handleGetCoursesPage]);

  // ===================================== TotalPage =================================
  const totalPage = useMemo(() => {
    return Math.ceil(
      coursePage.totalCount /
        (searchValue ? LIMIT_COURSE_PAGE_SEARCH : LIMIT_COURSE_PAGE)
    );
  }, [coursePage.totalCount, searchValue]);

  // ===================================== Selected =================================
  const handleChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    course: ICourses
  ) => {
    fCheckedList(e, course, checkedCourses, setCheckedCourses, "_id");
  };

  const handleSelectAll = () => {
    setToggleCheckedAll(!toggleCheckedAll);
    fCheckedAll(toggleCheckedAll, coursePage.courses, setCheckedCourses, "_id");
  };

  // ===================================== Search =================================
  const handleChangeInputSearch = (e: InputChangedEvent) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value) {
    } else {
      handleGetCoursesPage();
    }
  };

  const handleEditCourse = (courseId: string) => {
    dispatch(courseNowSlice.actions.getCourseIdNow({ courseId: courseId }));
    navigate("/create_course");
  };

  const handleDetailCourse = (courseId: string) => {
    dispatch(courseNowSlice.actions.getCourseIdNow({ courseId: courseId }));
    navigate("/create_course");
  };

  const handleDeleteCourse = (course: ICourses) => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    if (window.confirm("Are you sure you want to delete this course")) {
      courseAction.deleteCourse(course, authUser.access_token, dispatch);
    }
  };

  const handleDeleteCourses = () => {
    if (window.confirm("Are you sure you want to delete")) {
      console.log(checkedCourses);
    }
  };

  const handleSubmitSearch = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: page ? Number(page) : 1,
      limit: LIMIT_COURSE_PAGE_SEARCH,
      search: searchValue,
    };
    coursePageAction.getCoursesPageSearch(
      data,
      authUser.access_token,
      dispatch
    );
    if (searchValue.trim() !== "") {
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex flex-col">
          <h1 className="font-bold text-[30px] my-2">Manager Blogs</h1>
          <div className="mt-2 flex justify-end">
            <div className="flex flex-col gap-2 ">
              <form
                onSubmit={handleSubmitSearch}
                action=""
                className="border-2 rounded-full"
              >
                <input
                  type="text"
                  className="p-2 rounded-full"
                  placeholder="Search course"
                  onChange={handleChangeInputSearch}
                />
              </form>

              <div className=" flex justify-end">
                <div className="inline-block">
                  <button
                    onClick={handleDeleteCourses}
                    className="border-2 p-1 hover:bg-sky-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 hover:bg-sky-500 hover:text-white transition"
                    onClick={handleSelectAll}
                  >
                    Select
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ID Course
                  </th>
                  <th scope="col" className="py-3 px-6">
                    User
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Access Modifier
                  </th>
                  <th scope="col" className="py-3 px-6 flex gap-3">
                    <span className="sr-only">Delete</span>
                    <span className="sr-only">Detail</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursePage &&
                  coursePage.courses?.map((course, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-6 ">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChangeSelected(e, course)}
                            checked={checkedCourses.includes(
                              course._id ? course._id : ""
                            )}
                          />
                        </td>
                        <td className="py-4 px-6 ">{course._id}</td>
                        <td className="py-4 px-6">
                          {(course.user as IUser).account}
                        </td>
                        <td className="py-4 px-6">{course.name}</td>
                        <td className="py-4 px-6">
                          {(course.category as ICategory).name}
                        </td>
                        <td className="py-4 px-6">{course.accessModifier}</td>
                        <td className="py-4 px-6 text-right flex gap-3">
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleDeleteCourse(course)}
                          >
                            Delete
                          </div>
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() =>
                              handleDetailCourse(course._id ? course._id : "")
                            }
                          >
                            Detail
                          </div>
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            onClick={() =>
                              handleEditCourse(course._id ? course._id : "")
                            }
                          >
                            Edit
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <Pagination totalPages={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default ManagerCourse;
