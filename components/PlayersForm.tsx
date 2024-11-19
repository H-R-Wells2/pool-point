"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useResultContext } from "@/context/resultContext";
import { FaPlay } from "react-icons/fa";

interface FormProps {
  onSubmit: (names: string[]) => void;
}

const PlayersForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [names, setNames] = useState<string[]>(["", "", "", ""]);

  const [players2, setPlayers2] = useState("bg-gray-600");
  const [players3, setPlayers3] = useState("bg-gray-600");
  const [players4, setPlayers4] = useState("bg-gray-700");

  const handlePlayers2 = () => {
    setNames(["", ""]);
    setPlayers2("bg-gray-700");
    setPlayers3("bg-gray-600");
    setPlayers4("bg-gray-600");
  };
  const handlePlayers3 = () => {
    setNames(["", "", ""]);
    setPlayers2("bg-gray-600");
    setPlayers3("bg-gray-700");
    setPlayers4("bg-gray-600");
  };
  const handlePlayers4 = () => {
    setNames(["", "", "", ""]);
    setPlayers2("bg-gray-600");
    setPlayers3("bg-gray-600");
    setPlayers4("bg-gray-700");
  };

  const handleChange = (index: number, value: string) => {
    setNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      return newNames;
    });
  };

  const {
    setTimerSeconds,
  } = useResultContext();
  
  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const capitalizedNames = names.map(capitalizeFirstLetter);
    onSubmit(capitalizedNames);
    setTimerSeconds(0);
  };

  const renderInputs = () => {
    return names.map((name, index) => (
      <input
        key={index}
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(index, e.target.value)
        }
        placeholder={`Player ${index + 1}`}
        className="mb-2 p-2 rounded-lg outline-none text-black"
        required
        minLength={3}
        pattern="[A-Za-z0-9]+" 
        title="Only alphabets and numbers are allowed (no spaces)"
      />
    ));
  };

  return (
    <div className="flex flex-col w-fit justify-center items-center mt-16">
      <div className="flex w-full text-md rounded-t-lg overflow-hidden">
        <button onClick={handlePlayers4} className={`${players4} py-2 w-full`}>
          4 Players
        </button>
        <button
          onClick={handlePlayers3}
          className={`${players3} py-2 w-full border-x border-gray-700`}
        >
          3 Players
        </button>
        <button onClick={handlePlayers2} className={`${players2} py-2 w-full`}>
          2 Players
        </button>
      </div>
      <form
        className="flex flex-col justify-center items-center w-full bg-gray-700 px-3 py-5 rounded-b-lg"
        onSubmit={handleSubmit}
      >
        {renderInputs()}
        <button
          type="submit"
          className="btn-primary mt-4 flex justify-center items-center gap-2"
        >
          <FaPlay />Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayersForm;
