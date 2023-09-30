"use client";


import { useResultContext } from "@/context/resultContext";
import { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

type Props = {};

const SortFilter = (props: Props) => {
  const [, , , , sortByRank, setSortByRank] = useResultContext();

  const [visibility, setVisibility] = useState("hidden");
  const [iconRotate, setIconRotate] = useState("");

  const toggleVisibility = () => {
    if (visibility === "hidden") {
      setVisibility("flex");
      setIconRotate("-rotate-180");
    } else {
      setVisibility("hidden");
      setIconRotate("");
    }
  };

  const onSortByRank = () => {
    setSortByRank(true);
    toggleVisibility();
  };

  return (
    <div className="mx-6 flex flex-col justify-end">
      <button
        onClick={toggleVisibility}
        className="py-1 mb-3 md:w-52 w-32 self-end justify-center border-2 border-teal-300 rounded-lg flex items-center gap-1"
      >
        {sortByRank ? "Rank" : "Default"}
        <span
          className={`duration-300 transition-all ease-in-out ${iconRotate}`}
        >
          <MdOutlineArrowDropDownCircle className="w-5 h-5" />
        </span>
      </button>

      <div
        className={` md:w-52 w-32 flex-col self-end border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 transition-all duration-300 ease-in-out animate-dropdown ${visibility}`}
      >
        <p className="text-xs text-center">Sort players by:</p>
        <button onClick={()=>{setSortByRank(false);toggleVisibility();}} className="border-b border-teal-300">Default</button>
        <button onClick={onSortByRank} className="border-b border-teal-300">Rank</button>
      </div>
    </div>
  );
};

export default SortFilter;
