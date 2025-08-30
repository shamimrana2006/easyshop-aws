import React from "react";
import { ClipLoader, ClockLoader } from "react-spinners";

const Loading = () => {
  const color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary");
  return (
    <div className="flex justify-center flex-col gap-2 items-center h-screen w-screen">
      <ClockLoader size={150} color={color.trim()} />
      <p className="mt-4 text-xl font-bold text-primary">Loading ...</p>
    </div>
  );
};

export default Loading;
