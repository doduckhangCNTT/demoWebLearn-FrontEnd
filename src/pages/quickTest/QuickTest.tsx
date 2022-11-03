import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import categoryAction from "../../redux/action/categoryAction";
import quickTestAction from "../../redux/action/quickTestAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { idQuickTestSlice } from "../../redux/reducers/quickTest/IdQuickTestNow";
import { getApi } from "../../utils/FetchData";
import AnswerQuestion from "./answer/AnswerQuestion";
import NavbarQuickTest from "./navbar/NavbarQuickTest";
import ShowQuestions from "./ShowQuestions";
import {
  authSelector,
  categorySelector,
  quickTestNowSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import {
  InputChangedEvent,
  IQuickTest,
  IQuestion,
  IUser,
  IQuestionNow,
} from "../../utils/Typescript";
import { useParams } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";

const QuickTest = () => {
  const initialState = {
    titleTest: "",
    category: "",
    time: 0,
    description: "",
    image: {
      public_id: "",
      url: "",
    },
    numberOfTimes: 1,
    questions: [] as IQuestion[],
    createdAt: new Date().toISOString(),
  };

  const clearQuickTest = {
    titleTest: "",
    category: "",
    time: 0,
    description: "",
    image: {
      public_id: "",
      url: "",
    },
    numberOfTimes: 1,
  };
  const [quickTest, setQuickTest] = useState<IQuickTest>(initialState);
  const [questionNow, setQuestionNow] = useState<IQuestionNow>();
  const { id } = useParams();

  const { categories } = useSelector(categorySelector);
  const { authUser } = useSelector(authSelector);
  const { quickTests } = useSelector(quickTestsSelector);
  const { quickTestNow } = useSelector(quickTestNowSelector);
  const dispatch = useDispatch();

  // Lay question voi id tuong ung
  const handleGetQuestion = useCallback(async () => {
    if (id) {
      const res = await getApi(
        `quickTest/question/${id}`,
        authUser.access_token
      );
      setQuestionNow(res.data.question);
    }
  }, [authUser.access_token, id]);

  useEffect(() => {
    handleGetQuestion();
  }, [handleGetQuestion]);

  // Lay toan bo Category
  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  // Lay toan bo quickTests
  useEffect(() => {
    if (!authUser.access_token) {
      dispatch(alertSlice.actions.alertAdd({ error: "Invalid access token" }));
    } else {
      quickTestAction.getQuickTests(authUser.access_token, dispatch);
    }
  }, [authUser.access_token, dispatch]);

  // Lay ra 1 quickTest co id tuong ung
  useEffect(() => {
    const handleQuickTestNow = async () => {
      if (quickTestNow.id) {
        const res = await getApi(
          `quickTest/${quickTestNow.id}`,
          authUser.access_token
        );
        // console.log("Quick Test simple: ", res.data);
        setQuickTest(res.data.quickTest);
      }
    };
    handleQuickTestNow();
  }, [authUser.access_token, quickTestNow.id]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setQuickTest({ ...quickTest, [name]: value });
  };

  const handleChangeQuickTest = (e: InputChangedEvent) => {
    const { value } = e.target;
    if (value === "") setQuickTest(clearQuickTest);
    dispatch(idQuickTestSlice.actions.createIdQuickTestNow({ id: value }));
  };

  const handleInputFile = (e: InputChangedEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setQuickTest({ ...quickTest, image: { public_id: "", url: file } });
    }
  };

  const handleAddQuickTest = async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid access token" })
      );
    }
    let maxNumberOfTimes = 0;
    quickTests.forEach((qt) => {
      if (
        qt.category === quickTest.category &&
        (qt.user as IUser)?._id === authUser.user?._id
      ) {
        if (maxNumberOfTimes < qt.numberOfTimes) {
          maxNumberOfTimes = qt.numberOfTimes;
        }
      }
    });
    const newQuickTest = {
      ...quickTest,
      numberOfTimes: maxNumberOfTimes + 1,
    };

    await quickTestAction.createQuickTest(
      newQuickTest,
      authUser.access_token,
      dispatch
    );
    setQuickTest(clearQuickTest);

    await quickTestAction.getQuickTests(authUser.access_token, dispatch);
    maxNumberOfTimes = 0;
  };

  const handleEdit_QuickTest = async () => {};

  const handleAddNewQuickTest = () => {
    dispatch(idQuickTestSlice.actions.updateEmptyIdQuickTestNow({ id: "" }));
    setQuickTest(clearQuickTest);
  };

  const handleSubmit_QuickTest = () => {
    handleAddQuickTest();
  };

  return (
    <div className="">
      {/* Navbar */}
      <NavbarQuickTest />

      <div className="flex gap-2">
        {/* Content */}
        <div className="w-2/3 shadow-md mt-5 p-2">
          <div className="">
            <h1 className="font-bold text-[30px] mx-auto">
              Create Question form quickTest
            </h1>

            <div className="flex justify-between">
              <select
                className="w-[300px] border-2"
                name="quickTest"
                onChange={handleChangeQuickTest}
              >
                <option value="">Choose a quick Test</option>
                {quickTests?.map((quickTest) => (
                  <option
                    key={quickTest._id}
                    value={quickTest._id}
                    className=""
                  >
                    {quickTest.titleTest}
                    --
                    {quickTest.createdAt
                      ? moment(quickTest.createdAt).fromNow().toString()
                      : ""}
                  </option>
                ))}
              </select>

              {quickTestNow.id ? (
                <button
                  onClick={handleAddNewQuickTest}
                  className="border-2 hover:bg-sky-500 hover:text-white p-1 transition"
                >
                  Add new a QuickTest
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-3">
            <form className="flex flex-col gap-3" action="">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Title</h1>
                <input
                  className={`outline-0 p-2 border-2 w-full`}
                  type="text"
                  name="titleTest"
                  value={quickTest.titleTest}
                  onChange={handleChangeInput}
                />
              </div>

              {/* Category of quickTest */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px] my-3">Categories</h1>
                <select
                  className="w-[200px] border-2"
                  name="category"
                  // value={quickTest.category}
                  onChange={handleChangeInput}
                >
                  <option value="">Choose a category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-2 ">
                <h1 className="font-bold text-[20px]">Time</h1>
                <div className="flex gap-2 items-center">
                  <input
                    className={`outline-0 p-2 border-2 w-full`}
                    type="text"
                    name="time"
                    value={quickTest.time}
                    onChange={handleChangeInput}
                  />
                  <span className="">minutes</span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Description</h1>
                <textarea
                  className={`outline-0 p-2 border-2 w-full`}
                  id=""
                  name="description"
                  value={quickTest.description}
                  onChange={handleChangeInput}
                  // defaultValue="At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies."
                />
              </div>

              {/* Image */}
              <div className="">
                <h1 className="font-bold text-[20px]">Image</h1>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputFile}
                />
                {typeof quickTest.image.url === "string" ? (
                  <img
                    src={quickTest.image.url}
                    alt=""
                    className="w-full max-h-[200px] object-cover rounded-lg"
                  />
                ) : (
                  <LazyLoadingImg
                    url={URL.createObjectURL(quickTest.image.url as Blob)}
                    alt=""
                    className="w-full max-h-[200px] object-cover rounded-lg"
                  />
                )}
              </div>
            </form>

            <div className="flex gap-2 justify-end mt-5">
              {quickTestNow.id ? (
                <button
                  onClick={handleEdit_QuickTest}
                  className="p-2 hover:bg-sky-500 hover:text-white border-2"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSubmit_QuickTest}
                  className="p-2 hover:bg-sky-500 hover:text-white border-2"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div className="mt-3">
            {/* Type Questions & Answers */}
            <AnswerQuestion
              quickTest={quickTest}
              questionNow={questionNow}
              setQuickTest={setQuickTest}
            />
          </div>
        </div>

        {/* Show Question */}
        <div className="w-1/3">
          <ShowQuestions />
        </div>
      </div>
    </div>
  );
};

export default QuickTest;
