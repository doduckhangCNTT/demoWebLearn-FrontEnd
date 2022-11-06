import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import courseAction from "../../redux/action/course/courseAction";
import { authSelector } from "../../redux/selector/selectors";
import QuickTest from "./quickTest/QuickTest";
import Course from "./course/Course";
import PaidCourse from "./paidCourse/PaidCourse";
import SlideShow from "./slideShow/SlideShow";
import BlogHome from "./blog/Blogs";
import categoryAction from "../../redux/action/categoryAction";

const Home = () => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    categoryAction.getCategory(dispatch);

    const handleGetCourses = () => {
      if (!authUser.access_token) return;
      courseAction.getCourses(authUser.access_token, dispatch);
    };

    handleGetCourses();
  }, [authUser.access_token, dispatch]);

  return (
    <div className="relative">
      {/* Slide show */}
      <div className="">
        <SlideShow />
      </div>

      {/* Paid Courses */}
      <div className="">
        <PaidCourse />
      </div>

      {/* Courses */}
      <div className="">
        <Course />
      </div>

      {/* QuickTest */}
      <div className="">
        <QuickTest />
      </div>

      {/* Blog Outstanding */}
      <div className="">
        <BlogHome />
      </div>
    </div>
  );
};

export default Home;
