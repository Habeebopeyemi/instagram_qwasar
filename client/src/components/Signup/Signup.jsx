import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-[90%] max-w-[500px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-20">
        <form className="w-full text-center">
          <h4 className="logo text-[1.8rem] my-5">Instagram</h4>
          <div className="w-full mb-5">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
            />
            <input
              type="text"
              name="email"
              placeholder="password"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
            />
          </div>
          <button className="bg-blue-400 text-white px-10 py-2 mb-5 rounded-md hover:bg-blue-500">
            SIGNUP
          </button>
          <Link to={"/login"}>
            <p className="text-lg mb-5">Already have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
