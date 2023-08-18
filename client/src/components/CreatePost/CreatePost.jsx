import React from "react";

const CreatePost = () => {
  return (
    <div className="w-[90%] max-w-[600px] mx-auto my-10 rounded-md shadow-lg border-[1px]">
      <div className="w-full my-10">
        <form className="w-full text-center">
          <h4 className="logo text-[1.8rem] my-5">Instagram</h4>
          <div className="w-full mb-5">
            <input
              type="text"
              name="title"
              placeholder="title"
              className="w-[80%] py-2 mx-auto mb-5 border-b-2 focus:border-b-orange-500 focus:outline-0"
            />
            <input
              type="text"
              name="body"
              placeholder="body"
              className="w-[80%] py-2 mx-auto mb-3 border-b-2 focus:border-b-orange-500 focus:outline-0"
            />
            <div className="w-[80%] mx-auto mt-2 md:flex">
              <div className="custom-file-input md:basis-[50%] mr-3 flex">
                <label
                  for="image"
                  className="bg-blue-400 rounded-md hover:bg-blue-500"
                >
                  Upload Image
                </label>
                <input type="file" id="image" />
              </div>
              <input
                type="text"
                name="url"
                className="w-full py-2 mx-auto border-b-2 focus:border-b-orange-500 focus:outline-0"
              />
            </div>
          </div>
          <button className="bg-blue-400 text-white px-10 py-3 mt-5 rounded-md hover:bg-blue-500">
            SUBMIT POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
