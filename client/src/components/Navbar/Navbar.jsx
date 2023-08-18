import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";
import { header_info } from "../../data";
import useWindowSize from "../../hooks/hooks";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const size = useWindowSize();
  useEffect(() => {
    if (size.width > 768) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [size.width > 768]);

  return (
    <header className="w-full bg-[hsla(0,0%,100%,1)]">
      <nav className="w-full md:flex justify-between shadow-lg">
        <div className="flex justify-between md:basis-[15%]">
          <p
            className="p-2 text-[2rem] logo hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Instagram
          </p>
          <div
            className="p-2 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <RxHamburgerMenu className="text-xl mt-3" />
          </div>
        </div>
        {open ? (
          <div className={"md:flex md:basis-[85%] justify-end"}>
            <ul
              className={
                "mr-2 p-2 md:p-0 basis-[40%] md:flex md:my-0 justify-between lg:basis-[30%] smax:basis-[25%]"
              }
            >
              {header_info.map((info) => {
                return (
                  <List
                    key={info.id}
                    text={info.text}
                    location={info.location}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
