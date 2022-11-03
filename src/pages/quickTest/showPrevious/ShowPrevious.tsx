import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  statusCountDownSelector,
} from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import { IQuestion, IQuickTest } from "../../../utils/Typescript";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CountDownTimer from "./CountDownTimer";
import { countDownSlice } from "../../../redux/reducers/quickTest/countDownSlice";

const ShowPrevious = () => {
  const [quickTest, setQuickTest] = useState<IQuickTest>();
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [correctlyQuickTests, setCorrectlyQuickTests] = useState<IQuestion[]>(
    []
  );
  const { idQuickTest } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  // const [isDeadTime, setIsDeadTime] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const { authUser } = useSelector(authSelector);
  const { statusCountDown } = useSelector(statusCountDownSelector);
  const dispatch = useDispatch();

  // =========================================== Handle Get QuickTest with Id ========================================================
  const handleGetQuickTest = useCallback(async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const res = await getApi(`quickTest/${idQuickTest}`, authUser.access_token);

    setQuickTest(res.data.quickTest);
  }, [authUser.access_token, dispatch, idQuickTest]);

  useEffect(() => {
    handleGetQuickTest();
  }, [handleGetQuickTest]);

  let s = "";
  // =========================================== Initial array to results ========================================================
  const handleInitialValueOfResult = useCallback(() => {
    const emptyString = [] as string[];
    quickTest?.questions?.forEach((qt) => {
      emptyString.push("");
    });
    setResults(emptyString);
  }, [quickTest?.questions]);

  useEffect(() => {
    handleInitialValueOfResult();
  }, [handleInitialValueOfResult]);

  // =========================================== Handle String ========================================================
  const joinText = (str: string) => {
    const result = str?.split(/[,.\\s]/);
    const test = [] as string[];
    result.forEach((r) => test.push(r.trim()));

    return test.join("");
  };

  const sortText = (text: string) => {
    const str = joinText(text).split("");
    return str.sort().join("");
  };

  const handleReTakeQT = () => {
    setResults([]);
    setCorrectlyQuickTests([]);
    setIsSubmit(false);
    dispatch(
      countDownSlice.actions.updateStatusCountDown({
        status: !statusCountDown.status,
      })
    );
    window.location.reload();
    handleGetQuickTest();
  };

  // =========================================== Handle Change Input / Submit ========================================================
  const handleChangeInput = (props: any) => {
    const { e, quickTestOrder } = props as any;
    const { value } = e.target;
    /**
     * Kiem xem the input bấm vào là type:
     *    + CheckBox: thêm giá trị vào mảng result tại cái câu tương ứng
     *    + Radio: Thay thế giá trị ban đầu bằng kết quả mới
     *
     */
    if (e.target.type === "checkbox") {
      /**
       * - Kiểm tra đã có giá trị của câu tương ứng trong mảng result
       */
      if (results[quickTestOrder]) {
        const newString = [];
        /**
         * - Kiểm tra xem trong result của câu tương ứng thì đã tồn tại kết quả đã chọn hay chưa
         */
        const positionChar = results[quickTestOrder].indexOf(value.toString());
        if (positionChar !== -1) {
          /**
           * Xóa bỏ giá trị đã tồn tại trong result của câu tương ứng
           */
          for (var i = 0; i < results[quickTestOrder].length; i++) {
            if (results[quickTestOrder][i] !== value.toString()) {
              newString.push(results[quickTestOrder][i]);
            }
          }
          results[quickTestOrder] = newString.join("");
        } else {
          const test = results[quickTestOrder].concat(value.toString());
          results[quickTestOrder] = test;
        }
      } else {
        results[quickTestOrder] = value.toString();
      }
      const test = [...results];
      setResults(test);
      console.log("Result Checkbox: ", results);
    } else {
      s = value;
      results[quickTestOrder] = s;
      const test = [...results];
      setResults(test);
      console.log("Results: ", results);
    }
  };

  const checkAnswer = () => {
    // Check dap an
    if (quickTest?.questions) {
      for (var i = 0; i < Number(quickTest.questions.length); i++) {
        // console.log({
        //   join: joinText(quickTest.questions[i].correctly),
        //   re: results[i],
        // });
        if (
          sortText(joinText(quickTest.questions[i].correctly)) ===
          sortText(results[i])
        ) {
          correctlyQuickTests.push(quickTest.questions[i]);
        }
      }
    }

    const values = [...correctlyQuickTests];
    setCorrectlyQuickTests(values);
    // console.log("Correctly: ", correctlyQuickTests);
  };

  useEffect(() => {
    if (statusCountDown.status) {
      if (
        window.confirm("Time to take the quick test. You can watch answer this")
      ) {
        handleSubmit();
      }
    }

    return () => {
      console.log("UnMount");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCountDown]);

  const handleSubmit = () => {
    // e.preventDefault();
    openModal();
    checkAnswer();
    setIsSubmit(!isSubmit);
  };

  // =========================================== Show Dialog ========================================================
  const showDialogResult = () => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Results after the test
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted.
                    </p>

                    <div className="">
                      <h1 className="">
                        Total number of questions:{" "}
                        {quickTest?.questions?.length}{" "}
                      </h1>

                      <ul className="flex flex-col gap-2">
                        <li className="bg-green-500 text-white">
                          Number of correct answers:{" "}
                          {correctlyQuickTests.length}
                        </li>
                        <li className="bg-red-500 text-white">
                          Number of incorrect answers:{" "}
                          {Number(
                            quickTest?.questions?.length
                              ? quickTest?.questions.length -
                                  correctlyQuickTests.length
                              : 0
                          )}
                        </li>
                      </ul>
                      <p className="text-sm text-gray-500">
                        You can retake th quick test
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className="flex gap-2 lg:flex-row md:flex-col-reverse sm:flex-col-reverse flex-col-reverse lg:w-2/3 md:w-full sm:w-full w-full p-2 mx-auto">
      <div className="flex flex-col gap-2 lg:w-2/3 md:w-full sm:w-full w-full shadow-md p-3">
        {/* Title of quickTest  */}
        <div className="text-[30px] font-mono flex justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: quickTest?.titleTest ? quickTest.titleTest : "",
            }}
          />
        </div>

        {/* Show all questions of quickTest */}
        <div className="w-full">
          <form action="">
            {quickTest?.questions?.map((q, index) => {
              return (
                <div key={index} className="mt-2">
                  {/* Hiển thị số câu cho từng câu hỏi */}
                  <h1 className="text-[20px] flex gap-2">
                    <div className="">Cau {index + 1}:</div>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: q.titleQuestion,
                      }}
                    />
                  </h1>
                  {/* Hiển thị các câu trả lời cho mỗi câu hỏi */}
                  <div className="ml-[20px]">
                    {q.answers.map((a, i) => {
                      return (
                        <div key={i} className="flex gap-2">
                          <input
                            type={q.typeQuestion}
                            id={`${a.content}`}
                            name={`${q.titleQuestion}`}
                            value={i + 1}
                            onChange={(e) =>
                              handleChangeInput({
                                e,
                                quickTestOrder: index,
                              })
                            }
                            ref={inputRef}
                          />
                          <label
                            htmlFor={`${a.content}`}
                            className="text-[16px]"
                          >
                            {a.content}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="w-full flex justify-end mt-5">
              <div className="flex items-center justify-center">
                {isSubmit ? (
                  ""
                ) : (
                  <button
                    onClick={handleSubmit}
                    // onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Submit
                  </button>
                )}
                {showDialogResult()}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Control questions  */}
      <div className="lg:w-1/3 md:w-full sm:w-full w-full shadow-md p-2 sticky top-[60px] bg-white">
        <div className="">
          {quickTest && <CountDownTimer quickTest={quickTest} />}
        </div>

        <div>
          <h2 className="font-mono text-[20px]">Tat ca cac cau da lam</h2>
          <div className="lg:grid md:flex sm:flex flex gap-2 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5">
            {quickTest?.questions?.map((n, index) => {
              return (
                <div className="" key={n._id}>
                  {/* Kiem tra dap an khi da bam vao button Submit */}
                  {isSubmit ? (
                    <div className="">
                      {correctlyQuickTests.includes(n) ? (
                        <div
                          className="
                        w-[20px] h-[20px] 
                        p-3 border-2 rounded-full
                        flex items-center justify-center
                        bg-green-500 cursor-pointer"
                        >
                          {index + 1}
                        </div>
                      ) : (
                        <div
                          className="
                        w-[20px] h-[20px] 
                        p-3 border-2 rounded-full
                        flex items-center justify-center
                        bg-red-500 cursor-pointer"
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Kiểm tra khi chưa bấm vào nút Submit, và ghi nhận các câu đã làm và chưa làm
                    <div className="">
                      {results[index] === "" ? (
                        <div
                          className="
                        w-[20px] h-[20px] 
                        p-3 border-2 rounded-full
                        flex items-center justify-center
                        hover:opacity-60 cursor-pointer"
                        >
                          {index + 1}
                        </div>
                      ) : (
                        /**
                         * Nếu đã chọn đáp án thì đổi màu
                         */
                        <div
                          className="
                        w-[20px] h-[20px] 
                        p-3 border-2 rounded-full
                        flex items-center justify-center
                        bg-sky-500 hover:text-white cursor-pointer"
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {isSubmit ? (
            <button
              type="button"
              className="mt-[20px] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleReTakeQT}
            >
              Retake the Quick Test
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPrevious;
