import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import actionAuth from "../../redux/action/actionAuth";
import { authSelector } from "../../redux/selector/selectors";
import { FormSubmit, InputChangedEvent } from "../../utils/Typescript";
import SocialLogin from "./SocialLogin";

export default function LoginPass() {
  const accessPagePaths = {
    register: {
      path: "/register",
      name: "Đăng ký",
    },
    forgotLogin: {
      path: "/forgot_password",
      name: "Forgot your password?",
    },
    loginSms: {
      path: "/login_sms",
      name: "Login with SMS",
    },
  };

  const initialState = {
    account: "",
    password: "",
  };
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);

  const handleInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (authUser.access_token) {
      navigate("/");
    }
  }, [authUser.access_token, navigate]);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    actionAuth.loginAction(user, dispatch);
    // setUser(initialState);
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </Link>
            </p>
          </div>

          <SocialLogin />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="account"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleInput}
                />
              </div>

              <div className="">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <div className="hover:text-cyan-400">
                  <Link to={`${accessPagePaths.loginSms.path}`}>
                    {`${accessPagePaths.loginSms.name}`}
                  </Link>
                </div>

                <div>
                  <Link
                    to={`${accessPagePaths.forgotLogin.path}`}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {`${accessPagePaths.forgotLogin.name}`}
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-black group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>

            <div className="text-center">
              Bạn chưa có tài khoản?
              <Link
                to={`${accessPagePaths.register.path}`}
                className="hover:decoration-sky-500"
              >
                {`${accessPagePaths.register.name}`}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
