import React, { useEffect, useState } from "react";
import DetailCourse from "./DetailCourse";
import ShowVideoCourse from "./ShowVideoCourse";

const DetailOrShowCourse = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const [lessonId, setLessonId] = useState<string | null>();

  useEffect(() => {
    setLessonId(id);
  }, [id]);

  return (
    <div className="">{lessonId ? <ShowVideoCourse /> : <DetailCourse />}</div>
  );
};

export default DetailOrShowCourse;
