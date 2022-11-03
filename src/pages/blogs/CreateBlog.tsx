import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "../../components/editor/ReactQuill";
import { authSelector, categorySelector } from "../../redux/selector/selectors";
import { IBlog, InputChangedEvent } from "../../utils/Typescript";

import { validCreateBlog, valid_Old_NewData } from "../../utils/Valid";
import { alertSlice } from "../../redux/reducers/alertSlice";
import blogAction from "../../redux/action/blogAction";
import PreviewBlog from "./PreviewBlog";
import { getApi } from "../../utils/FetchData";
import categoryAction from "../../redux/action/categoryAction";

interface IProps {
  id?: string;
  valueId?: string;
}

const CreateBlog: React.FC<IProps> = React.memo(({ id, valueId }) => {
  // console.log({ id, valueId });
  const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    // thumbnail: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const [oldData, setOldData] = useState<IBlog>(initialState);
  const [blog, setBlog] = useState<IBlog>(initialState);

  const { categories } = useSelector(categorySelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getBlog = async () => {
      if (!id) return;
      const res = await getApi(`blog/${id}`);

      setBlog(res.data.blog);
      setBody(res.data.blog.content);
      setOldData(res.data.blog);
    };
    getBlog();

    const initialState = {
      user: "",
      title: "",
      content: "",
      description: "",
      // thumbnail: "",
      thumbnail: {
        public_id: "",
        url: "",
      },
      category: "",
      createdAt: new Date().toISOString(),
    };
    return () => {
      setBlog(initialState);
      setBody("");
      setOldData(initialState);
    };
  }, [id]);

  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDraftBlog = async () => {
      if (!valueId) return;
      const res = await getApi(`draftBlog/${valueId}`);

      setBlog(res.data.blog);
      setBody(res.data.blog.content);
      setOldData(res.data.blog);
    };
    getDraftBlog();

    const initialState = {
      user: "",
      title: "",
      content: "",
      description: "",
      // thumbnail: "",
      thumbnail: {
        public_id: "",
        url: "",
      },
      category: "",
      createdAt: new Date().toISOString(),
    };
    return () => {
      setBlog(initialState);
      setBody("");
      setOldData(initialState);
    };
  }, [valueId]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    // const text = div.innerText;
    const text = body;
    setText(text);
  }, [body]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeFile = (e: InputChangedEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: { public_id: "", url: file } });
    }
  };

  const handleSubmit = () => {
    if (!authUser.access_token)
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );

    const newBlog = { ...blog, content: text };
    const check = validCreateBlog(newBlog);
    if (check.errLength > 0)
      return dispatch(alertSlice.actions.alertAdd({ error: check.errMsg }));

    if (id) {
      const check = valid_Old_NewData(oldData, newBlog);
      if (check) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "No change value" })
        );
      }

      blogAction.updateBlog(newBlog, authUser.access_token, dispatch, "create");
    } else {
      blogAction.createBlog(newBlog, authUser.access_token, dispatch, "create");
    }
  };

  const handleDraftBlogSubmit = () => {
    if (!authUser.access_token)
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );

    const newBlog = { ...blog, content: text };

    if (valueId) {
      const check = valid_Old_NewData(oldData, newBlog);
      if (check) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "No change value" })
        );
      }
      blogAction.updateBlog(newBlog, authUser.access_token, dispatch, "draft");
    } else {
      blogAction.createBlog(newBlog, authUser.access_token, dispatch, "draft");
    }
  };

  return (
    <div className="flex m-5 w-2/3 mx-auto flex-col gap-5">
      <div className="flex gap-3 xl:flex-row md:flex-col-reverse sm:flex-col-reverse xs:flex-col-reverse">
        <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <form action="" className="flex flex-col gap-5">
            {/* Title Blog */}
            <div className="">
              <div className="flex flex-col gap-3 w-full sm:w-full xs:w-full">
                <h1 className="font-bold text-[20px]">Title Blog</h1>
                <input
                  type="text"
                  className=" p-3 w-full outline-none border-2"
                  placeholder="Title Blog"
                  name="title"
                  value={blog.title}
                  onChange={handleChangeInput}
                />
              </div>
              <small className="flex justify-end">
                {blog.title.length} / 50
              </small>
            </div>

            {/* Description Blog */}
            <div className="">
              <div className="font-bold text-[16px]">
                <h1 className="">Introduce Blog</h1>
                <textarea
                  className="w-full h-[100px] p-3  outline-none border-2"
                  id=""
                  placeholder="Introduce Blog here..."
                  name="description"
                  value={blog.description}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              <small className="flex justify-end">
                {blog.description.length} / 100
              </small>
            </div>

            {/* Image Blog  */}
            <div>
              <h1 className="font-bold text-[20px] my-3">Image Blog</h1>
              <input
                type="file"
                className=""
                name="thumbnail"
                accept="image/*"
                onChange={handleChangeFile}
              />
            </div>

            {/* Category Blog    */}
            <div className="">
              <h1 className="font-bold text-[20px] my-3">Categories</h1>
              <select
                className="w-[200px] border-2"
                value={blog.category}
                name="category"
                onChange={handleChangeInput}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* View Blog */}
        <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <PreviewBlog blog={blog} />
        </div>
      </div>

      {/* Content Blog  */}
      <div>
        <ReactQuill body={body} setBody={setBody} />

        <div
          className="hidden"
          ref={divRef}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <small>{text.length}</small>
      </div>

      <button
        onClick={handleSubmit}
        className="hover:bg-sky-600 hover:text-white w-[200px] mx-auto text-center border-2 inline-block transition text-[20px] rounded px-3 cursor-pointer"
      >
        {id ? "Update" : "Create"}
      </button>
      <button
        onClick={handleDraftBlogSubmit}
        className="hover:bg-sky-600 hover:text-white w-[200px] mx-auto text-center border-2 inline-block transition text-[20px] rounded px-3 cursor-pointer"
      >
        {valueId ? "Update Draft Blogs" : "Create Draft Blogs"}
      </button>
    </div>
  );
});

export default CreateBlog;
