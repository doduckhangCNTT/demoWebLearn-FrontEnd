import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Quill from "../../../components/editor/ReactQuill";
import quickTestAction from "../../../redux/action/quickTestAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  quickTestNowSelector,
} from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import {
  InputChangedEvent,
  IQuestionNow,
  IQuickTest,
} from "../../../utils/Typescript";

interface Field {
  content: string;
}

interface IProps {
  quickTest: IQuickTest;
  questionNow?: IQuestionNow;
  setQuickTest: (quickTest: IQuickTest) => void;
}

const Answer: React.FC<IProps> = ({ quickTest, questionNow, setQuickTest }) => {
  const optionQuestion = [
    { type: "radio", name: "Radio" },
    { type: "checkbox", name: "CheckBox" },
  ];

  const [typeAnswer, setTypeAnswer] = useState("radio");
  const [answerCorrectly, setAnswerCorrectly] = useState("");
  const [formFields, setFormFields] = useState([{ content: "" }]);
  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const { authUser } = useSelector(authSelector);
  const { quickTestNow } = useSelector(quickTestNowSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    // const text = div.innerText as string;
    const text = body;
    setText(text);
  }, [body]);

  // Cap nhat gia tri tren form question
  useEffect(() => {
    if (
      (questionNow?.questions[0].typeQuestion,
      questionNow?.questions[0].correctly,
      questionNow?.questions[0].answers,
      questionNow?.questions[0].titleQuestion)
    ) {
      setTypeAnswer(questionNow.questions[0].typeQuestion);
      setAnswerCorrectly(questionNow.questions[0].correctly);
      setFormFields(questionNow.questions[0].answers);
      setBody(questionNow.questions[0].titleQuestion);
    }
  }, [questionNow?.questions]);

  const handleChangeInput_SelectType_Answer = (e: InputChangedEvent) => {
    const { value } = e.target;
    setTypeAnswer(value);
  };

  const handleChangeInput_AnswerCorrectly = (e: InputChangedEvent) => {
    const { value } = e.target;
    setAnswerCorrectly(value);
  };

  const handleFormChange = (event: any, index: number) => {
    let data: Field[] = [...formFields];
    const { name, value } = event.target;
    data[index][name as keyof typeof formFields[0]] = value;
    setFormFields(data);
  };

  const removeAnswer = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const addAnswer = () => {
    let object = {
      content: "",
    };
    setFormFields([...formFields, object]);
  };

  const clearQuestion = () => {
    setTypeAnswer("radio");
    setAnswerCorrectly("");
    setFormFields([{ content: "" }]);
    setBody("");
  };

  const handleSubmit_Form_Question = () => {
    const handleUploadQuestion = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }

      const res = await getApi(
        `quickTest/${quickTestNow.id}`,
        authUser.access_token
      );

      // Kiem tra xem questions trong quicktest tuong ung co gia tri ko
      const newQuickTest = {
        ...quickTest,
        questions: [
          ...res.data.quickTest.questions,
          {
            titleQuestion: text,
            typeQuestion: typeAnswer,
            answers: formFields,
            correctly: answerCorrectly,
          },
        ],
        idQuickTest: quickTestNow.id,
      };

      clearQuestion();

      quickTestAction.updateQuickTest(
        newQuickTest,
        authUser.access_token,
        dispatch
      );
    };

    handleUploadQuestion();
  };

  const handleSubmit_Form_Update_Question = () => {
    const handleUpdateQuestion = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }

      const newQuestion = {
        titleQuestion: text,
        typeQuestion: typeAnswer,
        answers: formFields,
        correctly: answerCorrectly,
      };

      clearQuestion();

      quickTestAction.updateQuestion(
        {
          newQuestion: newQuestion,
          idQuestionNow: questionNow?.questions[0]._id,
        },
        authUser.access_token,
        dispatch
      );
    };

    handleUpdateQuestion();
  };

  return (
    <div className="">
      {/* Title Question */}
      <div className="">
        <h1 className="">Title Question:</h1>
        <Quill body={body} setBody={setBody} />
      </div>

      <div
        className="hidden"
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* Type Question */}
      <form action="" className="mt-3">
        <select
          className="w-[200px] border-2"
          name="category"
          onChange={handleChangeInput_SelectType_Answer}
          value={typeAnswer}
        >
          <option value="">Choose a type Question</option>
          {optionQuestion.map((op, index) => {
            return (
              <option key={index} value={op.type}>
                {op.name}
              </option>
            );
          })}
        </select>
      </form>

      {/* Answers */}
      <form action="">
        {/* {formFields.answers?.map((form, index) => { */}
        {formFields?.map((form, index) => {
          return (
            <div key={index} className="flex justify-between gap-2 mt-5">
              <div className="flex gap-2 w-full">
                <span className="">
                  <input disabled checked type={typeAnswer} />
                </span>
                <div className="w-full">
                  <input
                    className=" outline-none border-2 w-full"
                    type="text"
                    name="content"
                    value={form.content}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={() => removeAnswer(index)}
                className="w-[20px] h-[20px] flex items-center justify-center p-3 font-bold hover:bg-sky-600 hover:rounded-full hover:text-white "
              >
                X
              </button>
            </div>
          );
        })}
      </form>

      {/* Answer correctly */}
      <div className="flex gap-2 mt-2">
        <h1 className="font-bold text-[20px]">Answer correctly: </h1>
        <input
          type="text"
          className="p-1 outline-none border-2"
          name="correctly"
          value={answerCorrectly}
          onChange={handleChangeInput_AnswerCorrectly}
        />
      </div>

      <button
        onClick={addAnswer}
        className="border-2 hover:bg-sky-500 hover:text-white mt-2 p-1"
      >
        Add Answer
      </button>

      <div className="flex gap-2 justify-end mt-5">
        {questionNow?.questions ? (
          <button
            onClick={handleSubmit_Form_Update_Question}
            className="p-2 hover:bg-sky-500 hover:text-white border-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSubmit_Form_Question}
            className="p-2 hover:bg-sky-500 hover:text-white border-2"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default Answer;
