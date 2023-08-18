import React from "react";
import { AiFillHeart } from "react-icons/ai";

const PostCard = ({ author, url, title }) => {
  return (
    <figure className="w-full max-w-[400px] mx-auto mb-5 border-[1px] rounded-md shadow-lg">
      <h2 className="p-2 text-lg">{author}</h2>
      <div className="w-full">
        <img src={url} alt="figure images" className="w-full" />
      </div>
      <div className="p-4 text-slate-500 text-sm">
        <div className="w-full flex my-2">
          <button className="text-xl">
            <AiFillHeart className="text-red-500" />
          </button>
        </div>
        <h4>Title</h4>
        <figcaption>{title}</figcaption>
        <form className="w-full py-2 my-2">
          <input
            type="text"
            placeholder="add a comment"
            className="w-full py-2 focus:outline-0 border-b-[1px] border-slate-500"
          />
        </form>
      </div>
    </figure>
  );
};

export default PostCard;
