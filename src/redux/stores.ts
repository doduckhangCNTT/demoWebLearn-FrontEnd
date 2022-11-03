import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { alertSlice } from "./reducers/alertSlice";
import { categorySlice } from "./reducers/categorySlice";
import { uploadSlice } from "./reducers/uploadSlice";
import { blogSlice } from "./reducers/blogSlice";
import { blogsCategorySlice } from "./reducers/blogCategorySlice";
import { blogsUserSlice } from "./reducers/blogsUserSlice";
import { draftBlogSlice } from "./reducers/draftBlogSlice";
import { saveBlogSlice } from "./reducers/saveBlogSlice";
import { commentBlogSlice } from "./reducers/commentBlogSlice";
import { replyCommentsBlogSlice } from "./reducers/replyCommentSlice/replyCommentBlogSlice";
import { socketSlice } from "./reducers/socketSlice";
import { messageSlice } from "./reducers/message/messageSlice";
import { roomChatSlice } from "./reducers/roomChat/roomChatSlice";
import { messageRoomSlice } from "./reducers/roomChat/messageRoomChatSlice";
import { quickTestSlice } from "./reducers/quickTest/quickTestSlice";
import { idQuickTestSlice } from "./reducers/quickTest/IdQuickTestNow";
import { chooseQuestionSlice } from "./reducers/quickTest/chooseQuestionSlice";
import { courseSlice } from "./reducers/course/courseSlice";
import { courseNowSlice } from "./reducers/course/courseNowSlice";
import { chooseLessonSlice } from "./reducers/course/chooseLessonSlice";
import { quickTestsPageSlice } from "./reducers/pagination/quickTestPageSlice";
import { userPageSlice } from "./reducers/pagination/userPageSlice";
import { blogPageSlice } from "./reducers/pagination/blogPageSlice";
import { coursePageSlice } from "./reducers/pagination/coursePageSlice";
import { toggleNavbarSlice } from "./reducers/toggleNavbarSlice";
import { countDownSlice } from "./reducers/quickTest/countDownSlice";

// import socketReducer from "./reducers/socketSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    authUser: authSlice.reducer,
    categories: categorySlice.reducer,
    upload: uploadSlice.reducer,

    blogs: blogSlice.reducer,
    draftBlogs: draftBlogSlice.reducer,
    blogsCategory: blogsCategorySlice.reducer,
    blogsUser: blogsUserSlice.reducer,

    saveBlog: saveBlogSlice.reducer,
    commentsBlog: commentBlogSlice.reducer,

    replyCommentsBlog: replyCommentsBlogSlice.reducer,

    conversation: messageSlice.reducer,
    roomChats: roomChatSlice.reducer,
    messageRoom: messageRoomSlice.reducer,

    quickTests: quickTestSlice.reducer,
    quickTestNow: idQuickTestSlice.reducer,
    chooseQuestion: chooseQuestionSlice.reducer,

    courses: courseSlice.reducer,
    courseNow: courseNowSlice.reducer,
    chooseLesson: chooseLessonSlice.reducer,

    quickTestsPage: quickTestsPageSlice.reducer,
    userPage: userPageSlice.reducer,
    blogPage: blogPageSlice.reducer,
    coursePage: coursePageSlice.reducer,
    toggleNavbar: toggleNavbarSlice.reducer,
    statusCountDown: countDownSlice.reducer,

    socket: socketSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
