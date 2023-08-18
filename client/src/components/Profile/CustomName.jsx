import React from "react";

const CustomName = ({ char }) => {
  return (
    <span className="inline-block w-[25px] h-[25px] rounded-full text-center border-2 border-black">
      {char}
    </span>
  );
};

export default CustomName;
