import { getApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IUserLogin, IUserRegister } from "../../utils/Typescript";
import { validPhone, validRegister } from "../../utils/Valid";
import { alertSlice } from "../reducers/alertSlice";
import { authSlice } from "../reducers/authSlice";
import { checkTokenExp } from "../../utils/CheckTokenExp";

const actionAuth = {
  registerAction: async (
    userRegister: IUserRegister,
    dispatch: AppDispatch
  ) => {
    const check = validRegister(userRegister);
    if (check.errLength > 0) {
      return dispatch(alertSlice.actions.alertAdd({ error: check.errMsg }));
    }

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("register", userRegister);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  loginAction: async (userLogin: IUserLogin, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await postApi("login", userLogin);

      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      dispatch(authSlice.actions.authUser(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
      localStorage.setItem("logged", "true");
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  logoutAction: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      localStorage.removeItem("logged");
      const res = await getApi("logout", access_token);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      window.location.href = "/";
      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  refreshAction: async (dispatch: AppDispatch) => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") return;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("refresh_token");
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      dispatch(authSlice.actions.authUser(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  googleAction: async (token: string, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("google_login", { token });
      if (!res.data.success)
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));

      dispatch(authSlice.actions.authUser(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
      localStorage.setItem("logged", "true");
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  facebookAction: async (payload: object, dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("facebook_login", payload);
      if (!res.data.success)
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));

      dispatch(authSlice.actions.authUser(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
      localStorage.setItem("logged", "true");
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  loginSmsAction: async (phone: string, dispatch: AppDispatch) => {
    const check = validPhone(phone);
    if (!check) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid phone number" })
      );
    }
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("login_sms", { phone });
      if (!res.data.valid) {
        verifySms(phone, dispatch);
      }
      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export const verifySms = async (phone: string, dispatch: AppDispatch) => {
  const code = prompt("Verify your code");
  if (!code) return;

  try {
    dispatch(alertSlice.actions.alertAdd({ loading: true }));

    const res = await postApi("verify_sms", { phone, code });
    if (!res.data.success)
      return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));

    dispatch(authSlice.actions.authUser(res.data));

    dispatch(alertSlice.actions.alertAdd({ loading: false }));
    localStorage.setItem("logged", "true");
  } catch (error: any) {
    dispatch(alertSlice.actions.alertAdd({ error: error.message }));
  }
};

export const forgotPassword = async (
  account: string,
  dispatch: AppDispatch
) => {
  console.log({ account });

  try {
    dispatch(alertSlice.actions.alertAdd({ loading: true }));

    const res = await postApi("forgot_password", { account });
    if (!res.data.success)
      return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));

    // dispatch(authSlice.actions.authUser(res.data));

    dispatch(alertSlice.actions.alertAdd({ loading: false }));
  } catch (error: any) {
    dispatch(alertSlice.actions.alertAdd({ error: error.message }));
  }
};

export default actionAuth;
