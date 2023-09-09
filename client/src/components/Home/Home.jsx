import React, { useState } from "react";
import PostCard from "./PostCard";
import { notification } from "antd";

import {
  useAllpostsQuery,
  useLikepostMutation,
  useUnlikepostMutation,
  useCommentMutation,
  useDeletepostMutation,
} from "../../redux/queries/service";

const Home = () => {
  const [text, setText] = useState("");
  const { data, isLoading, refetch } = useAllpostsQuery();
  const [likePost] = useLikepostMutation();
  const [unlikePost] = useUnlikepostMutation();
  const [comment] = useCommentMutation();
  const [deletePost] = useDeletepostMutation();
  const handlePostLike = (postId) => {
    likePost({ postId })
      .unwrap()
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log("error liking post");
      });
  };
  const handlePostUnlike = (postId) => {
    unlikePost({ postId })
      .unwrap()
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log("error unliking post");
      });
  };
  const handleComment = (postId) => {
    let payload = { text: text, postId: postId };
    comment(payload)
      .unwrap()
      .then((res) => {
        setText("");
        refetch();
      })
      .catch((err) => console.log(err));
  };
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const handleDeletePost = (postId) => {
    deletePost(postId)
      .unwrap()
      .then((res) => {
        notification.success({ message: "post deleted successfully" });
        refetch();
      })
      .catch((err) =>
        notification.error({ message: "Error: fail to delete post" })
      );
  };
  return (
    <>
      {isLoading ? (
        "Loading....."
      ) : (
        <section className="w-full mt-5 flex gap-4 justify-center flex-wrap">
          {data?.posts.length > 0 ? (
            data?.posts.map((post) => (
              <PostCard
                key={post._id}
                author={post.postedBy}
                url={post.photo}
                title={post.title}
                body={post.body}
                likes={post.likes}
                postId={post._id}
                postedBy={post.postedBy._id}
                likePost={handlePostLike}
                unlikePost={handlePostUnlike}
                comments={post.comments}
                handleComment={handleComment}
                onChange={onChange}
                text={text}
                deletePost={handleDeletePost}
              />
            ))
          ) : (
            <div className="text-center mt-[10rem]">
              <h2 className="text-[2rem] logo">Welcome!!!</h2>
              <p>You don't have a post currently, kindly create a post</p>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
