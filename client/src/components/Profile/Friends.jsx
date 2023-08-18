import React from "react";

const Friends = ({ url, name }) => {
  return (
    <div className="w-[40%] max-w-[120px] text-center">
      <div className="w-[100px] h-[100px] mx-auto mb-3">
        <img src={url} alt="friends" className="w-full h-full rounded-full" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default Friends;
