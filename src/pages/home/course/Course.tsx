import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { courseSelector } from "../../../redux/selector/selectors";
import { ICourses } from "../../../utils/Typescript";
import FrameList from "../common/FrameList";

const Course = () => {
  const { courses } = useSelector(courseSelector);

  return (
    <FrameList titleList="Courses">
      <>
        {(courses as ICourses[])?.map((course, index) => {
          return (
            <Fragment key={index}>
              {course.price ? (
                ""
              ) : (
                <div className="border-2 rounded-lg hover:shadow-md gap-3">
                  <Link
                    to={`course/${course?.name
                      .replace(" ", "-")
                      .toLowerCase()}/${course._id ? course._id : ""}`}
                  >
                    <div className="">
                      <img
                        src={course.thumbnail?.url as string}
                        alt=""
                        className="rounded-lg h-[250px] w-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h1 className="font-bold text-[20px] hover:text-sky-500">
                        {course.name}
                      </h1>
                      {course.price === 0 && course.oldPrice === 0 ? (
                        ""
                      ) : (
                        <div className="flex gap-3 items-center">
                          <small className="line-through">
                            {course.oldPrice}
                          </small>
                          <p className="font-bold text-sky-500">
                            {course.price}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              )}
            </Fragment>
          );
        })}
      </>
    </FrameList>
  );
};

export default Course;
