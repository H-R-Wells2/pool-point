"use client";


import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  uniqueDates: string[];
};

const DateFilter = ({ uniqueDates}: Props) => {
  const options = uniqueDates;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelectDate = (value: string) => {
    const current = new URLSearchParams(searchParams);

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);

    toggleVisibility();
  };


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
        className="px-4 py-1 mb-3 md:w-52 w-40 self-end justify-center border-2 border-teal-300 rounded-lg flex items-center gap-1"
      >
        Dates
        <span
          className={`duration-300 transition-all ease-in-out ${iconRotate}`}
        >
          <MdOutlineArrowDropDownCircle className="w-5 h-5" />
        </span>
      </button>

      <div
        className={` md:w-52 w-40 flex-col self-end border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 transition-all duration-300 ease-in-out animate-dropdown ${visibility}`}
      >
        {options.map((date) => (
          <button
            key={date}
            onClick={() => {
              onSelectDate(date);
            }}
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
