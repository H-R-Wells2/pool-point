"use client"


import React, {useState} from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

type Props = {};

const DateFilter = (props: Props) => {

    const [dates, setDates] = useState([
        "21 sept", "22 sept", "23 sept", "24 sept"
    ]);

    const [visibility, setVisibility] = useState('hidden');
    const [iconRotate, setIconRotate ] = useState('');
    const toggleVisibility = () => {
        if(visibility === "hidden"){
            setVisibility('');
            setIconRotate('-rotate-180');
        }
        else{
            setVisibility('hidden');
            setIconRotate('');
        }
    }

  return (
    <div className="mx-6 flex flex-col justify-end">
      <button onClick={toggleVisibility} className="px-4 py-1 mb-3 w-min max-w-min self-end border-2 border-teal-300 rounded-lg flex items-center gap-1">
        Dates
        <span className={`duration-300 transition-all ease-in-out ${iconRotate}`}>
          <MdOutlineArrowDropDownCircle className="w-5 h-5" />
        </span>
      </button>
      <div className={`flex flex-col self-end border-teal-300 border p-3 rounded-lg gap-2 absolute top-32 bg-gray-800 mr-2 transition-all duration-300 ease-in-out animate-dropdown ${visibility}`}>
        {dates.map((date)=>(
            <button className="border-b border-teal-300 ">
                {date}
            </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
