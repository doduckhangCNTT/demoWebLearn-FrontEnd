import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import {
  blogSelector,
  courseSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  IBlog,
  ICourses,
  InputChangedEvent,
  IQuickTest,
} from "../../utils/Typescript";

const Search = () => {
  const [toggleInputSearch, setToggleInputSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 800);

  const { blogs } = useSelector(blogSelector);
  const { courses } = useSelector(courseSelector);
  const { quickTests } = useSelector(quickTestsSelector);

  const [blogsSearch, setBlogsSearch] = useState<IBlog[]>([]);
  const [coursesSearch, setCoursesSearch] = useState<ICourses[]>([]);
  const [quickTestsSearch, setQuickTestsSearch] = useState<IQuickTest[]>([]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      const blogsValue = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().indexOf(debouncedSearch.toLowerCase()) !== -1
      );
      const coursesValue = courses.filter(
        (course) =>
          course.name.toLowerCase().indexOf(debouncedSearch.toLowerCase()) !==
          -1
      );
      const quickTestsValue = quickTests.filter(
        (quickTest) =>
          quickTest.titleTest
            .toLowerCase()
            .indexOf(debouncedSearch.toLowerCase()) !== -1
      );
      setBlogsSearch(blogsValue);
      setCoursesSearch(coursesValue);
      setQuickTestsSearch(quickTestsValue);
    } else {
      setBlogsSearch([]);
      setCoursesSearch([]);
      setQuickTestsSearch([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSubmitSearch = (e: FormSubmit) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <form
        action=""
        onSubmit={handleSubmitSearch}
        className="flex items-center md:w-[100px] sm:w-[50px] max-w-[25px] relative "
      >
        <div className="flex left-0 right-0 absolute bg-red-500">
          {toggleInputSearch ? (
            <div className="w-full ">
              <input
                type="text"
                placeholder="Search..."
                name="search"
                value={searchValue}
                onChange={handleChangeInput}
                className="outline-0 rounded-full p-2 absolute top-[20px] w-[300px] right-[-20px] border-2 z-30"
              />

              {debouncedSearch ? (
                <div className="relative top-[20px] z-10 w-full flex justify-center right-0">
                  <div className="z-10 w-[500px] mt-[50px] shadow-md border-2 bg-white absolute">
                    {/* Blogs Search Results */}
                    <div className="">
                      {blogsSearch.length > 0 && (
                        <div className="border-b-2 p-2">
                          <h1 className="font-mono text-[20px]">Blogs</h1>
                          <div className="flex flex-col gap-2">
                            {blogsSearch.map((b) => {
                              return (
                                <Link
                                  to={`/detail_blog/${b._id}`}
                                  key={b._id}
                                  className=""
                                >
                                  <div className="flex  gap-2 hover:bg-slate-100">
                                    <img
                                      src={b.thumbnail.url as string}
                                      alt=""
                                      className="rounded-full w-[35px] h-[35px] border-2 object-cover"
                                    />
                                    <h1 className="font-mono text-[20px]">
                                      {b.title}
                                    </h1>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Courses Search Results */}
                    <div className="">
                      {coursesSearch.length > 0 && (
                        <div className="border-b-2 p-2">
                          <h1 className="font-mono text-[20px]">Courses</h1>
                          <div className="flex flex-col gap-2">
                            {coursesSearch.map((c) => {
                              return (
                                <Link
                                  to={`course/${c?.name
                                    .replace(" ", "-")
                                    .toLowerCase()}/${c._id ? c._id : ""}`}
                                  className=""
                                  key={c._id}
                                >
                                  <div className="flex  gap-2 hover:bg-slate-100">
                                    <img
                                      src={c.thumbnail.url as string}
                                      alt=""
                                      className="rounded-full w-[35px] h-[35px] border-2 object-cover"
                                    />
                                    <h1 className="font-mono text-[20px]">
                                      {c.name}
                                    </h1>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* QuickTest Search Results */}
                    <div className="">
                      {quickTestsSearch.length > 0 && (
                        <div className="border-b-2 p-2">
                          <h1 className="font-mono text-[20px]">Quick Tests</h1>
                          <div className="flex flex-col gap-2">
                            {quickTestsSearch.map((q) => {
                              return (
                                <Link
                                  to={`/quick_test/show_previous/${q._id}`}
                                  className=""
                                  key={q._id}
                                >
                                  <div className="flex  gap-2 hover:bg-slate-100">
                                    <img
                                      src={q.image.url as string}
                                      alt=""
                                      className="rounded-full w-[35px] h-[35px] border-2 object-cover"
                                    />
                                    <h1 className="font-mono text-[20px]">
                                      {q.titleTest}
                                    </h1>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          onClick={() => setToggleInputSearch(!toggleInputSearch)}
          className="hover:bg-sky-600 hover:text-white rounded-full h-full transition p-3 "
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
