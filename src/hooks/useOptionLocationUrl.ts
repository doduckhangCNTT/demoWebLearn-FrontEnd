import { useLocation } from "react-router-dom";

const useOptionLocationUrl = () => {
  const location = useLocation();

  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get("page");
  const sort = urlParams.get("sort");
  const time = urlParams.get("time");

  return { page, sort, time };
};

export default useOptionLocationUrl;
