import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";

const PostCard = ({
  postId,
  author,
  url,
  title,
  body,
  likes,
  likePost,
  unlikePost,
}) => {
  return (
    <figure className="w-full max-w-[400px] mb-4 border-[1px] rounded-md shadow-lg">
      <h2 className="p-2 text-lg">{author?.name}</h2>
      <div className="w-full h-[225px]">
        <img src={url} alt="figure images" className="w-full h-full" />
      </div>
      <div className="p-4 text-slate-500 text-sm">
        <div className="w-full flex my-2 gap-2">
          <button className="text-xl">
            <AiFillHeart className={likes.length > 0 ? "text-red-500" : ""} />
          </button>
          <button className="text-xl" onClick={() => likePost(postId)}>
            <HiThumbUp className="" />
          </button>
          <button className="text-xl" onClick={() => unlikePost(postId)}>
            <HiThumbDown className="" />
          </button>
        </div>
        <h4>{title}</h4>
        <p>{likes?.length > 0 ? likes.length : 0}</p>
        <figcaption>{body}</figcaption>
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
