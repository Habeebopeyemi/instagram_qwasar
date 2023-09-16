import React, { useState, useEffect } from "react";
import { notification } from "antd";
import Stat from "./Stat";
import Friends from "./Friends";
import {
  useMypostsQuery,
  useUpdatePictureMutation,
} from "../../redux/queries/service";

const Profile = () => {
  const [image, setImage] = useState("");
  const [update, setUpdate] = useState(false);
  const { data, isLoading, refetch } = useMypostsQuery();
  const [updateProfilePic] = useUpdatePictureMutation();

  const handleProfileImageUpdate = () => {
    setUpdate(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram_qwasar");
    data.append("cloud_name", "devhabeeb");

    fetch("https://api.cloudinary.com/v1_1/devhabeeb/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //  api call to backend
        handlePicUpdate(data.url);
      })
      .catch((err) => {
        setUpdate(false);
        throw new Error(err);
      });
  };
  const handlePicUpdate = (url) => {
    updateProfilePic({ pic: url })
      .unwrap()
      .then((res) => {
        refetch();
        setUpdate(false);
        notification["success"]({
          message: "Successfully updated profile picture",
        });
      })
      .catch((err) => {
        setUpdate(false);
        notification.error({
          message: "Error: profile picture update not successful",
        });
      });
  };
  const updatePic = (file) => {
    setImage(file);
  };
  useEffect(() => {
    if (image) {
      handleProfileImageUpdate();
    }
  }, [image]);
  return (
    <>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <section className="w-full max-w-[1000px] mx-auto">
          <div className="w-full max-w-[500px] mt-10 mx-auto sm:max-w-[90%] sm:flex md:max-w-[1000px] border-b-[1px] border-black">
            <div className="w-full basis-[50%] flex flex-col justify-center">
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
              <div className="custom-file-input md:basis-[50%] mr-3 flex">
                <label
                  htmlFor="image"
                  className="bg-blue-400 rounded-md hover:bg-blue-500 mx-auto mb-2"
                >
                  {update ? "Updating..." : "Update pic"}
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => updatePic(e.target.files[0])}
                />
              </div>
            </div>
            <div className="w-full p-3">
              {/* username */}
              <div className="w-full mb-3 flex justify-between">
                <h1 className="text-[2rem] logo mt-2">{data?.user?.name}</h1>
              </div>
              <p>{data?.user?.email}</p>
              {/* statistics */}
              <div className="w-full flex mb-5">
                <Stat value={data?.posts?.length} title="posts" />
                <Stat
                  value={data?.user ? data?.user?.followers?.length : 0}
                  title="followers"
                />
                <Stat
                  value={data?.user ? data?.user?.following?.length : 0}
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
