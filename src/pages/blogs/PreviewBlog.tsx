import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import { authSelector } from "../../redux/selector/selectors";
import { IBlog } from "../../utils/Typescript";
import InfoCreator from "./InfoCreator";

interface IProps {
  blog: IBlog;
}

const PreviewBlog: React.FC<IProps> = ({ blog }) => {
  const WIDTH_BLOG_CONTENT = "2/3";
  const WIDTH_BLOG_IMG = "1/3";

  const { authUser } = useSelector(authSelector);

  return (
    <div className="border-2 rounded-lg p-3 my-3 ">
      <div>
        {/* Info creator */}
        <InfoCreator props={authUser} />
      </div>

      <div className="flex gap-5 mt-2 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        {/* Content Blog */}
        <div
          className={`w-${WIDTH_BLOG_CONTENT} flex flex-col justify-between`}
        >
          <div className="">
            <Link to="/detail_blog">
              <h1 className="font-bold text-[25px]">{blog.title}</h1>
            </Link>
            <div className="">
              <p className="">
                {blog.description.slice(0, 100)}{" "}
                {blog.description.length > 100 ? "..." : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Img Blog */}
        <div className={`md:w-${WIDTH_BLOG_IMG} sm:w-full`}>
          {typeof blog.thumbnail.url === "string" ? (
            <img
              src={blog.thumbnail.url}
              alt=""
              className="w-full max-h-[200px] object-cover rounded-lg"
            />
          ) : (
            <LazyLoadingImg
              url={URL.createObjectURL(blog.thumbnail.url as Blob)}
              alt=""
              className="w-full max-h-[200px] object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewBlog;
