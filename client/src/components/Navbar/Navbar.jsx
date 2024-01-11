import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import List from "./List";
import { header_info } from "../../data";
import useWindowSize from "../../hooks/hooks";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const size = useWindowSize();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    if (size.width > 768) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [size.width]);

  return (
    <header className="w-full bg-[hsla(0,0%,100%,1)]">
      <nav className="w-full md:flex justify-between shadow-lg">
        <div className="flex justify-between md:basis-[10%]">
          <Link to={token ? "/" : "/login"}>
            <p className="p-2 text-[2rem] logo hover:cursor-pointer">
              Instagram
            </p>
          </Link>
          <div
            className="p-2 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <RxHamburgerMenu className="text-xl mt-3" />
          </div>
        </div>
        {open ? (
          <div
            className={
              "md:flex justify-end md:basis-[90%] lg:basis-[68%] xl:basis-[55%]"
            }
          >
            <ul
              className={
                "basis-[75%] p-2 md:p-0 md:flex md:my-0 justify-end smax:basis-[60%]"
              }
            >
              {header_info.map((info) => {
                if (info.text === "Login" || info.text === "Signup") {
                  return (
                    <List
                      key={info.id}
                      text={info.text}
                      location={info.location}
                      visibility={token ? false : true}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {header_info.map((info) => {
                if (
                  info.text === "Profile" ||
                  info.text === "Create Post" ||
                  info.text === "Feeds"
                ) {
                  return (
                    <List
                      key={info.id}
                      text={info.text}
                      location={info.location}
                      visibility={token ? true : false}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {token ? (
                <button
                  className="hover:text-white text-lg hover:bg-red-500 p-2 md:pb-4 md:basis-[50%] lg:basis-[23%] smax:basis-[22%] bg-white text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : null}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
