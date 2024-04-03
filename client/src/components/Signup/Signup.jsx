import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { useSignupMutation } from "../../redux/queries/service";

const Signup = () => {
  const [signupMutation, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onUpload = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram_qwasar");
    data.append("cloud_name", "devhabeeb");

    fetch("https://api.cloudinary.com/v1_1/devhabeeb/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInput((prev) => {
          return { ...prev, pic: data.url };
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  
  const handleSubmit = useCallback(() => {
    signupMutation(userInput)
      .unwrap()
      .then((response) => {
        notification.success({ message: "signup successful" });
        navigate("/login");
      })
      .catch((err) => {
        setUserInput((prev) => {
          return { ...prev, name: "", email: "", password: "", pic: "" };
        });
        notification.error({ message: "error creating account" });
      });
  },[signupMutation, userInput, navigate]);

  useEffect(() => {
    if (userInput.pic) {
      handleSubmit();
    }
  }, [userInput.pic, handleSubmit]);
  return (
    <div className="w-[90%] max-w-[500px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-20">
        <form onSubmit={handleImageUpload} className="w-full text-center">
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
            <div className="w-[80%] mx-auto mt-2 md:flex">
              <div className="custom-file-input md:basis-[50%] mr-3 flex">
                <label
                  htmlFor="image"
                  className="bg-blue-400 rounded-md hover:bg-blue-500"
                >
                  Upload pic
                </label>
                <input type="file" id="image" onChange={onUpload} />
              </div>
              <input
                type="text"
                value={image.name}
                className="w-full py-2 mx-auto border-b-2 focus:border-b-orange-500 focus:outline-0"
                disabled
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-10 py-2 mb-5 rounded-md hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "SIGNUP"}
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
