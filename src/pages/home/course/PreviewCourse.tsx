import React from "react";
import CompactParam from "../../../components/CompactParam";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";
import { ICourses } from "../../../utils/Typescript";
import ComboboxLessons from "./ComboboxLessons";

interface IProps {
  course: ICourses;
}

const PreviewCourse: React.FC<IProps> = ({ course }) => {
  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-[30px]">Preview Course</h1>
        <div className="border-2 rounded-lg p-2 mt-3">
          <div className="">
            {typeof course.thumbnail.url === "string" ? (
              <LazyLoadingImg
                url={course.thumbnail.url}
                alt=""
                className="w-full"
              />
            ) : (
              <LazyLoadingImg
                url={URL.createObjectURL(course.thumbnail.url as Blob)}
                alt=""
                className="w-full"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="">
              <h1 className="font-bold text-[20px]">{course.name}</h1>
              <CompactParam param={course.description} quantitySlice={100} />
            </div>
            {course.price === 0 && course.oldPrice === 0 ? (
              ""
            ) : (
              <div className="flex gap-2 items-center">
                <small>{course.oldPrice}đ</small>
                <div className="text-[20px] text-sky-500 font-bold">
                  {course.price}đ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 border-2 p-2">
        <h1 className="font-bold text-[30px]">Lessons</h1>
        <div className="">
          {course.content.map((co, index) => {
            return (
              <div className="" key={index}>
                <ComboboxLessons chapter={co} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewCourse;
