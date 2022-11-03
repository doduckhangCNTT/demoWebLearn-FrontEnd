import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../components/global/NotFound";
import saveBlogAction from "../../redux/action/saveBlogAction";
import {
  authSelector,
  saveBlogUserSelector,
} from "../../redux/selector/selectors";
import { IBookMarkBlogUser } from "../../utils/Typescript";
import CardSaveBlog from "./Card/CardSaveBlog";

const SaveBlog = () => {
  const { authUser } = useSelector(authSelector);
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!authUser.access_token || !authUser.user) return;
  //   saveBlogAction.getBlogs(authUser, dispatch);
  // }, [authUser, authUser.user, dispatch]);

  // Give Blog user saved
  useEffect(() => {
    if (!(saveBlog as any).blogs) {
      saveBlogAction.getBlogs(authUser, dispatch);
    }
  }, [authUser, dispatch, saveBlog]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="m-5">
      <h1 className="text-[30px]">
        {" "}
        Quantity Blog Saved {(saveBlog as any).blogs?.length}
      </h1>
      <div className="flex gap-2">
        <div className="w-2/3">
          {(saveBlog as any).blogs?.map(
            (item: IBookMarkBlogUser, index: React.Key | null | undefined) => {
              return (
                <div key={index}>
                  <CardSaveBlog blog={item} />
                </div>
              );
            }
          )}
        </div>

        <div className="w-1/3">
          <h1 className="text-[20px] font-bold text-center">Introduce Blog</h1>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SaveBlog;
