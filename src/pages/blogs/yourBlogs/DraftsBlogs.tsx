import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../components/global/NotFound";
import NotValue from "../../../components/global/NotValue";
import blogAction from "../../../redux/action/blogAction";
import {
  authSelector,
  draftBlogSelector,
} from "../../../redux/selector/selectors";
import { IBlog, IUser } from "../../../utils/Typescript";
import CardDraftBlog from "../Card/CardDraftBlog";

const DraftsBlogs = () => {
  const { authUser } = useSelector(authSelector);
  const { draftBlogs } = useSelector(draftBlogSelector);

  const [blog, setBlog] = useState<IBlog>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token) return;
    blogAction.getDraftBlogs(authUser.access_token, dispatch);
  }, [dispatch, authUser.access_token]);

  useEffect(() => {
    const blog = draftBlogs.find(
      (item) => (item.user as IUser)._id === authUser.user?._id
    );
    setBlog(blog);
  }, [authUser.user?._id, draftBlogs]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="flex col-span-2 gap-2">
      {blog ? (
        draftBlogs.map((item, index) => {
          return (
            <div className="" key={index}>
              <CardDraftBlog blog={item} />
            </div>
          );
        })
      ) : (
        <NotValue />
      )}
    </div>
  );
};

export default DraftsBlogs;
