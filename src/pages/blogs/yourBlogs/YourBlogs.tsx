import { Link, Outlet } from "react-router-dom";

const YourBlogs = () => {
  return (
    <div className="m-3">
      <div className="">
        <h1 className="font-bold text-[30px]">Your Blog</h1>
      </div>

      <div className="mt-10 flex gap-5 border-b-2 p-2 text-[20px] ">
        <div className="hover:text-sky-600 transition">
          <Link to="drafts">Drafts Blogs</Link>
        </div>
        <div className="hover:text-sky-600 transition">
          <Link to="published">Published Blogs</Link>
        </div>
      </div>

      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default YourBlogs;
