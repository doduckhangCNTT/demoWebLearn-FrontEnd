import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import FacebookLogin from "react-facebook-login";

import { useDispatch } from "react-redux";
import actionAuth from "../../redux/action/actionAuth";

type IGoogleSuccess = GoogleLoginResponse | GoogleLoginResponseOffline;

const SocialLogin = () => {
  const dispatch = useDispatch();

  const responseGoogle = async (res: IGoogleSuccess) => {
    if ("tokenId" in res) {
      const token = res.tokenId;
      actionAuth.googleAction(token, dispatch);
    }
  };

  const responseFacebook = (response: any) => {
    const { userID, accessToken } = response;
    actionAuth.facebookAction({ userID, accessToken }, dispatch);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full text-center">
        <GoogleLogin
          clientId="678877852433-1chho6h1ug1klnl4d997imitl8lssk1k.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="w-full"
        />
      </div>

      <div className="w-full text-center">
        <FacebookLogin
          appId="1199242690848047"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </div>
    </div>
  );
};

export default SocialLogin;
