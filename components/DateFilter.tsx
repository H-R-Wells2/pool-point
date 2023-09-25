"use client";

import { fetchResultsByDate } from "@/lib/actions/result.actions";
import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = ["2023-09-23", "2023-09-24"];

type Props = {
  uniqueDates: string[];
  // handleDateClick: (selectedDate: string) => void;
  selected: string;
};

const DateFilter = ({ uniqueDates, selected }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const current = new URLSearchParams(searchParams);

    const value = event.target.value.trim();

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

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
      <select
        value={selected}
        onChange={onSelect}
        className="px-4 py-1 mb-3 md:w-52 w-40 self-end justify-center border-2 border-teal-300 rounded-lg flex items-center gap-1 bg-transparent outline-none"
      >
      <option value="" className={`border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 transition-all duration-300 ease-in-out animate-dropdown md:w-52 w-40`}>None</option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className={`border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 transition-all duration-300 ease-in-out animate-dropdown md:w-52 w-40`}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
