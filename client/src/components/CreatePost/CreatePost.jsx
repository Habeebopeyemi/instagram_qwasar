import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useCreatepostMutation } from "../../redux/queries/service";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", body: "", pic_url: "" });
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [createpostMutation] = useCreatepostMutation();
  const onChange = (e) => {
    setPost((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const onUpload = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setPost((prev) => {
          return { ...prev, pic_url: data.url };
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  const onSubmit = () => {
    createpostMutation(post)
      .unwrap()
      .then((res) => {
        notification.success({ message: "post creation successful" });
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        notification.error({ message: "Error creating post" });
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (post.pic_url) {
      onSubmit();
    }
  }, [post.pic_url]);
  return (
    <div className="w-[90%] max-w-[600px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-10">
        <form className="w-full text-center" onSubmit={handleImageUpload}>
          <h4 className="logo text-[1.8rem] my-5">Instagram</h4>
          <div className="w-full mb-5">
            <input
              type="text"
              name="title"
              minLength={3}
              placeholder="title"
              className="w-[80%] py-2 mx-auto mb-5 border-b-2 focus:border-b-orange-500 focus:outline-0"
              value={post.title}
              onChange={onChange}
            />
            <input
              type="text"
              name="body"
              minLength={3}
              placeholder="body"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
              value={post.body}
              onChange={onChange}
            />
            <div className="w-[80%] mx-auto mt-2 md:flex">
              <div className="custom-file-input md:basis-[50%] mr-3 flex">
                <label
                  htmlFor="image"
                  className="bg-blue-400 rounded-md hover:bg-blue-500"
                >
                  Upload Image
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
          <button className="bg-blue-400 text-white px-10 py-3 mt-5 rounded-md hover:bg-blue-500">
            {isLoading ? "Loading..." : "SUBMIT POST"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
