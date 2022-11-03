import React from "react";
import { useDispatch, useSelector } from "react-redux";
import categoryAction from "../../redux/action/categoryAction";
import { authSelector } from "../../redux/selector/selectors";
import { ICategory } from "../../utils/Typescript";

interface IProps {
  category: ICategory;
}

const CardCategory: React.FC<IProps> = ({ category }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(authSelector);
  const handleUpdateCategory = () => {};
  const handleDeleteCategory = (id: string) => {
    if (!authUser.access_token) return;
    categoryAction.deleteCategory(id, authUser.access_token, dispatch);
  };

  return (
    <div className="flex justify-between border-2 w-1/2 items-center">
      <div className="p-2">{category.name}</div>
      <div className="flex gap-1">
        <button
          onClick={() => handleUpdateCategory()}
          className="border-2 p-2 hover:bg-sky-600 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteCategory(category._id ? category._id : "")}
          className="border-2 p-2 hover:bg-sky-600 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardCategory;
