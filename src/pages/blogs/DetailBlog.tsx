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
      <div className="flex gap-5 w-4/5 mx-auto">
        <div className="w-[20%] fixed p-3 top-1/5">
          <div className=" shadow-lg rounded w-2/3 p-3">
            <div className="">{(blog?.user as IUser)?.name}</div>
            <div className="flex gap-5 border-t-2 mt-5 py-3">
              <div className="">Heart</div>
              <div
                className="cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                Comment
              </div>
            </div>
          </div>
        </div>

        <div className="w-[20%] top-1/3"></div>
        <div className="w-[80%]">
          <div className="text-center">
            <h1 className="font-bold text-[30px] mt-[20px]">{blog?.title}</h1>
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
        <div className="flex gap-2 col-span-3">
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
            className="opacity-50 w-[55%] cursor-pointer bg-slate-300 "
          ></div>
          <div className=" w-[45%] bg-white shadow-md h-full overflow-auto touch-pan-y">
            <div className="relative">
              <button
                onClick={() => setToggle(!toggle)}
                className="top-0 right-0 absolute m-5 hover:text-sky-600"
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
