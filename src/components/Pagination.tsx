import React from "react";
import usePagination from "../hooks/usePagination";

interface IProps {
  totalPages: number;
}

const Pagination: React.FC<IProps> = ({ totalPages }) => {
  const { page, firstArr, lastArr, jumpPage, prevPage, nextPage } =
    usePagination(totalPages);

  // console.log({ page, firstArr, lastArr });

  return (
    <div className="mt-5 flex justify-end">
      <nav aria-label="Page navigation example">
        <ul className="flex -space-x-px">
          {/* Previous */}
          <li>
            <button
              onClick={() => prevPage()}
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>

          {/* number page */}
          <li>
            {firstArr.map((f, index) => {
              return (
                <button
                  key={index}
                  className={`py-2 px-3 ${
                    page === f ? "bg-sky-500 text-white" : ""
                  } leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => jumpPage(f)}
                >
                  {f}
                </button>
              );
            })}
          </li>

          {/* ...  */}
          {lastArr.length > 0 ? (
            <li>
              <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </div>
            </li>
          ) : (
            ""
          )}
          <li>
            {lastArr.map((l, index) => {
              return (
                <button
                  key={index}
                  className={`py-2 px-3 ${
                    page === l ? "bg-sky-500 text-white" : ""
                  } leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => jumpPage(l)}
                >
                  {l}
                </button>
              );
            })}
          </li>

          {/* Next */}
          <li>
            <button
              onClick={() => nextPage()}
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
