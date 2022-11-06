import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ComboboxLessons from "./ComboboxLessons";
import { getApi } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector/selectors";
import { ICourses } from "../../../utils/Typescript";
import CompactParam from "../../../components/CompactParam";

const DetailCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourses>();
  const { authUser } = useSelector(authSelector);

  const handleGetCourse = useCallback(
    async (courseId: string) => {
      const res = await getApi(`course/${courseId}`, authUser.access_token);
      setCourse(res.data);
    },
    [authUser.access_token]
  );

  useEffect(() => {
    if (courseId) {
      handleGetCourse(courseId);
    }
  }, [handleGetCourse, courseId]);

  return (
    <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col gap-2">
      <div className="lg:w-2/3 md:w-full sm:w-full">
        <div className="my-3">
          <h1 className="font-bold text-[30px]">{course?.name}</h1>
          <div className="">
            <CompactParam
              param={course?.description ? course.description : ""}
              quantitySlice={200}
              fontText="font-mono"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className=" w-2/3 h-full">
            <div className="">
              <div className="">
                {course?.content.map((co, index) => {
                  return (
                    <div className="" key={index}>
                      <ComboboxLessons chapter={co} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className=""></div>
          </div>
        </div>
      </div>

      {/* Man hinh xem */}
      <div className="lg:w-1/3 md:w-full sm:w-full w-full  my-[20px]">
        <div className="shadow-md border-2 rounded-lg p-2">
          <h1 className="font-bold text-[30px]">Course Introduce</h1>
          {/* Video introduce */}
          <div className="">
            <iframe
              className="w-full lg:h-[300px] md:h-[500px] sm:h-[500px] h-[500px]"
              src={course?.videoIntro}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex justify-center mt-5">
            <Link
              to={`/startCourse/${course?._id}`}
              className="border-2 p-2 rounded-lg text-[20px] text-white font-bold bg-sky-300 hover:opacity-80"
            >
              Start Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
