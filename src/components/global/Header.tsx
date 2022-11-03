import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import {
  authSelector,
  toggleNavbarSelector,
} from "../../redux/selector/selectors";
import { useDispatch, useSelector } from "react-redux";
import actionAuth from "../../redux/action/actionAuth";
import LazyLoadingImg from "../LazyLoadingImg/LazyLoadingImg";
import Information from "../../pages/option/Information";
import { toggleNavbarSlice } from "../../redux/reducers/toggleNavbarSlice";
import Search from "./Search";

const accessPage = [
  {
    path: "login",
    name: "Login",
  },
  { path: "register", name: "Register" },
];

const listInfoOfUser = {
  profileUser: {
    name: "Your profile",
    path: "/your_profile",
  },
  settingUser: {
    name: "Setting",
    path: "/your_setting",
  },
  chats: {
    name: "Chats",
    path: "/chats",
  },
  quickTest: {
    name: "Quick Test",
    path: "/quick_test",
  },
  createCourse: {
    name: "Create Course",
    path: "/create_course",
  },
  createCategory: {
    name: "Create Category",
    path: "/create_category",
  },
  createBlog: {
    name: "Create Blog",
    path: "/create_blog",
  },
  yourBlog: {
    name: "Your Blog",
    path: "/your_blogs",
  },
  saveBlog: {
    name: "Save Blog",
    path: "/save_blogs",
  },
  signOut: {
    name: "Sign out",
  },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { authUser } = useSelector(authSelector);
  const { toggleNavbar } = useSelector(toggleNavbarSelector);

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!authUser.access_token) return;
    actionAuth.logoutAction(authUser.access_token, dispatch);
  };

  const handleToggleNavbar = () => {
    dispatch(
      toggleNavbarSlice.actions.changeToggleNavbar({
        statusNavbar: !toggleNavbar.statusNavbar,
      })
    );
  };

  return (
    <div className="relative h-[50px]">
      <Disclosure as="nav" className="shadow-md fixed z-10 bg-white w-full">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16 ">
                <div className="inset-y-0 left-0 flex items-center">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    onClick={handleToggleNavbar}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="flex">
                      <LazyLoadingImg
                        url="https://media.istockphoto.com/photos/graduation-hat-and-diploma-cartoon-style-with-clouds-on-abstract-3d-picture-id1338320564?s=612x612"
                        alt="Logo"
                        className="hidden lg:block h-8  w-auto"
                      />
                      <h1 className="md:block sm:hidden xs:hidden font-semibold ml-5 text-[25px] ">
                        LEARNING CODE
                      </h1>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  {/* Manager */}
                  {authUser.user && authUser.user.role === "admin" ? (
                    <div className="p-2 bg-sky-500 rounded-lg hover:text-white hover:opacity-80">
                      <Link to="/manager" className="font-bold rounded-lg">
                        Manager
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Search */}
                  <div className="rounded-full relative">
                    <Search />
                  </div>

                  <div>
                    {authUser.user ? (
                      <>
                        <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                          {/* Icon Information */}
                          <Information />

                          {/* Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <LazyLoadingImg
                                  url={`${authUser.user?.avatar}`}
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {/* Your Profile */}
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`${listInfoOfUser.profileUser.path}`}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {listInfoOfUser.profileUser.name}
                                    </Link>
                                  )}
                                </Menu.Item>

                                {/* Setting */}
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`${listInfoOfUser.settingUser.path}`}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {listInfoOfUser.settingUser.name}
                                    </Link>
                                  )}
                                </Menu.Item>

                                {/* Chats */}
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`${listInfoOfUser.chats.path}`}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {listInfoOfUser.chats.name}
                                    </Link>
                                  )}
                                </Menu.Item>

                                {/* Create Categories and Quick test */}
                                {authUser.user.role === "admin" ? (
                                  <div className="border-t-2">
                                    {/* Categories */}
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={
                                            listInfoOfUser.createCategory.path
                                          }
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {listInfoOfUser.createCategory.name}
                                        </Link>
                                      )}
                                    </Menu.Item>

                                    {/* Quick Test */}
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={listInfoOfUser.quickTest.path}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {listInfoOfUser.quickTest.name}
                                        </Link>
                                      )}
                                    </Menu.Item>

                                    {/* Create Course */}
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={listInfoOfUser.createCourse.path}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {listInfoOfUser.createCourse.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {/* Create Blogs */}
                                <div className="border-t-2">
                                  {authUser.user ? (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={listInfoOfUser.createBlog.path}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {listInfoOfUser.createBlog.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ) : (
                                    ""
                                  )}
                                  {/* Your Blogs */}
                                  {authUser.user ? (
                                    <div>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Link
                                            to={listInfoOfUser.yourBlog.path}
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {listInfoOfUser.yourBlog.name}
                                          </Link>
                                        )}
                                      </Menu.Item>

                                      {/* Saved blog */}
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Link
                                            to={listInfoOfUser.saveBlog.path}
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {listInfoOfUser.saveBlog.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                {/* Sign out */}
                                <div className="border-t-2">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={handleLogout}
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 w-full flex justify-items-start"
                                            : "",
                                          "flex justify-items-start px-4 py-2 text-sm text-gray-700 w-full"
                                        )}
                                      >
                                        {listInfoOfUser.signOut.name}
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-3">
                        {accessPage.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              to={`${item.path}`}
                              className="rounded-full"
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    </div>
  );
}
