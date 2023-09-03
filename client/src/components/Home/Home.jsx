import React from "react";
import { posts } from "../../data";
import PostCard from "./PostCard";
import { useAllpostsQuery } from "../../redux/queries/service";

const Home = () => {
  const { data, isLoading } = useAllpostsQuery();
  console.log(data?.posts);
  return (
    <section className="w-full mt-5 flex gap-4 justify-center flex-wrap">
      {data?.posts.map((post) => (
        <PostCard
          key={post._id}
          author={post.postedBy}
          url={post.photo}
          title={post.title}
          body={post.body}
        />
      ))}
    </section>
  );
};

export default Home;
