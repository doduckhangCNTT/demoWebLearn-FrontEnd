import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { deleteApi, getApi, patchApi, postApi } from "../../../utils/FetchData";
import {
  AppDispatch,
  IBlog,
  IReplyCommentBlog,
} from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { replyCommentsBlogSlice } from "../../reducers/replyCommentSlice/replyCommentBlogSlice";

const ReplyCommentsBlogAction = {
  createCommentBlog: async (
    data: IReplyCommentBlog,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await postApi("reply/comment", data, access_token);

      // dispatch(replyCommentsBlogSlice.actions.createComment(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getReplyCommentsBlog: async (blog: IBlog, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`reply/comment/blog/${blog._id}`);
      console.log("Res: ", res);
      const replyComments = res.data.find(
        (item: { _id: string | undefined }) => item._id === blog._id
      );

      if (!replyComments)
        dispatch(replyCommentsBlogSlice.actions.getComments([]));
      else dispatch(replyCommentsBlogSlice.actions.getComments(replyComments));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateReplyCommentBlog: async (
    data: IReplyCommentBlog,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      await patchApi(`reply/comment/${data._id}`, data, access_token);

      // dispatch(
      //   replyCommentsBlogSlice.actions.updateComment({
      //     _id: res.data?._id,
      //     body: data.content,
      //   })
      // );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteReplyCommentBlog: async (
    data: { comment: IReplyCommentBlog; replyComment: [] },
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      // X??a reply hi???n t???i
      await deleteApi(`reply/comment/${data.comment?._id}`, access_token);
      // Lo???i b??? id reply trong tin nh???n g???c cao nh???t
      await patchApi(
        `reply/comment/root/${data.comment.rootComment_answeredId}`,
        { replyComment: data.replyComment },
        access_token
      );

      // dispatch(
      //   replyCommentsBlogSlice.actions.deleteComment({
      //     _id: res.data?._id,
      //   })
      // );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default ReplyCommentsBlogAction;
