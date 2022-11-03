import { RootState } from "../../utils/Typescript";

export const alertSelector = (state: RootState) => state;
export const authSelector = (state: RootState) => state;
export const categorySelector = (state: RootState) => state;
export const draftBlogSelector = (state: RootState) => state;

export const blogSelector = (state: RootState) => state;
export const blogsCategorySelector = (state: RootState) => state;
export const blogsUserSelector = (state: RootState) => state;

export const saveBlogUserSelector = (state: RootState) => state;
export const saveBlogsOfUserSelector = (state: RootState) => state;

export const commentBlogSelector = (state: RootState) => state;
export const replyCommentBlogSelector = (state: RootState) => state;

export const messageSelector = (state: RootState) => state;
export const roomChatSelector = (state: RootState) => state;
export const messageRoomChatSelector = (state: RootState) => state;

export const quickTestsSelector = (state: RootState) => state;
export const quickTestNowSelector = (state: RootState) => state;
export const chooseQuestionSelector = (state: RootState) => state;
export const courseSelector = (state: RootState) => state;
export const courseNowSelector = (state: RootState) => state;
export const chooseLessonSelector = (state: RootState) => state;

export const quickTestsPageSelector = (state: RootState) => state;
export const userSelector = (state: RootState) => state;
export const blogPageSelector = (state: RootState) => state;
export const coursePageSelector = (state: RootState) => state;
export const toggleNavbarSelector = (state: RootState) => state;
export const statusCountDownSelector = (state: RootState) => state;

export const socketSelector = (state: RootState) => state;
