import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi } from "../../../utils/FetchData";
import { AppDispatch } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { coursePageSlice } from "../../reducers/pagination/coursePageSlice";

interface ICoursePage {
  page: number | 1;
  limit: number | 5;
  search?: string;
}

const coursePageAction = {
  getCoursesPage: async (
    data: ICoursePage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limit } = data;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(
        `coursesPage?page=${page}&limit=${limit}`,
        access_token
      );
      const { courses, totalCount } = res.data;

      dispatch(coursePageSlice.actions.getCoursesPage({ courses, totalCount }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getCoursesPageSearch: async (
    data: ICoursePage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limit, search } = data;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(
        `coursesPageSearch?page=${page}&limit=${limit}&search=${search}`,
        access_token
      );

      console.log("Res: ", res);
      const { courses, totalCount } = res.data;

      dispatch(coursePageSlice.actions.getCoursesPage({ courses, totalCount }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default coursePageAction;
