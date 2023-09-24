"use client";

import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

type Props = {
  uniqueDates: string[];
  // handleDateClick: (selectedDate: string) => void;
};

const DateFilter = ({ uniqueDates }: Props) => {
  // console.log(uniqueDates);
  const [dates, setDates] = useState(uniqueDates);

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

  return (
    <div className="mx-6 flex flex-col justify-end">
      <button
        onClick={toggleVisibility}
        className="px-4 py-1 mb-3 w-2/5 self-end justify-center border-2 border-teal-300 rounded-lg flex items-center gap-1"
      >
        Dates
        <span
          className={`duration-300 transition-all ease-in-out ${iconRotate}`}
        >
          <MdOutlineArrowDropDownCircle className="w-5 h-5" />
        </span>
      </button>
      <div
        className={`flex-col self-end border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 transition-all duration-300 ease-in-out animate-dropdown ${visibility}`}
      >
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => {}}
            className="border-b border-teal-300 "
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
