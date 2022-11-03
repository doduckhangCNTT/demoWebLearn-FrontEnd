import { checkTokenExp } from "../../utils/CheckTokenExp";
import {
  getApi,
  postApi,
  putApi,
  deleteApi,
  deleteApiUpload,
} from "../../utils/FetchData";
import { AppDispatch, IBlog } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { blogSlice } from "../reducers/blogSlice";
import { draftBlogSlice } from "../reducers/draftBlogSlice";

const blogAction = {
  createBlog: async (
    blog: IBlog,
    token: string,
    dispatch: AppDispatch,
    classify?: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      if (!blog.thumbnail.url) {
        return dispatch(
          alertSlice.actions.alertAdd({
            error: "You must provide a thumbnail url",
          })
        );
      }

      let data;
      if (typeof blog.thumbnail.url === "string") {
        data = {
          public_id: blog.thumbnail.public_id,
          url: blog.thumbnail.url,
        };
      } else {
        let formData = new FormData();
        formData.append("file", blog.thumbnail.url);
        const resImg = await postApi("upload", formData, access_token);
        data = { public_id: resImg.data.public_id, url: resImg.data.url };
      }

      const newBlog = { ...blog, thumbnail: data, classify };
      const res = await postApi("blog", newBlog, access_token);

      dispatch(blogSlice.actions.createBlog(res.data));
      // dispatch(categorySlice.actions.createCategory(res.data));

      if (blog._id) {
        dispatch(
          draftBlogSlice.actions.deleteBlog({
            id: blog._id ? blog._id : "",
          })
        );
        await deleteApi(`draftBlog/${blog._id}`, access_token);
      }

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogs: async (dispatch: AppDispatch, search = `?page=${1}`) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const limit = 3;
      const value = search ? search : `?page=${1}`;
      const res = await getApi(`blog${value}&limit=${limit}`);
      // console.log("Res: ", res);
      dispatch(blogSlice.actions.getBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getListBlogs: async (dispatch: AppDispatch, search = `?page=${1}`) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await getApi(`blogs`);
      // console.log("Res: ", res);
      dispatch(blogSlice.actions.getBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getDraftBlogs: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("blog/draft", access_token);
      dispatch(draftBlogSlice.actions.getBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateBlog: async (
    blog: IBlog,
    token: string,
    dispatch: AppDispatch,
    classify?: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      let data;
      if (typeof blog.thumbnail.url === "string") {
        data = {
          public_id: blog.thumbnail.public_id,
          url: blog.thumbnail.url,
        };
      } else {
        let formData = new FormData();
        formData.append("file", blog.thumbnail.url);
        const resImg = await postApi("upload", formData, access_token);
        data = { public_id: resImg.data.public_id, url: resImg.data.url };
      }

      const newBlog = {
        ...blog,
        thumbnail: data,
        classify,
      };
      dispatch(
        blogSlice.actions.updateBlog({ id: newBlog._id, newBlog: newBlog })
      );
      const res = await putApi(`blog/${newBlog._id}`, newBlog, access_token);

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteBlog: async (
    blog: IBlog,
    token: string,
    dispatch: AppDispatch,
    classify?: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await deleteApiUpload(
        "destroy",
        { public_id: blog.thumbnail.public_id },
        access_token
      );

      let res;
      if (classify?.toLowerCase() === "delete") {
        dispatch(
          blogSlice.actions.deleteBlog({ id: blog._id ? blog._id : "" })
        );
        res = await deleteApi(`blog/${blog._id}`, access_token);
      } else if (classify?.toLowerCase() === "draft") {
        dispatch(
          draftBlogSlice.actions.deleteBlog({ id: blog._id ? blog._id : "" })
        );
        res = await deleteApi(`draftBlog/${blog._id}`, access_token);
      }
      dispatch(alertSlice.actions.alertAdd({ success: res?.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default blogAction;
