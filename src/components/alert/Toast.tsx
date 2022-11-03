import React from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface IProps {
  title: string;
  body: string | string[];
}

const Toast = ({ title, body }: IProps) => {
  let toastValue = null;
  if (title === "success") {
    toastValue = toast.success(`${body}`);
  } else if (title === "error") {
    toastValue = toast.error(`${body}`);
  } else if (title === "loading") {
    toastValue = <Loading />;
  }

  return <div>{toastValue}</div>;
};

export default Toast;
