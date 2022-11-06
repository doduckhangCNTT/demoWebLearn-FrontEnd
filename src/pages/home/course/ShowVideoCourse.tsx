import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompactParam from "../../../components/CompactParam";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import { authSelector } from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import { ICourses, ILesson } from "../../../utils/Typescript";
import ComboboxToUser from "./ComboboxToUser";

const ShowVideoCourse = () => {
  const [widthFull, setWidthFull] = useState(false);
  const [course, setCourse] = useState<ICourses>();
  const [lesson, setLesson] = useState<ILesson>();
  const { courseId } = useParams();
  const { lessonId } = useParams();

  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetCourse = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid authentication" })
        );
      }
      if (courseId) {
        const res = await getApi(`course/${courseId}`, authUser.access_token);
        setCourse(res.data);
      }
    };
    handleGetCourse();
  }, [authUser.access_token, courseId, dispatch]);

  useEffect(() => {
    course?.content.forEach((c) => {
      c.lessons.forEach((l) => {
        if (l._id === lessonId) {
          setLesson(l);
        }
      });
    });
  }, [course?.content, lessonId]);

  return (
    <div className="lg:flex lg:flex-row gap-2 md:flex-row sm:flex-col flex-col">
      {/* Video / Chats / Note  */}
      <div
        className={
          widthFull
            ? "w-full relative"
            : "lg:w-2/3 md:w-full sm:w-full w-full relative"
        }
      >
        <div className="">
          {/* Kiem tra xem dau la video upload va dau la video youtube */}
          {lesson?.fileUpload.public_id ? (
            <div className="">
              {lesson.fileUpload.mimetype === "video" ? (
                <video controls className="h-full">
                  <source
                    type="video/mp4"
                    src={lesson.fileUpload.secure_url}
                  ></source>
                </video>
              ) : (
                <LazyLoadingImg
                  url={lesson.fileUpload.secure_url}
                  alt="images"
                  className="h-full"
                />
              )}
            </div>
          ) : lessonId ? (
            <iframe
              className="w-full lg:h-[750px] md:h-[450px] sm:h-[450px] h-[350px]"
              src={lesson?.url as string}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className=""
            />
          )}
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-[20px]">
            {lesson?.name
              ? lesson.name
              : `Welcome to the course ${course?.name}`}
          </h1>
          <CompactParam
            param={
              lesson?.description
                ? lesson?.description
                : "You can refer courses on the side"
            }
            quantitySlice={150}
          />
        </div>

        <div className="flex justify-end my-5">
          <button
            className="
              p-2 
              font-bold 
              hover:text-sky-500 
              bg-slate-200 
              rounded-lgo"
            onClick={() => setWidthFull((prev) => !prev)}
          >
            {widthFull ? "Show lessons" : "Hide lessons"}
          </button>
        </div>

        {lessonId ? (
          <button
            className="
            absolute 
            border-2 font-bold 
            bottom-5 left-5
            transition 
            rounded-full p-2 
            hover:bg-sky-500 
            hover:text-white"
          >
            Questions
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Lessons with Index */}
      <div
        className={
          widthFull ? "hidden" : "lg:w-1/3 md:w-full sm:w-full w-full mb-[20px]"
        }
      >
        <div className="">
          <h1 className="font-bold text-[30px]">Lessons</h1>
          <div className="">
            {course?.content.map((co, index) => {
              return (
                <div className="" key={index}>
                  <ComboboxToUser chapter={co} course={course} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVideoCourse;
