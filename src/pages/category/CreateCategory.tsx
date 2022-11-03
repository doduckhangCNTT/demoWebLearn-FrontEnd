import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../components/global/NotFound";
import categoryAction from "../../redux/action/categoryAction";
import {
  authSelector,
  blogsCategorySelector,
  categorySelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  ICategory,
  InputChangedEvent,
} from "../../utils/Typescript";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);
  const dispatch = useDispatch();
  const { authUser } = useSelector(authSelector);
  const { categories } = useSelector(categorySelector);
  const { blogsCategory } = useSelector(blogsCategorySelector);

  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!edit?.name) return;
    setName(edit.name);
  }, [edit]);

  useEffect(() => {
    name === "" ? setEdit(null) : setName(name);
  }, [name]);

  const handleDeleteCategory = (id: string) => {
    if (!authUser.access_token) return;
    const res = blogsCategory.find((item) => item._id === id);

    if (res) window.confirm("You need delete blogs of this category");
    else {
      categoryAction.deleteCategory(id, authUser.access_token, dispatch);
    }
  };

  const handleInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmitCategory = async (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) return;
    if (edit) {
      const data = { ...edit, name };
      categoryAction.updateCategory(data, authUser.access_token, dispatch);
    } else {
      await categoryAction.createCategory(
        name,
        authUser.access_token,
        dispatch
      );

      categoryAction.getCategory(dispatch);
    }
    setEdit(null);
    setName("");
  };

  if (authUser.user?.role !== "admin") return <NotFound />;

  return (
    <div className="w-2/3 mx-auto my-10">
      <div className="flex">
        <form
          action=""
          onSubmit={handleSubmitCategory}
          className="flex border-2 rounded-full"
        >
          <input
            type="text"
            className="p-2 rounded-full outline-0"
            placeholder="Category"
            name="category"
            value={name}
            onChange={handleInput}
          />
          <div className="p-2 hover:bg-sky-600 hover:text-white transition rounded-r-full">
            <button type="submit" className="">
              {edit && name !== "" ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className=" mt-10">
        <h1 className="font-bold text-[30px]">List Categories</h1>

        <div className="flex flex-col gap-3 mt-5">
          {categories?.map((item, index) => {
            if (!item.name) return [];
            return (
              <div key={index} className="">
                <div className="flex justify-between border-2 w-1/2 items-center">
                  <div className="p-2">{item.name}</div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEdit(item)}
                      className="border-2 p-2 hover:bg-sky-600 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCategory(item._id ? item._id : "")
                      }
                      className="border-2 p-2 hover:bg-sky-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
