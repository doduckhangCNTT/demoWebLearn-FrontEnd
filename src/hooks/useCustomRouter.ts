import { useLocation, useNavigate } from "react-router-dom";

type TTime = {
  requestTime: string;
  timeNumber: number;
};
interface PageSortType {
  page: number;
  sort: string;
  time: string;
}

const useCustomRouter = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const pushQuery = (page: number, sort?: string, time?: TTime) => {
    const query = {} as PageSortType;
    if (page) query.page = page;
    if (sort) query.sort = sort;
    if (time?.requestTime && time.timeNumber)
      query.time = String(time.timeNumber).concat(" ", `${time.requestTime}`);

    const newQuery = new URLSearchParams(query as any).toString();
    navigate(`${pathname}?${newQuery}`);
  };

  return { pathname, search, pushQuery };
};

export default useCustomRouter;
