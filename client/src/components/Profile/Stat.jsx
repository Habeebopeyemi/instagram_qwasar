import React from "react";

const Stat = ({ value, title }) => {
  return (
    <p className="text-start mr-3 flex">
      <span className="text-black mr-[0.25rem]">{value}</span>
      <span className="text-slate-500">{title}</span>
    </p>
  );
};

export default Stat;
