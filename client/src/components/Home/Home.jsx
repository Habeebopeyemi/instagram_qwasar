import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import {
  useAllpostsQuery,
  useLikepostMutation,
  useUnlikepostMutation,
  useCommentMutation,
} from "../../redux/queries/service";

const Home = () => {
  const [text, setText] = useState("");
  const { data, isLoading, refetch } = useAllpostsQuery();
  console.log(data);
  const [likePost] = useLikepostMutation();
  const [unlikePost] = useUnlikepostMutation();
  const [comment] = useCommentMutation();

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
          postedBy={post.postedBy._id}
          likePost={handlePostLike}
          unlikePost={handlePostUnlike}
          comments={post.comments}
          handleComment={handleComment}
          onChange={onChange}
          text={text}
        />
      ))}
    </section>
  );
};

export default Home;
