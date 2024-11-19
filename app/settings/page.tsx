"use client";

import { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Page = () => {
  const [isAcChecked, setIsAcChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const acState = Cookies.get("acChecked");
    if (acState !== undefined) {
      setIsAcChecked(acState === "true");
    }
    setIsLoading(false);
  }, []);

  const handleSaveSettings = () => {
    Cookies.set("acChecked", isAcChecked.toString(), { expires: 365 });
    console.log("Setting saved", isAcChecked);
    toast.success(`${isAcChecked ? "AC ON" : "AC OFF"} saved`);
  };

  return (
    <div className="flex flex-col mt-24 items-center h-fit">
      <div className="flex justify-center items-center mb-3 gap-1 text-xl font-semibold">
        <MdSettings className="h-6 w-6" />
        <h2>Settings</h2>
      </div>
      <div className="py-4 px-3 rounded-lg gap-1 flex flex-col justify-center w-full items-center bg-slate-700 max-w-sm">
        <h3 className="text-sm text-slate-300">
          For team <span className="font-semibold">Parivartan</span> only
        </h3>
        <div className="flex w-full items-center gap-2 mt-4">
          <label
            htmlFor="ac"
            className="text-lg font-semibold w-1/2 text-center"
          >
            AC:
          </label>
          <div className="checkbox-wrapper w-1/2 flex justify-center">
            <input
              type="checkbox"
              id="ac"
              className="tgl tgl-ios hidden"
              checked={isAcChecked}
              onChange={() => setIsAcChecked(!isAcChecked)}
              disabled={isLoading}
            />
            <label
              htmlFor="ac"
              className="tgl-btn block relative w-16 h-8"
            ></label>
          </div>
        </div>
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full mt-4 font-semibold"
          onClick={handleSaveSettings}
          disabled={isLoading}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Page;
