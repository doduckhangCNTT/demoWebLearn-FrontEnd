import ListsSorted from "../../../hooks/useSorted";
import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi } from "../../../utils/FetchData";
import { AppDispatch, IQuickTest } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { quickTestsPageSlice } from "../../reducers/pagination/quickTestPageSlice";

interface IGetQuickTestsPage {
  page: number | 1;
  sort: string;
  limit: number;
  time?: string;
}

interface IGetQuickTestsSearchPage {
  page: number | 1;
  limitPageSearch: number;
  searchTest: string;
  totalCount?: number;
}

const quickTestPageAction = {
  getQuickTestsPage: async (
    data: IGetQuickTestsPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const { page, limit, sort } = data;
      try {
        const res = await getApi(
          `quickTestsPage?page=${page}&limit=${limit}`,
          access_token
        );
        const { quickTestsPage, totalCount } = res.data;

        // If on path url have option sort is --> trang tiep theo cung muon sap xep nhu vay
        if (sort) {
          const value = data.sort;
          let items = [] as IQuickTest[] | undefined;

          if (value === "category") {
            items = ListsSorted<IQuickTest>(quickTestsPage, value, "name");
          } else {
            items = ListsSorted<IQuickTest>(quickTestsPage, value);
          }

          dispatch(
            quickTestsPageSlice.actions.createQuickTestPage({
              data: items,
              totalCount,
            })
          );
        } else {
          dispatch(
            quickTestsPageSlice.actions.createQuickTestPage({
              data: quickTestsPage,
              totalCount,
            })
          );
        }

        // Filter time tren tat ca cac trang
        // else if (time) {
        //   console.log("Time: ", time);
        //   const timeValue = time.split("+");
        //   let items = [] as IQuickTest[];

        //   if (timeValue[1] === "biggerTime") {
        //     items = (quickTestsPage as IQuickTest[]).filter(
        //       (item) => item.time > Number(timeValue[0])
        //     );
        //   } else if (timeValue[1] === "lessTime") {
        //     items = (quickTestsPage as IQuickTest[]).filter(
        //       (item) => item.time < Number(timeValue[0])
        //     );
        //   }
        //   dispatch(
        //     quickTestsPageSlice.actions.createQuickTestPage({
        //       data: items,
        //       totalCount,
        //     })
        //   );
        // }
      } catch (error: any) {
        dispatch(alertSlice.actions.alertAdd({ error: error.message }));
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getQuickTestsSearch: async (
    data: IGetQuickTestsSearchPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    const { page, limitPageSearch, searchTest, totalCount } = data;
    try {
      const res = await getApi(
        `quickTestsSearch?page=${page}&limit=${limitPageSearch}&search=${searchTest}`,
        access_token
      );
      // setCheckSearchDuplicate(searchTest);
      console.log("Ok");
      if (res.data.listTestSearch.length > 0) {
        const quickTestsSearch = res.data.listTestSearch as IQuickTest[];

        /**
         *  totalCount: Để kiểm tra đây là lần search đầu tiên thì cần phải lấy được tổng số các quickTest
         *  thì mới có thể phân trang
         */
        if (totalCount) {
          dispatch(
            quickTestsPageSlice.actions.createQuickTestPage({
              data: quickTestsSearch,
              totalCount,
            })
          );
        } else {
          dispatch(
            quickTestsPageSlice.actions.updateQuickTestPage({
              data: quickTestsSearch,
            })
          );
        }
      } else {
        dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default quickTestPageAction;
