import React from "react";

interface IProps {
  titleList: string;
  children: JSX.Element;
}

const FrameList: React.FC<IProps> = ({ titleList, children }) => {
  return (
    <div className="mt-3">
      <h1 className="font-bold text-[30px] p-2 font-mono hover:text-sky-500 transition hover:shadow-md">
        {titleList}
      </h1>
      <div className=" grid lg:grid-cols-5 gap-2 md:grid-cols-3 sm:grid-cols-2 ml-5 px-2 border-t-2 py-2">
        {children}
      </div>
    </div>
  );
};

export default FrameList;
