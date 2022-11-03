import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../components/global/NotFound";
import blogUserAction from "../../../redux/action/blogUserAction";
import {
  blogsUserSelector,
  authSelector,
} from "../../../redux/selector/selectors";
import { IBlog, IGetBlogsUser } from "../../../utils/Typescript";
import CardBlog from "../Card/CardBlog";

const PublishedBlogs = () => {
  const { blogsUser } = useSelector(blogsUserSelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const solution = async () => {
      if (!(blogsUser as any).blogs) {
        if (!authUser.user || !authUser.access_token) return;
        await blogUserAction.getBlogUser(
          authUser.user?._id,
          authUser.access_token,
          dispatch
        );
      }
    };
    solution();
  }, [authUser.access_token, authUser.user, blogsUser, dispatch]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="flex flex-col gap-5">
      <div className="text-[20px] font-bold">
        Quality Blogs: {(blogsUser as any).count}
      </div>

      <div className={`grid xl:grid-cols-2 gap-2`}>
        {/* List Blogs */}
        {(blogsUser as any).blogs?.map(
          (
            blog: IBlog | IGetBlogsUser,
            index: React.Key | null | undefined
          ) => {
            return (
              <div key={index} className={`w-full h-full`}>
                <CardBlog blog={blog} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PublishedBlogs;
