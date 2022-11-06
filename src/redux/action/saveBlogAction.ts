import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IBlog } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { saveBlogSlice } from "../reducers/saveBlogSlice";
import { IAuth } from "../types/authType";

const saveBlogAction = {
  createBlog: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("bookmark/blog", blog, access_token);
      dispatch(saveBlogSlice.actions.createBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogs: async (authUser: IAuth, dispatch: AppDispatch) => {
    if (!authUser.access_token)
      return dispatch(alertSlice.actions.alertAdd({ error: "Invalid token" }));
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("bookmark/blogs", access_token);
      const infoBlogSavedUser = res.data.find(
        (item: { _id: string }) => item._id === authUser.user?._id
      );
      dispatch(saveBlogSlice.actions.getBlog(infoBlogSavedUser));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteBlog: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(`bookmark/blog/${blog._id}`, access_token);
      dispatch(saveBlogSlice.actions.deleteBlog(res.data.blog));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  // deleteBlogUser: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
  //   const result = await checkTokenExp(token, dispatch);
  //   const access_token = result ? result : token;
  //   try {
  //     dispatch(alertSlice.actions.alertAdd({ loading: true }));

  //     const res = await deleteApi(`bookmark/blog/${blog._id}`, access_token);
  //     dispatch(saveBlogSlice.actions.deleteBlog(res.data.blog));

  //     dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
  //   } catch (error: any) {
  //     dispatch(alertSlice.actions.alertAdd({ error: error.message }));
  //   }
  // },
};

export default saveBlogAction;
