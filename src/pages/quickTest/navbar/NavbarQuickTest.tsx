import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { quickTestIcons } from "../../../components/icons/Icons";
import { quickTestNowSelector } from "../../../redux/selector/selectors";

const NavbarQuickTest = () => {
  const { quickTestNow } = useSelector(quickTestNowSelector);

  return (
    <div className="flex justify-between shadow-md p-3">
      <div className="flex gap-2">
        <div className="h-full w-[50px]">
          <img
            src="https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
        <h1>Quick Test</h1>
      </div>

      {/* Setting and show  */}
      <div className="flex gap-3">
        {quickTestIcons.map((item, index) => {
          return (
            <div key={index} className="flex flex-col items-center">
              <Link to={`${item.path}/${quickTestNow.id}`}>
                <i className="hover:text-sky-500 cursor-pointer">{item.icon}</i>
              </Link>
              <small>{item.name}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarQuickTest;
