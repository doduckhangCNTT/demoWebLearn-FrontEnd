import React from "react";
import { Link } from "react-router-dom";
import { ICourse } from "../../../utils/Typescript";

interface IProps {
  courses: ICourse[];
  titleCourse: string;
  children: JSX.Element;
}

const Course: React.FC<IProps> = ({ courses, titleCourse, children }) => {
  return (
    <div className="">
      <h1 className="font-bold text-[30px]">{titleCourse}</h1>
      <div className=" grid grid-cols-4 gap-3">
        {courses.map((course, index) => {
          return (
            <div
              key={index}
              className="border-2 rounded-lg hover:shadow-md transition"
            >
              <Link to={course.link}>
                <div className="">
                  <img src={course.url} alt="" className="rounded-lg" />
                </div>
                <div className="p-2">
                  <h1 className="font-bold text-[20px] hover:text-sky-500">
                    {course.name}
                  </h1>
                  {/* {children} */}
                  <div className="flex gap-3 items-center">
                    <small className="line-through">{course.oldPrice}</small>
                    <p className="font-bold text-sky-500">{course.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Course;
