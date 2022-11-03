import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import {
  LIMIT_TEST_PAGE,
  LIMIT_TEST_PAGE_SEARCH,
} from "../../constants/quickTestPage";
import fCheckedAll from "../../features/fCheckedAll";
import fCheckedList from "../../features/fCheckedList";
import useCustomRouter from "../../hooks/useCustomRouter";
import useOptionLocationUrl from "../../hooks/useOptionLocationUrl";
import ListsSorted from "../../hooks/useSorted";
import quickTestPageAction from "../../redux/action/pagination/quickTestPageAction";
import quickTestAction from "../../redux/action/quickTestAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { quickTestsPageSlice } from "../../redux/reducers/pagination/quickTestPageSlice";
import {
  authSelector,
  quickTestsPageSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import {
  FormSubmit,
  ICategory,
  InputChangedEvent,
  IQuickTest,
  IUser,
} from "../../utils/Typescript";

const ManagerTest = () => {
  const { pushQuery } = useCustomRouter();
  // get value page, sort on URL
  const { page, sort, time } = useOptionLocationUrl();

  const [sortValue, setSortValue] = useState<string>();
  const [searchTest, setSearchTest] = useState<string>("");

  // Selected
  const [checkedTests, setCheckedTests] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);

  const searchTestRef = useRef("");

  const { authUser } = useSelector(authSelector);
  const { quickTests } = useSelector(quickTestsSelector);
  const { quickTestsPage } = useSelector(quickTestsPageSelector);
  const dispatch = useDispatch();

  // =========================== Get QuickTest Results =========================
  const handleGetQuickTestPage = useCallback(async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: Number(page),
      sort: sortValue ? sortValue.toString() : "",
      limit: LIMIT_TEST_PAGE,
      time: time ? time : "",
    };

    // Việc sử dụng useRef là để tránh việc bị re-render component
    searchTestRef.current = searchTest;

    // Co gia tri muon tim kiem
    if (searchTest) {
      if (searchTest !== searchTestRef.current) {
        // Nếu mà sử dụng setState ở đây thì dẫn đến re-render component khiến cho những đoạn code phía sau sẽ thực thi khi re-render xong --> update lại giá trị cũ
        // setCheckSearchDuplicate(searchTest)
        const data = {
          page: page ? Number(page) : 1,
          limitPageSearch: LIMIT_TEST_PAGE_SEARCH,
          searchTest,
        };

        quickTestPageAction.getQuickTestsSearch(
          data,
          authUser.access_token,
          dispatch
        );
      }
    } else {
      quickTestPageAction.getQuickTestsPage(
        data,
        authUser.access_token,
        dispatch
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.access_token, dispatch, page, sortValue]);

  const handleGetQuickTestsAll = useCallback(async () => {
    if (!authUser.access_token)
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid access token" })
      );

    if (quickTests.length <= 0) {
      quickTestAction.getQuickTests(authUser.access_token, dispatch);
    }
  }, [authUser.access_token, dispatch, quickTests.length]);

  const handleGetQuickTestsNow = () => {
    // Thay doi url ko con gia tri time
    const pageValueLocal = page ? Number(page) : 1;
    pushQuery(pageValueLocal, sortValue, {
      requestTime: "",
      timeNumber: 50,
    });

    // Lay lai toan bo gia tri cua trang hien tai
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: pageValueLocal,
      sort: sortValue ? sortValue.toString() : "",
      limit: LIMIT_TEST_PAGE,
    };

    quickTestPageAction.getQuickTestsPage(
      data,
      authUser.access_token,
      dispatch
    );
  };

  const getAllQuickTestsPage = async (pageValueLocal: number) => {
    const res = await getApi(
      `quickTestsPage?page=${pageValueLocal}&limit=${LIMIT_TEST_PAGE}`,
      authUser.access_token
    );
    const { quickTestsPage } = res.data;

    return quickTestsPage as IQuickTest[];
  };

  const getQuickTestsSearch = async () => {
    const res = await getApi(
      `quickTestsSearch?page=${page}&limit=${LIMIT_TEST_PAGE_SEARCH}&search=${searchTest}`,
      authUser.access_token
    );
    const { listTestSearch } = res.data;
    return listTestSearch;
  };

  useEffect(() => {
    handleGetQuickTestPage();
  }, [handleGetQuickTestPage]);

  // Lay toan bo quickTests
  useEffect(() => {
    handleGetQuickTestsAll();
  }, [handleGetQuickTestsAll]);

  // ============================== Tinh tong trang ===============================
  // Tinh tong so trang
  const totalPage = useMemo(() => {
    if (quickTests.length === 0) return 0;
    // Nếu có giá trị searchTest thì lấy Limit của các giá trị sau khi search
    return Math.ceil(
      quickTestsPage.totalCount /
        (searchTest?.trim() !== "" ? LIMIT_TEST_PAGE_SEARCH : LIMIT_TEST_PAGE)
    );
  }, [quickTests.length, quickTestsPage.totalCount, searchTest]);

  // ======================== Feature Sort ========================
  // Handle have change sort on url
  useEffect(() => {
    setSortValue(sort ? sort : "");
    console.log("Change Sort");
  }, [sort]);

  const handleSortPage = async (e: InputChangedEvent) => {
    const { value } = e.target;
    const pageValueLocal = page ? Number(page) : 1;
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authorization" })
      );
    }

    // Di chuyen thanh url có thêm giá trị sort
    pushQuery(pageValueLocal, value);

    if (value === "" && searchTest) {
      const data = {
        page: page ? Number(page) : 1,
        limitPageSearch: LIMIT_TEST_PAGE_SEARCH,
        searchTest,
      };

      quickTestPageAction.getQuickTestsSearch(
        data,
        authUser.access_token,
        dispatch
      );
    }

    if (sortValue !== null && value !== "") {
      let items = [] as IQuickTest[] | undefined;

      if (value === "category") {
        // Lay ra danh sách quickTest đã được sắp xếp theo TEN CATEGORY
        items = ListsSorted<IQuickTest>(quickTestsPage.data, value, "name");
      } else {
        // Lay ra danh sách quickTest đã được sắp xếp theo TEN
        items = ListsSorted<IQuickTest>(quickTestsPage.data, value);
      }

      console.log("Items Sort: ", items);
      dispatch(
        quickTestsPageSlice.actions.updateQuickTestPage({
          data: items ? items : [],
        })
      );
    }
  };

  // ======================== Feature Select CheckBox ========================
  const handleChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    quickTest: IQuickTest
  ) => {
    fCheckedList(e, quickTest, checkedTests, setCheckedTests, "_id");

    // const { checked } = e.target;
    // if (checked) {
    //   // Khong nen su dung vì khien bat dong bo
    //   // setCheckedTests((prev) => [...prev, quickTest._id ? quickTest._id : ""]);

    //   const newQuickTests = [
    //     ...checkedTests,
    //     quickTest._id ? quickTest._id : "",
    //   ];
    //   setCheckedTests(newQuickTests);
    // } else {
    //   const quickTestsRemaining = checkedTests.filter(
    //     (item) => item !== quickTest._id
    //   );
    //   setCheckedTests(quickTestsRemaining);
    // }
  };

  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll);
    fCheckedAll(selectedAll, quickTestsPage.data, setCheckedTests, "_id");

    // const allTestSelected = [] as string[];
    // if (!selectedAll) {
    //   quickTestsPage.data.forEach((item) => {
    //     allTestSelected.push(item._id ? item._id : "");
    //   });
    //   setCheckedTests(allTestSelected);
    // } else {
    //   setCheckedTests([]);
    // }
  };

  const handleDeleteMultipleTest = () => {
    if (window.confirm("Are you sure you want to delete")) {
      // checkedTests.forEach((item) => {});
      console.log("Select: ", checkedTests);
    }
  };

  // ======================== Feature Search ========================
  const handleChangeInputSearchTest = (e: InputChangedEvent) => {
    const { value } = e.target;
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (value) {
      setSearchTest(value);
    } else {
      setSearchTest("");

      const data = {
        page: page ? Number(page) : 1,
        sort: sortValue ? sortValue : "",
        limit: LIMIT_TEST_PAGE,
      };
      quickTestPageAction.getQuickTestsPage(
        data,
        authUser.access_token,
        dispatch
      );
    }
  };

  const handleSubmitSearch = async (e: FormSubmit) => {
    e.preventDefault();

    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (searchTest) {
      /**
       * Get: All values from the search results
       * Description: Get totalCount --> Paging
       */
      const listTest = quickTests.filter(
        (item) =>
          (item.user as IUser).account === searchTest || item._id === searchTest
      );

      const data = {
        page: page ? Number(page) : 1,
        limitPageSearch: LIMIT_TEST_PAGE_SEARCH,
        searchTest,
        totalCount: listTest.length,
      };
      quickTestPageAction.getQuickTestsSearch(
        data,
        authUser.access_token,
        dispatch
      );
    } else {
      handleGetQuickTestPage();
    }
  };

  // ======================== Feature Filter ========================
  const handleChangeFilterAccessModifier = (e: InputChangedEvent) => {};

  const handleChangeFilterTime = async (e: InputChangedEvent) => {
    const { value } = e.target;
    const pageValueLocal = page ? Number(page) : 1;
    let allQuickTests = [] as IQuickTest[];
    // console.log("All Quick Tests: ", allQuickTests);
    const timeValue = 50;
    if (value === "lessTime") {
      if (searchTest) {
        allQuickTests = await getQuickTestsSearch();
      } else {
        allQuickTests = await getAllQuickTestsPage(pageValueLocal);
      }

      pushQuery(pageValueLocal, sortValue, {
        requestTime: value,
        timeNumber: Number(timeValue),
      });

      const items = allQuickTests.filter((q: { time: number }) => q.time < 50);
      dispatch(
        quickTestsPageSlice.actions.updateQuickTestPage({
          data: items ? items : [],
        })
      );
    } else if (value === "biggerTime") {
      if (searchTest) {
        allQuickTests = await getQuickTestsSearch();
      } else {
        allQuickTests = await getAllQuickTestsPage(pageValueLocal);
      }

      pushQuery(pageValueLocal, sortValue, {
        requestTime: value,
        timeNumber: Number(timeValue),
      });

      const items = allQuickTests.filter((q) => q.time > 50);
      dispatch(
        quickTestsPageSlice.actions.updateQuickTestPage({
          data: items ? items : [],
        })
      );
    } else {
      if (searchTest) {
        if (!authUser.access_token) {
          return dispatch(
            alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
          );
        }
        const data = {
          page: page ? Number(page) : 1,
          limitPageSearch: LIMIT_TEST_PAGE_SEARCH,
          searchTest,
        };
        quickTestPageAction.getQuickTestsSearch(
          data,
          authUser.access_token,
          dispatch
        );
      } else {
        handleGetQuickTestsNow();
      }
    }
  };

  const handleDeleteQuickTest = (quickTest: IQuickTest) => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    if (window.confirm("Are you sure you want to delete")) {
      quickTestAction.deleteQuickTest(
        quickTest,
        authUser.access_token,
        dispatch
      );
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col justify-between">
          <h1 className="font-bold text-[30px] my-2">Manager Tests</h1>

          {/* Sort / Filter / Sort */}
          <div className="flex gap-3 lg:flex-row md:flex-col sm:flex-col flex-col border-2 p-2 my-2">
            <div className="flex flex-col gap-2">
              {/* Search */}
              <div className="inline-block">
                <form action="" onSubmit={handleSubmitSearch}>
                  <input
                    className="outline-none border-2 rounded-lg p-1"
                    type="text"
                    name="searchTest"
                    value={searchTest}
                    onChange={handleChangeInputSearchTest}
                  />
                  <button
                    type="submit"
                    className="rounded-lg transition hover:bg-sky-500 hover:text-white font-bold p-2"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="">
                <button
                  className={`border-2 rounded-lg p-2 hover:bg-sky-500 transition`}
                  onClick={handleDeleteMultipleTest}
                >
                  DeleteAll
                </button>
              </div>
            </div>

            {/* Sort */}
            <div className="">
              <h1 className="font-bold">Sort: </h1>
              <select name="sort" id="" onChange={(e) => handleSortPage(e)}>
                <option value="">Sort</option>
                <option value="titleTest">Title (a -&gt; z)</option>
                <option value="category">Category</option>
                <option value="accessModifier">Access Modifier</option>
              </select>
            </div>

            {/* Filter */}
            <div className="">
              <h1 className="font-bold">Filter: </h1>
              <div className="flex flex-col gap-2 border-2 p-2">
                <select
                  name="filterAccessModifier"
                  id=""
                  onChange={(e) => handleChangeFilterAccessModifier(e)}
                >
                  <option value="">Access Modifier</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                <select
                  name="filterTime"
                  id=""
                  onChange={(e) => handleChangeFilterTime(e)}
                >
                  <option value="">Time</option>
                  <option value="biggerTime"> {">"} 50p</option>
                  <option value="lessTime"> {"<"} 50p</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 hover:bg-sky-500 transition cursor-pointer"
                    onClick={() => handleSelectedAll()}
                  >
                    Select
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ID Quick Test
                  </th>
                  <th scope="col" className="py-3 px-6">
                    User
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Access Modifier
                  </th>
                  <th scope="col" className="py-3 px-6 flex gap-3">
                    <span className="sr-only">Delete</span>
                    <span className="sr-only">Detail</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {quickTestsPage &&
                  quickTestsPage.data?.map((quickTest, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-6 ">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChangeSelected(e, quickTest)}
                            checked={checkedTests.includes(
                              quickTest._id ? quickTest._id : ""
                            )}
                          />
                        </td>
                        <td className="py-4 px-6 ">{quickTest._id}</td>
                        <td className="py-4 px-6">
                          {(quickTest.user as IUser).account}
                        </td>
                        <td className="py-4 px-6">{quickTest.titleTest}</td>
                        <td className="py-4 px-6">
                          {(quickTest.category as ICategory).name}
                        </td>
                        <td className="py-4 px-6">{quickTest.time}</td>
                        <td className="py-4 px-6">Public</td>
                        <td className="py-4 px-6 text-right flex gap-3">
                          <div
                            onClick={() => handleDeleteQuickTest(quickTest)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <Pagination totalPages={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default ManagerTest;
