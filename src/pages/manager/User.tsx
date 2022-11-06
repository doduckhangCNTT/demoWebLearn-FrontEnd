import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { LIMIT_TEST_PAGE_USER } from "../../constants/userPage";
import fCheckedAll from "../../features/fCheckedAll";
import fCheckedList from "../../features/fCheckedList";
import useDebounce from "../../hooks/useDebounce";
import useOptionLocationUrl from "../../hooks/useOptionLocationUrl";
import blogAction from "../../redux/action/blogAction";
import userPageAction from "../../redux/action/pagination/userPageAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import {
  authSelector,
  blogSelector,
  userSelector,
} from "../../redux/selector/selectors";
import { deleteApi, getApi } from "../../utils/FetchData";
import { FormSubmit, InputChangedEvent, IUser } from "../../utils/Typescript";

const User = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { page } = useOptionLocationUrl();
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const [toggleCheckedAllUser, setToggleCheckedAllUser] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 800);

  const { authUser } = useSelector(authSelector);
  const { blogs } = useSelector(blogSelector);
  const { userPage } = useSelector(userSelector);
  const dispatch = useDispatch();
  console.log(users);

  // ================================= Get Users ======================================
  const handleGetUsers = useCallback(async () => {
    const res = await getApi("users", authUser.access_token);
    setUsers(res.data.users);
  }, [authUser.access_token]);

  const handleGetUsersPage = useCallback(async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: page ? Number(page) : 1,
      limit: LIMIT_TEST_PAGE_USER,
    };

    userPageAction.getUsersPage(data, authUser.access_token, dispatch);
  }, [authUser.access_token, dispatch, page]);

  useEffect(() => {
    handleGetUsersPage();
  }, [handleGetUsersPage]);

  // ================================= Total Page ======================================
  const totalPage = useMemo(() => {
    return Math.ceil(userPage.totalCount / LIMIT_TEST_PAGE_USER);
  }, [userPage.totalCount]);

  // ================================= Select CheckBox ======================================
  const handleChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: IUser
  ) => {
    fCheckedList(e, user, checkedUser, setCheckedUser, "_id");
  };

  const handleSelectedAll = () => {
    setToggleCheckedAllUser(!toggleCheckedAllUser);
    fCheckedAll(toggleCheckedAllUser, userPage.users, setCheckedUser, "_id");
  };

  const handleDeleteAllUserSelected = () => {
    if (window.confirm("Are you sure you want to delete")) {
      console.log("List Checked: ", checkedUser);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      await deleteApi(`user/${userId}`, authUser.access_token);

      // Delete all blogs of user
      blogAction.getListBlogs(dispatch);
      blogs.forEach((blog) => {
        blogAction.deleteBlog(
          blog,
          authUser.access_token ? authUser.access_token : "",
          dispatch
        );
      });

      handleGetUsers();
    }
  };

  // ================================= Search ======================================
  useEffect(() => {
    if (debouncedSearch) {
    } else {
      const data = {
        page: 1,
        limit: LIMIT_TEST_PAGE_USER,
      };

      userPageAction.getUsersPage(
        data,
        authUser.access_token ? authUser.access_token : "",
        dispatch
      );
    }
  }, [authUser.access_token, debouncedSearch, dispatch]);

  const handleChangeSearchInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = (e: FormSubmit) => {
    e.preventDefault();

    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (!searchValue) {
      return dispatch(
        alertSlice.actions.alertAdd({
          error: "You must provide a search value",
        })
      );
    }

    const data = {
      page: 1,
      limit: 5,
      search: searchValue,
    };
    userPageAction.getUsersSearchPage(data, authUser.access_token, dispatch);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="font-bold text-[30px] my-2">Manager Users</h1>
        <div className="my-2 flex flex-col">
          <form action="" onSubmit={handleSearchSubmit} className="">
            <input
              type="text"
              className="border-2 rounded-lg p-2"
              placeholder="Search User"
              onChange={handleChangeSearchInput}
            />
          </form>
          <div className="flex justify-end">
            <button
              className="border-2 p-1 rounded-lg my-2 hover:bg-sky-500 hover:text-white transition inline-block"
              onClick={handleDeleteAllUserSelected}
            >
              Delete
            </button>
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
                  className="py-3 px-6 hover:bg-sky-500 hover:text-white cursor-pointer"
                  onClick={handleSelectedAll}
                >
                  Select
                </th>
                <th scope="col" className="py-3 px-6">
                  ID User
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Account
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  Type login
                </th>
                <th scope="col" className="py-3 px-6 flex gap-3">
                  <span className="sr-only">Delete</span>
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userPage &&
                userPage.users?.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6 ">
                        <input
                          type="checkbox"
                          onChange={(e) => handleChangeSelected(e, user)}
                          checked={checkedUser.includes(
                            user._id ? user._id : ""
                          )}
                        />
                      </td>
                      <td className="py-4 px-6 ">{user._id}</td>
                      <td className="py-4 px-6">{user.name}</td>
                      <td className="py-4 px-6">{user.account}</td>
                      <td className="py-4 px-6">{user.role}</td>
                      <td className="py-4 px-6">{user.type}</td>

                      <td className="py-4 px-6">
                        {user.role === "admin" ? (
                          ""
                        ) : (
                          <div className="flex gap-3">
                            <div
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </div>
                            <Link
                              to="#"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Detail
                            </Link>
                          </div>
                        )}
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
  );
};

export default User;
