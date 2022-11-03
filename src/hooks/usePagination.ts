import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCustomRouter from "./useCustomRouter";

const usePagination = (totalPages: number) => {
  const [firstArr, setFirstArr] = useState<number[]>([]);
  const [lastArr, setLastArr] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState("");
  const { pushQuery } = useCustomRouter();
  const { search } = useLocation();

  useEffect(() => {
    const valuePage = new URLSearchParams(search).get("page");
    const valueSort = new URLSearchParams(search).get("sort");

    if (valuePage) {
      setPage(parseInt(valuePage, 10) || 1);
    }
    if (valueSort) {
      setSort(valueSort);
    }
  }, [search]);

  useEffect(() => {
    // Chuyen doi totalPages thanh 1 mang s
    const newArr = [...Array(totalPages ? totalPages : 1)]?.map(
      (_, i) => i + 1
    );
    if (totalPages <= 4) {
      return setFirstArr(newArr);
    }

    if (totalPages - page >= 3) {
      setFirstArr(newArr.slice(page - 1, page + 2));
      setLastArr(newArr.slice(totalPages - 1));
    } else {
      setFirstArr(newArr.slice(totalPages - 4, totalPages));
      setLastArr([]);
    }
  }, [page, totalPages]);

  function nextPage() {
    const newPage = Math.min(page + 1, totalPages);
    pushQuery(newPage, sort);
  }

  function prevPage() {
    const newPage = Math.max(page - 1, 1);
    pushQuery(newPage, sort);
  }

  function jumpPage(page: number) {
    const newPage = Math.max(1, page);
    pushQuery(newPage, sort);
  }

  return { page, firstArr, lastArr, nextPage, prevPage, jumpPage };
};

export default usePagination;
