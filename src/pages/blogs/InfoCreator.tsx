import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import saveBlogAction from "../../redux/action/saveBlogAction";
import { authSelector } from "../../redux/selector/selectors";

import { IAuth } from "../../redux/types/authType";
import { IBlog, IBookMarkBlogUser, IUser } from "../../utils/Typescript";
import Option from "../option/Option";

interface IProps {
  props?: IBlog | IAuth;
  bookmark?: IBlog;
}

const InfoCreator: React.FC<IProps> = React.memo(({ props, bookmark }) => {
  const dispatch = useDispatch();

  const icons = {
    iconBookmark: (
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
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    ),
    iconBookmarkSolid: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
    ),
    iconOption: (
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
    ),
  };

  const [save, setSave] = useState(false);
  const { authUser } = useSelector(authSelector);

  const handleSaveBookmark = () => {
    const solution = async () => {
      if (!authUser.access_token || !authUser.user) return;

      // Save blog to "saveBlogUser" store
      // saveBlogUserAction.getBlogUser(
      //   authUser.user?._id,
      //   authUser.access_token,
      //   dispatch
      // );

      // Save blog to "saveBlog" store
      await saveBlogAction.createBlog(
        props as IBlog,
        authUser.access_token,
        dispatch
      );
      // saveBlogAction.getBlogs(authUser, dispatch);
    };

    solution();
  };

  const handleDeleteBookmark = () => {
    const solution = async () => {
      if (!authUser.access_token) return;

      // Delete blog to "saveBlog" store
      await saveBlogAction.deleteBlog(
        bookmark as IBookMarkBlogUser,
        authUser.access_token,
        dispatch
      );

      saveBlogAction.getBlogs(authUser, dispatch);
    };

    solution();
  };

  return (
    <div className="flex items-center justify-between mx-3 hover:bg-slate-100 transition">
      {" "}
      <div className="max-w-sm rounded-xl flex items-center space-x-4 ">
        <div className="shrink-0">
          <LazyLoadingImg
            url={`${(props?.user as IUser)?.avatar}`}
            alt="ChitChat Logo"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            {(props?.user as IUser)?.name}
          </div>
          <p className="text-slate-500">{(props?.user as IUser)?.role}!</p>
        </div>
      </div>
      {/* BookMark & Option Icon */}
      <div className="">
        <div className="flex gap-3">
          <div className="cursor-pointer" onClick={() => setSave(!save)}>
            {bookmark ? (
              <div className="" onClick={handleDeleteBookmark}>
                {icons.iconBookmarkSolid}
              </div>
            ) : (
              <div className="" onClick={handleSaveBookmark}>
                {icons.iconBookmark}
              </div>
            )}
          </div>
          <div>{<Option props={props ? props : {}} />}</div>
        </div>
      </div>
    </div>
  );
});

export default InfoCreator;
