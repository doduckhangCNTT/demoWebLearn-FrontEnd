import { checkTokenExp } from "../../utils/CheckTokenExp";
import { getApi } from "../../utils/FetchData";
import { AppDispatch } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { blogsUserSlice } from "../reducers/blogsUserSlice";

const blogUserAction = {
  getBlogUser: async (id: string, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`blog/user/${id}`, access_token);
      dispatch(blogsUserSlice.actions.getBlogsUser({ ...res.data, id }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default blogUserAction;
