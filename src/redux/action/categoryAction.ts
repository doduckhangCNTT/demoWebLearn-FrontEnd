import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi, postApi, putApi } from "../../utils/FetchData";
import { AppDispatch, ICategory } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { categorySlice } from "../reducers/categorySlice";

const categoryAction = {
  createCategory: async (
    name: string,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await postApi("category", { name }, access_token);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }

      dispatch(categorySlice.actions.createCategory(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getCategory: async (dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await getApi("category");

      dispatch(categorySlice.actions.getCategories(res.data.categories));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteCategory: async (id: string, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await deleteApi(`category/${id}`, access_token);

      dispatch(categorySlice.actions.deleteCategory(id));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateCategory: async (
    data: ICategory,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      dispatch(categorySlice.actions.updateCategory(data));

      const res = await putApi(`category/${data._id}`, data, access_token);

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default categoryAction;
