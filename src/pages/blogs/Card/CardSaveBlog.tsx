import React from "react";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";
import { IBookMarkBlogUser } from "../../../utils/Typescript";
import OptionSaveBlog from "../../option/OptionSaveBlog";

interface IProps {
  blog: IBookMarkBlogUser;
}

const CardSaveBlog: React.FC<IProps> = ({ blog }) => {
  const WIDTH_BLOG_CONTENT = "2/3";
  const WIDTH_BLOG_IMG = "1/3";

  return (
    <div className="border-2 rounded-lg p-3 my-3 ">
      <div className="flex-col gap-5 mt-2 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        <div className="flex justify-end mb-2">
          <OptionSaveBlog props={blog} />
        </div>

        <div className="flex gap-2">
          {/* Content Blog */}
          <div
            className={`w-${WIDTH_BLOG_CONTENT} flex flex-col justify-between`}
          >
            <div className="">
              <Link to={`/detail_blog/${blog.id_blog}`}>
                <h1 className="font-bold text-[25px]">{blog.title}</h1>
              </Link>
              <div className="">
                <p className="">{blog.description}</p>
              </div>
            </div>

            <div>{new Date(blog.createdAt).toLocaleString()}</div>
          </div>

          {/* Img Blog */}
          <div className={`md:w-${WIDTH_BLOG_IMG} sm:w-full`}>
            <div className="w-full max-h-[200px]">
              <LazyLoadingImg
                url={blog.thumbnail?.url as string}
                alt=""
                className="w-full max-h-[200px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSaveBlog;
