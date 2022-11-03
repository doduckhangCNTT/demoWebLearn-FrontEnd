import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotValue from "../../../components/global/NotValue";
import blogCategoryAction from "../../../redux/action/blogCategoryAction";
import {
  blogsCategorySelector,
  saveBlogUserSelector,
} from "../../../redux/selector/selectors";
import { IGetBlogsCategory } from "../../../utils/Typescript";
import CardBlog from "../Card/CardBlog";

const BlogOfCategory = () => {
  const { option } = useParams();
  const [blogsOfCategory, setBlogsOfCategory] = useState<IGetBlogsCategory>();

  const { blogsCategory } = useSelector(blogsCategorySelector);
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const blogCategory = blogsCategory.find((item) => item._id === option);
    setBlogsOfCategory(blogCategory);
  }, [blogsCategory, option]);

  useEffect(() => {
    blogCategoryAction.getBlogsCategory(dispatch);
  }, [dispatch]);

  return (
    <div className="">
      <div className="font-bold text-[20px]">
        Quality Blog Categories : {blogsOfCategory?.count}
      </div>
      {/* List Blogs */}
      <div className={`w-full`}>
        {blogsOfCategory ? (
          blogsOfCategory.blogs.map((blog, index) => {
            if (!blog._id) return [];
            const res = (saveBlog as any)?.blogs?.find(
              (item: { id_blog: string | undefined }) =>
                item.id_blog === blog._id
            );

            return (
              <div className="" key={index}>
                {res ? (
                  <CardBlog blog={blog} bookmark={res} />
                ) : (
                  <CardBlog blog={blog} />
                )}
              </div>
            );
          })
        ) : (
          <NotValue />
        )}
      </div>
    </div>
  );
};

export default BlogOfCategory;
