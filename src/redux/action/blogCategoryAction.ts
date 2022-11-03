import { AppDispatch } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { getApi } from "../../utils/FetchData";
import { blogsCategorySlice } from "../reducers/blogCategorySlice";

const blogCategoryAction = {
  getBlogCategoryId: async (id: string, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`blog/category/${id}`);
      dispatch(
        blogsCategorySlice.actions.getBlogsCategory({ ...res.data, id })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogsCategory: async (dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`blog/category`);
      dispatch(blogsCategorySlice.actions.getBlogsCategory(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};
export default blogCategoryAction;
