import React from "react";
import { useParams } from "react-router-dom";
import Stat from "./Stat";
import Friends from "./Friends";
import {
  useGetuserQuery,
  useFollowMutation,
  useUnfollowMutation,
} from "../../redux/queries/service";

const UserProfile = () => {
  const userId = useParams();
  const { data, isLoading, refetch } = useGetuserQuery(userId.userid);
  const [follow] = useFollowMutation();
  const [unFollow] = useUnfollowMutation();

  const handleFollow = (ID) => {
    follow({ followId: ID })
      .unwrap()
      .then((res) => {
        refetch();
        return res;
      })
      .catch((err) => err);
  };
  const handleUnfollow = (ID) => {
    unFollow({ followId: ID })
      .unwrap()
      .then((res) => {
        refetch();
        return res;
      })
      .catch((err) => err);
  };
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <section className="w-full max-w-[1000px] mx-auto">
          <div className="w-full max-w-[500px] mt-10 mx-auto sm:max-w-[90%] sm:flex md:max-w-[1000px] border-b-[1px] border-black">
            <div className="w-full basis-[50%]">
              <div className="w-[150px] h-[150px] mx-auto mb-5">
                <img
                  src={
                    data?.user?.pic
                      ? data?.user?.pic
                      : "https://cs12.pikabu.ru/post_img/big/2022/10/24/2/1666571824193118478.jpg"
                  }
                  alt="refimage"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="w-full p-3">
              {/* username */}
              <div className="w-full mb-3 flex justify-between">
                <h1 className="text-[2rem] logo mt-2">{data?.user?.name}</h1>
                <div></div>
              </div>
              <p>{data?.user?.email}</p>
              {/* statistics */}
              <div className="w-full flex mb-5">
                <Stat key={data.id} value={data?.posts?.length} title="posts" />
                <Stat
                  key={data.id}
                  value={data?.user?.followers?.length}
                  title="followers"
                />
                <Stat
                  key={data.id}
                  value={data?.user?.following?.length}
                  title="following"
                />
              </div>
              {/* full name */}

              <div className="w-full mb-3">
                <button
                  className="bg-blue-400 py-2 px-5 mr-3 text-sm rounded-md text-white hover:bg-blue-600 hover:cursor-pointer"
                  onClick={() => handleFollow(userId.userid)}
                >
                  FOLLOW
                </button>
                <button
                  className="bg-blue-400 py-2 px-5 text-sm rounded-md text-white hover:bg-blue-600 hover:cursor-pointer"
                  onClick={() => handleUnfollow(userId.userid)}
                >
                  UNFOLLOW
                </button>
              </div>
            </div>
          </div>
          {/* friends */}
          <div className="w-full p-3 mt-5 flex flex-wrap gap-2">
            {data?.posts
              ? data?.posts.map((post) => (
                  <Friends key={post._id} url={post.photo} name={post.title} />
                ))
              : null}
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfile;
