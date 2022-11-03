import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi } from "../../../utils/FetchData";
import { AppDispatch } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { userPageSlice } from "../../reducers/pagination/userPageSlice";

interface IUserPage {
  page: number | 1;
  limit: number | 5;
  search?: string;
}

const userPageAction = {
  getUsersPage: async (
    data: IUserPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limit } = data;
    try {
      const res = await getApi(
        `usersPage?page=${page}&limit=${limit}`,
        access_token
      );

      const { users, totalCount } = res.data;
      dispatch(userPageSlice.actions.createUsersPage({ users, totalCount }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getUsersSearchPage: async (
    data: IUserPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limit, search } = data;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await getApi(
        `usersSearchPage?page=${page}&limit=${limit}&search=${search}`,
        access_token
      );
      const { users, totalCount, success } = res.data;

      if (success === false) {
        console.log("Ok");
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }

      dispatch(userPageSlice.actions.createUsersPage({ users, totalCount }));
      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default userPageAction;
