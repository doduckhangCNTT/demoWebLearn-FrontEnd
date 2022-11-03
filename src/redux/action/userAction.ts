import { patchApi } from "../../utils/FetchData";
import {
  AppDispatch,
  IPayloadResetPass,
  IPayloadResetPass_noCf,
  IUserProfile,
} from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { checkTokenExp } from "../../utils/CheckTokenExp";
import { checkPassword } from "../../utils/Valid";
import uploadImgAction from "./uploadImgAction";
import { IAuth } from "../types/authType";

const userAction = {
  updateSignCmpUser: async (
    name: string,
    user: IUserProfile | any,
    token: string,
    dispatch: AppDispatch,
    authUser?: IAuth
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      if (!user[`${name}`])
        return dispatch(alertSlice.actions.alertAdd({ error: "Empty value" }));

      if (name === "avatar") {
        uploadImgAction.uploadImg(
          user[`${name}`],
          access_token,
          dispatch,
          authUser
        );

        dispatch(alertSlice.actions.alertAdd({ loading: false }));
      } else {
        const res = await patchApi(
          `update_oneComponent_user`,
          { name, user },
          access_token
        );
        if (!res.data.success) {
          return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
        }
        dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
      }
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  resetPassword: async (
    payload: IPayloadResetPass,
    token: string,
    dispatch: AppDispatch
  ) => {
    const { password, cf_password } = payload;
    if (!password || !cf_password)
      return dispatch(
        alertSlice.actions.alertAdd({
          error: "Password or cf_password is empty",
        })
      );

    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    const checkPass_Cf = checkPassword(password, cf_password);

    if (checkPass_Cf)
      dispatch(alertSlice.actions.alertAdd({ error: checkPass_Cf }));

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await patchApi("reset_password", { password }, access_token);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  resetPassword_noCf: async (
    payload: IPayloadResetPass_noCf,
    token: string,
    dispatch: AppDispatch
  ) => {
    const { password } = payload;
    if (!password)
      return dispatch(
        alertSlice.actions.alertAdd({
          error: "Password is empty",
        })
      );

    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    const checkPass_Cf = checkPassword(password, password);

    if (checkPass_Cf)
      dispatch(alertSlice.actions.alertAdd({ error: checkPass_Cf }));

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await patchApi("reset_password", { password }, access_token);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default userAction;
