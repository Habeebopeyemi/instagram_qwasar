import React from "react";
import { NavLink } from "react-router-dom";

const List = ({ location, text }) => {
  return (
    <li className="mb-2 md:mb-0 md:basis-[33%] md:text-center">
      <NavLink
        to={location}
        className={({ isActive, isPending }) =>
          isActive
            ? "md:block h-[100%] p-2 border-b-2 border-orange-500 bg-slate-100"
            : "md:block h-[100%] p-2 hover:border-b-2 hover:border-orange-500 ease-in-out hover:bg-slate-100"
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default List;
