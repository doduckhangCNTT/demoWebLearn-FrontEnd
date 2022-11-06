import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  saveBlogUserSelector,
  socketSelector,
} from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import { IBlog, IBookMarkBlogUser, IUser } from "../../utils/Typescript";
import Comments from "../comments/Comments";
import CardBlog from "./Card/CardBlog";
import InfoCreator from "./InfoCreator";

const DetailBlog = () => {
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const { socket } = useSelector(socketSelector);

  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [blog, setBlog] = useState<IBlog>();
  const [blogsCategory, setBlogsCategory] = useState<IBlog[]>([]);
  const [bookMarkBlog, setBookMarkBlog] = useState<IBookMarkBlogUser>();

  useEffect(() => {
    const getBlog = async () => {
      const res = await getApi(`blog/${id}`);
      setBlog(res.data.blog);
    };
    getBlog();
  }, [id]);

  useEffect(() => {
    const getBlogsCategory = async () => {
      const id = blog?.category;
      if (!id) return;
      const res = await getApi(`blog/category/${id}`);
      setBlogsCategory(res.data.blogs);
    };

    getBlogsCategory();
  }, [blog?.category]);

  useEffect(() => {
    const res = (saveBlog as any).blogs?.find(
      (item: { id_blog: string | undefined }) => item.id_blog === blog?._id
    );
    setBookMarkBlog(res);
  }, [blog?._id, saveBlog]);

  // --------------------- Socket - JoinRoom --------------------
  useEffect(() => {
    if (!id || !socket) return;
    socket && (socket.value as Socket).emit("joinRoom", id);
    return () => {
      (socket.value as Socket).emit("outRoom", id);
    };
  }, [socket, id]);

  return (
    <div className="h-full relative">
      <div className="lg:flex-row md:flex-col sm:flex-col flex-col gap-5 lg:w-4/5 md:w-full sm:w-ful w-full p-2 mx-auto">
        <div className="fixed p-3 lg:top-1/5 md:top-[40px] sm:top-[40px] top-[40px]">
          <div className=" shadow-lg flex items-center gap-2 bg-white rounded lg:w-full md:w-full sm:w-full p-3">
            <div className="border-r-2 h-[50px] bg-slate-300 flex flex-col p-1 items-center">
              <i>👤</i>
              <span className="font-bold">
                {(blog?.user as IUser)?.name.toUpperCase()}
              </span>
            </div>
            <div className="lg:flex-row gap-5 py-3 md:flex-col sm:flex-col flex-col">
              <div className="text-red-500">Heart ♥️</div>
              <div
                className="cursor-pointer text-sky-500 hover:bg-slate-200 p-1 rounded-full"
                onClick={() => setToggle(!toggle)}
              >
                Comment
              </div>
            </div>
          </div>
        </div>

        <div className="w-[20%] top-1/3"></div>
        <div className="lg:w-[80%] md:w-[100%] sm:w-[100%] w-[100%]">
          <div className="text-center">
            <h1 className="font-bold text-[30px] lg:mt-[20px] md:mt-[100px] sm:mt-[100px] mt-[100px]">
              {blog?.title}
            </h1>
          </div>

          <div className="">
            <div className="my-5">
              {bookMarkBlog ? (
                <InfoCreator props={blog} bookmark={bookMarkBlog} />
              ) : (
                <InfoCreator props={blog} />
              )}
            </div>
            {/* <div className="">{blog?.content}</div> */}
            <div
              // className="hidden"
              dangerouslySetInnerHTML={{
                __html: blog?.content ? blog.content : "",
              }}
            />
          </div>
        </div>
      </div>

      <div className="  m-5 ">
        <h1 className="text-[20px] font-bold"> Relative Blogs </h1>
        <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {blogsCategory.map((item, index) => {
            return (
              <div key={index} className="">
                <CardBlog blog={item} />
              </div>
            );
          })}
        </div>
      </div>

      {toggle ? (
        <div className="flex absolute transition top-0 right-0 bottom-0 h-full w-full">
          <div
            onClick={() => setToggle(!toggle)}
            className="opacity-50 lg:w-[55%] cursor-pointer bg-slate-300 "
          ></div>
          <div className="lg:w-[45%] md:w-full sm:w-full w-full bg-white shadow-md h-full overflow-auto touch-pan-y">
            <div className="relative">
              <button
                onClick={() => setToggle(!toggle)}
                className="top-0 right-0 absolute m-5 hover:bg-sky-600 hover:text-white p-2"
              >
                Close
              </button>
            </div>

            <div className="m-10">
              <Comments blog={blog} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailBlog;
