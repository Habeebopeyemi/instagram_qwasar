import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { useSignupMutation } from "../../redux/queries/service";

const Signup = () => {
  const [signupMutation, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation(userInput)
      .unwrap()
      .then((response) => {
        notification.success({ message: "signup successful" });
        navigate("/login");
      })
      .catch((err) => {
        setUserInput((prev) => {
          return { ...prev, name: "", email: "", password: "" };
        });
        notification.error({ message: "error creating account" });
      });
  };
  return (
    <div className="w-[90%] max-w-[500px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-20">
        <form onSubmit={handleSubmit} className="w-full text-center">
          <h4 className="logo text-[1.8rem] my-5">Instagram</h4>
          <div className="w-full mb-5">
            <input
              type="text"
              name="name"
              placeholder="full name"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              value={userInput.name}
              onChange={onChange}
              minLength={3}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              value={userInput.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              value={userInput.password}
              onChange={onChange}
              minLength={3}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-10 py-2 mb-5 rounded-md hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "SIGNUP"}
          </button>
          <Link to={"/"}>
            <p className="text-lg mb-5">Already have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
