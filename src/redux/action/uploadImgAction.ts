import { checkTokenExp } from "../../utils/CheckTokenExp";
import { patchApi, postApi } from "../../utils/FetchData";
import { AppDispatch } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { authSlice } from "../reducers/authSlice";
import { IAuth } from "../types/authType";

const uploadImgAction = {
  uploadImg: async (
    file: string | File,
    token: string,
    dispatch: AppDispatch,
    authUser?: IAuth
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      let formData = new FormData();
      formData.append("file", file);

      const res = await postApi("upload", formData, access_token);
      const url = res.data.url;

      if (!authUser?.user)
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );

      dispatch(authSlice.actions.uploadImg({ ...authUser.user, avatar: url }));

      await patchApi("upload", { url }, access_token);

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default uploadImgAction;
