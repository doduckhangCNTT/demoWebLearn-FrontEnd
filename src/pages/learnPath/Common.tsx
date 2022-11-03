import React from "react";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import CompactParam from "../../components/CompactParam";

interface IProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const Common: React.FC<IProps> = ({ title, description, image, path }) => {
  return (
    <div className="flex flex-col border-2 rounded-lg p-3 gap-3">
      <div className="flex gap-2">
        <div className="">
          <h1 className="font-bold text-[20px]">{title}</h1>
          <div className="indent-3">
            <CompactParam param={description} quantitySlice={150} />
          </div>
        </div>

        <div className="border-2 rounded-full">
          <LazyLoadingImg
            url={image}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      <Link to={path}>
        <button className="w-full transition ease-in-out delay-150 bg-sky-500 hover:-translate-y-1 hover:scale-110 duration-300 border-2 rounded-lg p-2  text-white hover:opacity-90 font-bold">
          Show detail
        </button>
      </Link>
    </div>
  );
};

export default Common;
