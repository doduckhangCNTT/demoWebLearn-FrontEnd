import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import quickTestAction from "../../../redux/action/quickTestAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  quickTestsSelector,
} from "../../../redux/selector/selectors";
import FrameList from "../common/FrameList";

const QuickTestHome = () => {
  const { quickTests } = useSelector(quickTestsSelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token) {
      dispatch(alertSlice.actions.alertAdd({ error: "Invalid access token" }));
    } else {
      quickTestAction.getQuickTests(authUser.access_token, dispatch);
    }
  }, [authUser.access_token, dispatch]);

  return (
    <FrameList titleList="Quick Tests">
      <>
        {quickTests.map((quickTest, index) => {
          return (
            <Fragment key={index}>
              <div className="border-2 rounded-lg hover:shadow-md gap-3">
                <Link to={`/quick_test/show_previous/${quickTest._id}`}>
                  <div className="">
                    <img
                      src={quickTest.image.url as string}
                      alt=""
                      className="rounded-lg h-[250px] w-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h1 className="font-bold text-[20px] hover:text-sky-500">
                      {quickTest.titleTest}
                    </h1>
                  </div>
                </Link>
              </div>
            </Fragment>
          );
        })}
      </>
    </FrameList>
  );
};

export default QuickTestHome;
