import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi, patchApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IQuestion, IQuickTest } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { quickTestSlice } from "../reducers/quickTest/quickTestSlice";
import { idQuickTestSlice } from "../reducers/quickTest/IdQuickTestNow";

interface IValue {
  newQuestion: IQuestion;
  idQuestionNow?: string;
}

const quickTestAction = {
  createQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      // Upload img
      let formData = new FormData();
      formData.append("file", quickTest.image.url);
      const resImg = await postApi("upload", formData, access_token);
      const data = { public_id: resImg.data.public_id, url: resImg.data.url };

      const newQuickTest = { ...quickTest, image: data };
      const res = await postApi("quickTest", newQuickTest, access_token);
      // console.log("Create QuickTest: ", res.data);

      // Cập nhật id hiện tại của quick test
      const id_TestNow = res.data.newQuickTest._id;
      dispatch(
        idQuickTestSlice.actions.createIdQuickTestNow({ id: id_TestNow })
      );

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));

      // dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getQuickTests: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const resQuickTests = await getApi("quickTests", access_token);
      // console.log("Quick Tests: ", resQuickTests);
      if (resQuickTests.data) {
        dispatch(quickTestSlice.actions.createQuickTests(resQuickTests.data));
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      // console.log("Quick test: ", quickTest);

      await patchApi(
        `quickTest/${quickTest?.idQuickTest}`,
        { quickTest },
        access_token
      );
      // console.log("Res Update test: ", res.data);

      dispatch(
        quickTestSlice.actions.updateQuestionQuickTest({
          idQuickTest: quickTest.idQuickTest,
          quickTest,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateQuestion: async (
    value: IValue,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await patchApi(
        `quickTest/question/${value.idQuestionNow}`,
        { newQuestion: value.newQuestion },
        access_token
      );
      dispatch(quickTestSlice.actions.updateQuestion(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteQuestion: async (
    question: IQuestion,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(
        `quickTest/question/${question._id}`,
        access_token
      );
      dispatch(quickTestSlice.actions.deleteQuestion(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default quickTestAction;
