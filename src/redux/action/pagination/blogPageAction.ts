import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi } from "../../../utils/FetchData";
import { AppDispatch } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { blogPageSlice } from "../../reducers/pagination/blogPageSlice";

interface IBlogPage {
  page: number | 1;
  limit: number | 5;
  search?: string;
}

const blogPageAction = {
  getBlogsPage: async (
    data: IBlogPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    const { page, limit } = data;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(
        `blogsPage?page=${page}&limit=${limit}`,
        access_token
      );
      const { blogs, totalCount } = res.data;
      dispatch(blogPageSlice.actions.getBlogsPage({ blogs, totalCount }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogsPageSearch: async (
    data: IBlogPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limit, search } = data;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(
        `blogsPageSearch?page=${page}&limit=${limit}&search=${search}`,
        access_token
      );
      const { blogs, totalCount } = res.data;

      dispatch(blogPageSlice.actions.getBlogsPageSearch({ blogs, totalCount }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default blogPageAction;
