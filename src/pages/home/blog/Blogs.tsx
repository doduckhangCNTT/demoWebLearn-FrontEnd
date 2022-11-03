import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blogAction from "../../../redux/action/blogAction";
import { blogSelector } from "../../../redux/selector/selectors";
import FrameList from "../common/FrameList";

const BlogHome = () => {
  const { blogs } = useSelector(blogSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    blogAction.getListBlogs(dispatch);
  }, [dispatch]);

  return (
    <FrameList titleList="Blog">
      <>
        {blogs.slice(0, 8).map((blog, index) => {
          return (
            <Fragment key={index}>
              <div className="border-2 rounded-lg hover:shadow-md gap-3">
                <Link to={`/detail_blog/${blog._id}`}>
                  <div className="">
                    <img
                      src={blog.thumbnail.url as string}
                      alt=""
                      className="rounded-lg h-[250px] w-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h1 className="font-bold text-[20px] hover:text-sky-500">
                      {blog.title}
                    </h1>
                  </div>
                </Link>
              </div>
            </Fragment>
          );
        })}
      </>
    </FrameList>
  );
};

export default BlogHome;
