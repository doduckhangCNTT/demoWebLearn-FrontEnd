import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleNavbarSelector } from "../../redux/selector/selectors";
import { listComponentOfNavbar } from "../icons/Icons";

const Navbar = () => {
  const { toggleNavbar } = useSelector(toggleNavbarSelector);

  return (
    <div
      className={`${toggleNavbar.statusNavbar ? "hidden" : "w-[80px]"}  z-10`}
    >
      <div className="h-full inline-block fixed bg-white shadow-lg">
        <div className="flex flex-col items-center text-center">
          {listComponentOfNavbar.map((item, index) => {
            return (
              <NavLink
                // style={({ isActive }) => {
                //   return { color: isActive ? "blue" : "black" };
                // }}
                className={({ isActive }) => {
                  return isActive
                    ? "mt-5 flex flex-col gap-y-1 items-center text-sky-600 transition"
                    : " mt-5 flex flex-col gap-y-1 items-center text-black hover:text-sky-600 transition";
                }}
                key={index}
                to={`${item.path}`}
                // className="mt-5 flex flex-col gap-y-1 items-center hover:text-sky-600 transition"
              >
                <div>{item.icon}</div>
                <div className="">{item.name}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
