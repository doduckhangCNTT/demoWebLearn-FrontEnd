import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi, patchApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IBlog, IComment } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { commentBlogSlice } from "../reducers/commentBlogSlice";
// import { socketSlice } from "../reducers/socketSlice";
import { IAuth } from "../types/authType";

const CommentBlogAction = {
  createCommentBlog: async (
    data: IComment,
    authUser: IAuth,
    dispatch: AppDispatch
  ) => {
    if (!authUser.access_token) return;
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await postApi("comment", data, access_token);
      // const result = { ...res.data.newCommentBlog, user: authUser.user };
      // dispatch(commentBlogSlice.actions.createComment(result));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getCommentsBlog: async (blog: IBlog, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`comment/blog/${blog._id}`);
      const comments = res.data.find(
        (item: { _id: string | undefined }) => item._id === blog._id
      );

      if (!comments) dispatch(commentBlogSlice.actions.getComments([]));
      else {
        dispatch(commentBlogSlice.actions.getComments(comments));
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateCommentBlog: async (
    data: IComment,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await patchApi(`comment/${data._id}`, data, access_token);
      // dispatch(
      //   commentBlogSlice.actions.updateComment({
      //     _id: res.data._id,
      //     body: data.content,
      //   })
      // );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteCommentBlog: async (
    data: IComment,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await deleteApi(`comment/${data._id}`, access_token);
      // dispatch(commentBlogSlice.actions.deleteComment(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default CommentBlogAction;
