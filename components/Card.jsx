import React from "react";

const Card = ({ id, title}) => {
  return (
    <div
      id={id}
      draggable
      className="px-4 py-5 bg-black1 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-[4px_8px_20px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center gap-4 w-full text-grey1">
          <p className="text-sm text-violet">
            #{id}
          </p>
          <p className="">
            {title}
          </p>
      </div>
    </div>
  );
};

export default Card;
