import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// React Lazy
const PagesCommon = React.lazy(() => import("../pages/PagesCommon"));
const Home = React.lazy(() => import("../pages/home/Home"));
const LoginPass = React.lazy(() => import("../components/auth/LoginPass"));
const RegisterForm = React.lazy(
  () => import("../components/auth/RegisterForm")
);
const LoginSms = React.lazy(() => import("../components/auth/LoginSms"));
const ForgotPassWord = React.lazy(
  () => import("../components/auth/ForgotPassWord")
);
const ResetPassWord = React.lazy(
  () => import("../pages/resetPassword/ResetPassword")
);
const CreateCategory = React.lazy(
  () => import("../pages/category/CreateCategory")
);

// ============================= Quick Test =============================
const QuickTest = React.lazy(() => import("../pages/quickTest/QuickTest"));
const ShowPrevious = React.lazy(
  () => import("../pages/quickTest/showPrevious/ShowPrevious")
);

// ============================= User =============================
const UserProfile = React.lazy(() => import("../pages/user/UserProfile"));
const UserSetting = React.lazy(() => import("../pages/user/UserSetting"));
const LearningPaths = React.lazy(
  () => import("../pages/learnPath/LearningPaths")
);
const Chats = React.lazy(() => import("../pages/chats/Chats"));
const RoomChat = React.lazy(() => import("../pages/chats/roomChat/RoomChat"));
const MainChat = React.lazy(() => import("../pages/chats/Index"));
const ActiveUser = React.lazy(() => import("../pages/active/ActiveUser"));
const ContentChat = React.lazy(() => import("../pages/chats/ContentChat"));
const ContentRoomChat = React.lazy(
  () => import("../pages/chats/roomChat/ContentRoomChat")
);
const NotFound = React.lazy(() => import("../components/global/NotFound"));

// ============================= Blog =============================
const Blogs = React.lazy(() => import("../pages/blogs/Blogs"));
const CreateBlog = React.lazy(() => import("../pages/blogs/CreateBlog"));
const UpdateBlog = React.lazy(
  () => import("../pages/blogs/updateBlog/UpdateBlog")
);

const SaveBlog = React.lazy(() => import("../pages/blogs/SaveBlog"));

const UpdateDraftBlog = React.lazy(
  () => import("../pages/blogs/updateBlog/UpdateDraftBlog")
);
const DeleteBlog = React.lazy(() => import("../pages/blogs/DeleteBlog"));
const YourBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/YourBlogs")
);
const DetailBlog = React.lazy(() => import("../pages/blogs/DetailBlog"));
const BlogOfCategory = React.lazy(
  () => import("../pages/blogs/yourBlogs/BlogOfCategory")
);
const PublishedBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/PublishedBlogs")
);
const DraftsBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/DraftsBlogs")
);

// ============================= Course =============================
const CreateCourse = React.lazy(
  () => import("../pages/home/course/CreateCourse")
);
const FullStack = React.lazy(
  () => import("../pages/learnPath/category/FullStack")
);
const BackEnd = React.lazy(() => import("../pages/learnPath/category/BackEnd"));
const FontEnd = React.lazy(() => import("../pages/learnPath/category/FontEnd"));
const Devops = React.lazy(() => import("../pages/learnPath/category/Devops"));
const DetailOrShowCourse = React.lazy(
  () => import("../pages/home/course/DetailOrShowCourse")
);
const ShowVideoCourse = React.lazy(
  () => import("../pages/home/course/ShowVideoCourse")
);

// ============================= Manager =============================
const Manager = React.lazy(() => import("../pages/manager/Manager"));
const Index = React.lazy(() => import("../pages/manager/Index"));
const User = React.lazy(() => import("../pages/manager/User"));
const ManagerBlog = React.lazy(() => import("../pages/manager/ManagerBlog"));
const ManagerTest = React.lazy(() => import("../pages/manager/ManagerTest"));
const ManagerCourse = React.lazy(
  () => import("../pages/manager/ManagerCourse")
);

const HandleRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="absolute z-[1000] w-full h-full flex justify-center items-center text-center min-h-screen opacity-[0.5] bg-slate-600">
          <div className="font-bold text-[30px]">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<PagesCommon />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPass />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login_sms" element={<LoginSms />} />
          <Route path="forgot_password" element={<ForgotPassWord />} />
          <Route
            path="reset_password/:access_token"
            element={<ResetPassWord />}
          />

          {/* Chat */}
          <Route path="chats" element={<Chats />}>
            <Route index element={<MainChat />} />
            <Route path="chat/:id" element={<ContentChat />} />
            <Route path="roomChat/:roomId" element={<ContentRoomChat />} />
            <Route path="newRoom" element={<RoomChat />} />
          </Route>
          <Route path="create_category" element={<CreateCategory />} />

          {/* Quick Test */}
          <Route path="quick_test" element={<QuickTest />} />
          <Route path="quick_test/question/:id" element={<QuickTest />} />
          <Route
            path="quick_test/show_previous/:idQuickTest"
            element={<ShowPrevious />}
          />

          {/* Profile */}
          <Route path="your_profile" element={<UserProfile />} />
          <Route path="your_setting" element={<UserSetting />} />

          {/* Learn path  */}
          <Route path="leaning_paths" element={<LearningPaths />}>
            <Route index element={<FullStack />} />
            <Route path="fontEnd" element={<FontEnd />} />
            <Route path="backEnd" element={<BackEnd />} />
            <Route path="Devops" element={<Devops />} />
          </Route>

          {/* Course */}
          <Route
            path="course/:nameCourse/:courseId"
            element={<DetailOrShowCourse />}
          />
          <Route path="/create_course" element={<CreateCourse />} />
          <Route path="/startCourse/:courseId" element={<ShowVideoCourse />} />
          <Route
            path="/startCourse/:courseId/lesson/:lessonId"
            element={<ShowVideoCourse />}
          />

          {/* Manager */}
          <Route path="/manager" element={<Manager />}>
            <Route index element={<Index />} />
            <Route path="user" element={<User />} />
            <Route path="blog" element={<ManagerBlog />} />
            <Route path="test" element={<ManagerTest />} />
            <Route path="course" element={<ManagerCourse />} />
          </Route>

          {/* Blog */}
          <Route path="blogs" element={<Blogs />}>
            <Route path="category/:option" element={<BlogOfCategory />} />
          </Route>

          <Route path="update_blog/:id" element={<UpdateBlog />} />
          <Route path="save_blogs" element={<SaveBlog />} />

          <Route
            path="update_draftBlog/:valueId"
            element={<UpdateDraftBlog />}
          />
          <Route path="delete_blog/:id" element={<DeleteBlog />} />
          <Route path="create_blog" element={<CreateBlog />} />
          <Route path="detail_blog/:id" element={<DetailBlog />} />

          <Route path="/your_blogs" element={<YourBlogs />}>
            <Route path="drafts" element={<DraftsBlogs />} />
            <Route path="published" element={<PublishedBlogs />} />
          </Route>

          <Route path="active/:active_token" element={<ActiveUser />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default HandleRouter;
