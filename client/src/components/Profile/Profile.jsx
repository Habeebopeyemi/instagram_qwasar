import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Stat from "./Stat";
// import CustomName from "./CustomName";
import Friends from "./Friends";
import { useMypostsQuery } from "../../redux/queries/service";

const Profile = () => {
  const { data, isLoading } = useMypostsQuery();
  return (
    <>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <section className="w-full max-w-[1000px] mx-auto">
          <div className="w-full max-w-[500px] mt-10 mx-auto sm:max-w-[90%] sm:flex md:max-w-[1000px] border-b-[1px] border-black">
            <div className="w-full basis-[50%]">
              <div className="w-[150px] h-[150px] mx-auto mb-5">
                <img
                  src="https://i.pinimg.com/originals/e2/43/c0/e243c0f7b9ee95151d2f2c045367047c.jpg"
                  alt="refimage"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="w-full p-3">
              {/* username */}
              <div className="w-full mb-5 flex justify-between">
                <h1 className="text-md mt-2">
                  {data?.posts[0]?.postedBy.name}
                </h1>
                <div>
                  <button className="flex">
                    <span className="py-[0.25rem] px-2 mr-3 border-[1px] border-slate-400 rounded-md hover:bg-blue-400 hover:text-white">
                      Edit Profile
                    </span>
                    <FiSettings className="mt-[5px] text-xl" />
                  </button>
                </div>
              </div>
              <p>{data?.posts[0]?.postedBy.email}</p>
              {/* statistics */}
              <div className="w-full flex mb-5">
                <Stat value={data?.posts?.length} title="posts" />
                <Stat
                  value={data?.posts[0]?.postedBy.followers?.length}
                  title="followers"
                />
                <Stat
                  value={data?.posts[0]?.postedBy.following?.length}
                  title="following"
                />
              </div>
              {/* full name */}

              {/* <div className="w-full mb-3 sm:flex">
            <p className="my-[2px] mr-3">
              {firstname
                ? firstname.split("").map((ch, chIndex) => {
                    return <CustomName char={ch} key={chIndex} />;
                  })
                : null}
            </p>
            <p className="my-[2px]">
              <>
                {lastname
                  ? lastname.split("").map((ch, chIndex) => {
                      return (
                        <>
                          <CustomName char={ch} key={chIndex} />
                        </>
                      );
                    })
                  : null}
              </>
              <sup className="m-2">TM</sup>
            </p>
          </div> */}
              {/* company and website */}
              {/* <div>
            <h4>Founder of CNQ</h4>
            <a
              href="http://www.thisispoise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-[500]"
            >
              www.thisispoise.com
            </a>
          </div> */}
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

export default Profile;
