import React from "react";
import { Outlet } from "react-router-dom";

const PagesCommon = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PagesCommon;
