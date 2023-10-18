"use client";

import React from "react";
import { RiShieldKeyholeLine } from "react-icons/ri";

type Props = {};

const AlertForDelete = (props: Props) => {
  return (
    <div className="fixed flex justify-center items-center bg-gray-600/20 min-w-full min-h-full top-0 z-0">
      <div className="bg-slate-700 p-4 m-4 rounded-lg flex flex-col w-full max-w-sm shadow-[0px_0px_15px_2px] shadow-teal-300">
        <h1 className="font-semibold text-lg flex items-center gap-2">
          Enter Admin Key <RiShieldKeyholeLine className="w-5 h-5" />
        </h1>
        <input
          type="text"
          className="p-2 my-2 rounded-lg outline-none text-black"
        />
        <div className="flex gap-2 w-full">
          <button className="border-1 border-white border rounded-lg w-1/2">
            Cancel
          </button>
          <button className="btn-primary w-1/2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AlertForDelete;
