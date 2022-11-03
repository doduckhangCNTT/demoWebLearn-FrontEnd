import React from "react";
import { useSelector } from "react-redux";
import {
  quickTestNowSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import { IQuickTest } from "../../utils/Typescript";
import OptionQuestion from "../option/OptionQuestion";

const ShowTests = () => {
  const { quickTestNow } = useSelector(quickTestNowSelector);
  const { quickTests } = useSelector(quickTestsSelector);

  return (
    <div>
      <h1 className="font-bold text-[20px] ">Show Questions</h1>

      <div className="shadow-md p-2">
        {(quickTests as IQuickTest[]).map((q, index) => {
          if (q._id === quickTestNow.id) {
            return (
              <div key={index} className="">
                <div className="">
                  {q.questions?.map((question, i) => {
                    return (
                      <div
                        className="flex justify-between mt-2 hover:bg-slate-50 p-2"
                        key={i}
                      >
                        <div className="">
                          <span>Question {i + 1}: </span>
                          <div
                            className=""
                            dangerouslySetInnerHTML={{
                              __html: question.titleQuestion,
                            }}
                          />
                        </div>
                        <OptionQuestion
                          quickTest_OfQuestion={q}
                          question={question}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShowTests;
