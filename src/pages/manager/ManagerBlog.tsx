import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import {
  LIMIT_BLOG_PAGE,
  LIMIT_BLOG_PAGE_SEARCH,
} from "../../constants/blogPage";
import fCheckedAll from "../../features/fCheckedAll";
import fCheckedList from "../../features/fCheckedList";
import useDebounce from "../../hooks/useDebounce";
import useOptionLocationUrl from "../../hooks/useOptionLocationUrl";
import blogAction from "../../redux/action/blogAction";
import categoryAction from "../../redux/action/categoryAction";
import blogPageAction from "../../redux/action/pagination/blogPageAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { blogPageSlice } from "../../redux/reducers/pagination/blogPageSlice";
import {
  authSelector,
  blogPageSelector,
  blogSelector,
  categorySelector,
} from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import {
  FormSubmit,
  IBlog,
  ICategory,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";

const ManagerBlog = () => {
  const { page } = useOptionLocationUrl();
  const [checkedBlogs, setCheckedBlogs] = useState<string[]>([]);
  const [toggleCheckedAll, setToggleCheckedAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 800);

  const { blogs } = useSelector(blogSelector);
  const { authUser } = useSelector(authSelector);
  const { categories } = useSelector(categorySelector);
  const { blogPage } = useSelector(blogPageSelector);
  const dispatch = useDispatch();

  // =============================== Get Blogs Page =============================
  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  const getBlogsOfPage = () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: page ? Number(page) : 1,
      limit: LIMIT_BLOG_PAGE,
    };
    blogPageAction.getBlogsPage(data, authUser.access_token, dispatch);
  };

  const handleGetsBlogsPage = useCallback(() => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (searchValue.trim() !== "") {
      const data = {
        page: page ? Number(page) : 1,
        limit: LIMIT_BLOG_PAGE_SEARCH,
        search: searchValue,
      };

      blogPageAction.getBlogsPageSearch(data, authUser.access_token, dispatch);
    } else {
      const data = {
        page: page ? Number(page) : 1,
        limit: LIMIT_BLOG_PAGE,
      };

      blogPageAction.getBlogsPage(data, authUser.access_token, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.access_token, dispatch, page]);

  const getAllBlogsPage = async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    const res = await getApi(
      `blogsPage?page=${page}&limit=${LIMIT_BLOG_PAGE}`,
      authUser.access_token
    );
    const { blogs } = res.data;
    return blogs as IBlog[];
  };

  useEffect(() => {
    handleGetsBlogsPage();
  }, [handleGetsBlogsPage]);

  useEffect(() => {
    if (blogs.length <= 0) {
      blogAction.getBlogs(dispatch);
    }
  }, [blogs.length, dispatch]);

  // =============================== Get Blogs Page =============================
  const totalPage = useMemo(() => {
    return Math.ceil(
      blogPage.totalCount /
        (debouncedSearch ? LIMIT_BLOG_PAGE_SEARCH : LIMIT_BLOG_PAGE)
    );
  }, [blogPage.totalCount, debouncedSearch]);

  // =============================== Selected Checked =============================
  const handleChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    blog: IBlog
  ) => {
    fCheckedList(e, blog, checkedBlogs, setCheckedBlogs, "_id");
  };

  const handleSelectedAll = () => {
    setToggleCheckedAll(!toggleCheckedAll);
    fCheckedAll(toggleCheckedAll, blogPage.blogs, setCheckedBlogs, "_id");
  };

  const handleDeleteListBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog")) {
      console.log("Checked Blog: ", checkedBlogs);
    }
  };

  // =============================== Search =============================
  const handleChangeInputSearch = (e: InputChangedEvent) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value) {
    } else {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }
      const data = {
        page: 1,
        limit: LIMIT_BLOG_PAGE,
      };

      blogPageAction.getBlogsPage(data, authUser.access_token, dispatch);
    }
  };

  const handleSubmitSearchBlog = (e: FormSubmit) => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    e.preventDefault();

    const data = {
      page: page ? Number(page) : 1,
      limit: LIMIT_BLOG_PAGE_SEARCH,
      search: searchValue,
    };
    blogPageAction.getBlogsPageSearch(data, authUser.access_token, dispatch);
  };

  // ========================================= Filter =========================================================
  const handleChangeFilterSelect = async (e: InputChangedEvent) => {
    const { value } = e.target;
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    if (value) {
      // Lam theo cach nay thi khong duoc, no ko the lay gia tri tren backend de cap nhat tren store khi ma thay doi gia tri filter
      // const data = {
      //   page: page ? Number(page) : 1,
      //   limit: LIMIT_BLOG_PAGE,
      // };
      // await blogPageAction.getBlogsPage(data, authUser.access_token, dispatch);
      // const dataBlogs = blogPage.blogs.filter(
      //   (b) => (b.category as ICategory).name === value
      // );

      const allBlogsPage = await getAllBlogsPage();

      const dataBlogs = (allBlogsPage as IBlog[]).filter(
        (b) => (b.category as ICategory).name === value
      );
      dispatch(
        blogPageSlice.actions.updateBlogsPageSearch({ blogs: dataBlogs })
      );
    } else {
      getBlogsOfPage();
    }
  };

  const handleDeleteBlog = (blog: IBlog) => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (blog._id === "") {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "You need provide a blog ID" })
      );
    } else {
      blogAction.deleteBlog(blog, authUser.access_token, dispatch, "delete");
    }
  };

  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-[30px] my-2">Manager Blogs</h1>

        <div className="flex justify-between p-2 border-2">
          {/* Sort Blog */}
          <div className="">
            <h1 className="font-bold">Filter Category: </h1>
            <select name="sort" id="" onChange={handleChangeFilterSelect}>
              <option value="">Choose a Category</option>
              {categories.map((c) => {
                return (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmitSearchBlog} className="">
              <input
                type="text"
                className="border-2 rounded-full p-2"
                placeholder="Search Blog"
                onChange={handleChangeInputSearch}
              />
            </form>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteListBlog}
                className="border-2 p-1 inline-block hover:bg-sky-500 hover:text-white transition"
              >
                Delete
              </button>
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
                  className="py-3 px-6 hover:bg-sky-500 hover:text-white cursor-pointer"
                  onClick={handleSelectedAll}
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
                <th scope="col" className="py-3 px-6 flex gap-3">
                  <span className="sr-only">Delete</span>
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {blogPage &&
                blogPage.blogs?.map((blog, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6 ">
                        <input
                          type="checkbox"
                          onChange={(e) => handleChangeSelected(e, blog)}
                          checked={checkedBlogs.includes(
                            blog._id ? blog._id : ""
                          )}
                        />
                      </td>
                      <td className="py-4 px-6 ">{blog._id}</td>
                      <td className="py-4 px-6">
                        {(blog.user as IUser).account}
                      </td>
                      <td className="py-4 px-6">{blog.title}</td>
                      <td className="py-4 px-6">
                        {(blog.category as ICategory).name}
                      </td>
                      <td className="py-4 px-6 text-right flex gap-3">
                        <div
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDeleteBlog(blog)}
                        >
                          Delete
                        </div>
                        <Link
                          to={`/detail_blog/${blog._id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Detail
                        </Link>
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

export default ManagerBlog;
