import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Stat from "./Stat";
import CustomName from "./CustomName";
import { stat_data } from "../../data";

const Profile = () => {
  const [lastname, setLastName] = useState("suleiman");
  const [firstname, setFirstName] = useState("habeeb");
  return (
    <section className="w-full max-w-[500px] mt-10 mx-auto sm:max-w-[90%] sm:flex md:max-w-[1000px]">
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
          <h1 className="text-md mt-2">mukeshphulwani66</h1>
          <div>
            <button className="flex">
              <span className="py-[0.25rem] px-2 mr-3 border-[1px] border-slate-400 rounded-md hover:bg-blue-400 hover:text-white">
                Edit Profile
              </span>
              <FiSettings className="mt-[5px] text-xl" />
            </button>
          </div>
        </div>
        {/* statistics */}

        <div className="w-full flex mb-5">
          {stat_data.map((data) => {
            return <Stat key={data.id} value={data.value} title={data.title} />;
          })}
        </div>
        {/* full name */}

        <div className="w-full mb-3 sm:flex">
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
        </div>
        {/* company and website */}
        <div>
          <h4>Founder of CNQ</h4>
          <a
            href="http://www.thisispoise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-[500]"
          >
            www.thisispoise.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
