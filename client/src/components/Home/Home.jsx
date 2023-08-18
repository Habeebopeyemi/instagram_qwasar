import React from "react";
import { posts } from "../../data";
import PostCard from "./PostCard";

const Home = () => {
  return (
    <section className="w-full mt-5">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          author={post.postedBy}
          url={post.url}
          title={post.title}
        />
      ))}
    </section>
  );
};

export default Home;
