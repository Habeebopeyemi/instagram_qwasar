import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useSigninMutation } from "../../redux/queries/service";

const Login = () => {
  const navigate = useNavigate();
  const [signinMutation, { isLoading }] = useSigninMutation();
  const [userInput, setUserInput] = useState({
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
    signinMutation(userInput)
      .unwrap()
      .then((response) => {
        sessionStorage.setItem("token", response.token);
        notification.success({ message: "login successful" });
        navigate("/home");
      })
      .catch((err) => {
        setUserInput((prev) => {
          return { ...prev, name: "", email: "", password: "" };
        });
        notification.error({ message: "error: check login credentials" });
      });
  };
  return (
    <div className="w-[90%] max-w-[500px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-20">
        <form onSubmit={handleSubmit} className="w-full text-center">
          <h4 className="logo text-[1.8rem] my-5">Instagram</h4>
          <div className="w-full mb-5">
            <input
              type="email"
              name="email"
              placeholder="email"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              onChange={onChange}
            />
          </div>
          <button
            disabled={isLoading}
            className="bg-blue-400 text-white px-10 py-2 mb-5 rounded-md hover:bg-blue-500"
          >
            {isLoading ? "Loading..." : "LOGIN"}
          </button>
          <Link to={"/signup"}>
            <p className="text-lg mb-5">Dont't have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
