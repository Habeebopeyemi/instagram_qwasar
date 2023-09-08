import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
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
  comments,
  onChange,
  handleComment,
  text,
  postedBy,
  deletePost,
}) => {
  const user = sessionStorage.getItem("user");
  return (
    <figure className="w-full max-w-[400px] mb-4 border-[1px] rounded-md shadow-lg">
      <h2 className="p-2 text-lg logo flex justify-between">
        <Link to={user === postedBy ? "/profile" : `/profile/${postedBy}`}>
          <span>{author?.name}</span>
        </Link>
        {user === postedBy && (
          <span
            className="mt-[.3rem] hover:text-red-500"
            onClick={() => deletePost(postId)}
          >
            {<AiFillDelete />}
          </span>
        )}
      </h2>
      <div className="w-full h-[225px]">
        <img src={url} alt="figure images" className="w-full h-full" />
      </div>
      <div className="p-4 text-slate-500 text-sm">
        <div className="w-full flex my-2 gap-2">
          <button className="text-xl" onClick={() => likePost(postId)}>
            <AiFillHeart className={likes.length > 0 ? "text-red-500" : ""} />
          </button>
          <button className="text-xl" onClick={() => likePost(postId)}>
            <HiThumbUp className={likes.length > 0 ? "text-blue-500" : ""} />
          </button>
          <button className="text-xl" onClick={() => unlikePost(postId)}>
            <HiThumbDown className="" />
          </button>
        </div>
        <h4 className="text-black text-lg">{title}</h4>
        <p>{likes?.length > 0 ? likes.length : 0} likes</p>
        <figcaption className="text-md text-black">{body}</figcaption>
        {comments.map((comment) => (
          <p key={comment._id} className="text-sm italic">
            <span className="text-black mr-2 not-italic font-bold">
              {comment.postedBy.name}
            </span>
            {comment.text}
          </p>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleComment(postId);
          }}
          className="w-full py-2 my-2"
        >
          <input
            type="text"
            value={text}
            onChange={onChange}
            placeholder="add a comment"
            className="w-full py-2 focus:outline-0 border-b-[1px] border-slate-500"
          />
        </form>
      </div>
    </figure>
  );
};

export default PostCard;
