import React from "react";
import { NavLink } from "react-router-dom";

const List = ({ location, text }) => {
  return (
    <li className="mb-2 md:mb-0 md:basis-[25%] lg:basis-[23%] md:text-center smax:basis-[22%]">
      <NavLink
        to={location}
        className={({ isActive }) =>
          isActive
            ? "p-2 md:block h-[100%] md:p-4 border-b-2 border-orange-500 bg-slate-100"
            : "p-2 md:block h-[100%] md:p-4 hover:border-b-2 ease-in-out hover:bg-slate-100"
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default List;
