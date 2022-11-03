import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector/selectors";
import { FormSubmit, InputChangedEvent } from "../../../utils/Typescript";

interface IProps {
  comment?: { text: string; bodyUpdate?: string };
  handleSubmit?: (e: FormSubmit) => void;
  handleChangeInput?: (e: InputChangedEvent) => void;
}

const InputComments: React.FC<IProps> = ({
  comment,
  handleSubmit,
  handleChangeInput,
}) => {
  const { authUser } = useSelector(authSelector);

  return (
    <div className="flex gap-2 items-center mt-5">
      <div className="">
        <img
          src={authUser.user?.avatar}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      <div className="border-b-2 p-2 w-full">
        <form action="" onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            name="text"
            value={comment?.text}
            onChange={handleChangeInput}
            className="w-full outline-0"
            placeholder="Comment your comment here ... "
          />
          <button className="bg-gray-300 rounded-lg hover:bg-sky-600 hover:text-white p-1">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputComments;
