import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import {
  useAllpostsQuery,
  useLikepostMutation,
  useUnlikepostMutation,
} from "../../redux/queries/service";

const Home = () => {
  const { data, isLoading, refetch } = useAllpostsQuery();
  console.log(data?.posts);
  const [likePost] = useLikepostMutation();
  const [unlikePost] = useUnlikepostMutation();

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
  return (
    <section className="w-full mt-5 flex gap-4 justify-center flex-wrap">
      {data?.posts.map((post) => (
        <PostCard
          key={post._id}
          author={post.postedBy}
          url={post.photo}
          title={post.title}
          body={post.body}
          likes={post.likes}
          postId={post._id}
          likePost={handlePostLike}
          unlikePost={handlePostUnlike}
        />
      ))}
    </section>
  );
};

export default Home;
