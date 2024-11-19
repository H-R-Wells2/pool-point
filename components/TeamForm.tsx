"use client";

import React, { useState, FormEvent } from "react";
import { useResultContext } from "@/context/resultContext";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

interface TeamFormProps {
  onSubmit: (teams: { name: string; players: string[] }[]) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const [localTeamNames, setLocalTeamNames] = useState(["Team1", "Team2"]);
  const [localPlayerNames, setLocalPlayerNames] = useState([
    ["Rupesh", "Shubham"],
    ["Ravi", "Parshya"],
  ]);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);
  const [shuffling, setShuffling] = useState<boolean>(false);
  const { setTimerSeconds } = useResultContext();

  const handleTeamNameChange = (index: number, value: string) => {
    setLocalTeamNames((prevTeamNames) => {
      const updatedNames = [...prevTeamNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const handlePlayerNameChange = (
    teamIndex: number,
    playerIndex: number,
    value: string
  ) => {
    setLocalPlayerNames((prevPlayerNames) => {
      const updatedPlayers = [...prevPlayerNames];
      updatedPlayers[teamIndex][playerIndex] = value;
      return updatedPlayers;
    });
  };

  const shufflePlayers = () => {
    const allPlayerNames = [
      ...localPlayerNames[0],
      ...localPlayerNames[1],
    ].filter((name) => name);

    if (allPlayerNames.length < 4) {
      toast.error("Please enter names for all players.");
      return;
    }

    setShuffling(true); 

    let shuffleInterval: NodeJS.Timeout;

    shuffleInterval = setInterval(() => {
      const shuffledNames = allPlayerNames.sort(() => Math.random() - 0.5);

      const pairs = [];
      for (let i = 0; i < shuffledNames.length / 2; i++) {
        pairs.push([
          shuffledNames[i],
          shuffledNames[shuffledNames.length - 1 - i],
        ]);
      }

      setLocalPlayerNames([pairs[0], pairs[1]]);
    }, 100); 

    setTimeout(() => {
      clearInterval(shuffleInterval);
      const finalShuffledNames = allPlayerNames.sort(() => Math.random() - 0.5);
      const finalPairs = [];
      for (let i = 0; i < finalShuffledNames.length / 2; i++) {
        finalPairs.push([
          finalShuffledNames[i],
          finalShuffledNames[finalShuffledNames.length - 1 - i],
        ]);
      }
      setLocalPlayerNames([finalPairs[0], finalPairs[1]]);
      setShuffling(false); 
    }, 2000); 
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const teams = localTeamNames.map((name, index) => ({
      name: capitalizeFirstLetter(name),
      players: localPlayerNames[index].map(capitalizeFirstLetter),
    }));
    onSubmit(teams);
    setTimerSeconds(0);
  };

  return (
    <div className="flex flex-col w-fit justify-center items-center mt-16">
      <form
        className="flex flex-col justify-center items-center md:w-full bg-gray-700 md:px-3 py-5 rounded-lg w-[70vw] px-6"
        onSubmit={handleSubmit}
      >
        {/* Team 1 */}
        <div className="flex flex-col items-center mb-6 w-full">
          {editingTeamIndex === 0 ? (
            <div className="flex items-center justify-center w-full">
              <input
                type="text"
                value={localTeamNames[0]}
                onChange={(e) => handleTeamNameChange(0, e.target.value)}
                className="mb-2 p-2 rounded-lg outline-none text-black w-3/4"
                required
                minLength={3}
                pattern="[A-Za-z0-9]+"
                title="Only alphabets and numbers are allowed (no spaces)"
              />
              <button
                type="button"
                onClick={() => setEditingTeamIndex(null)}
                className="ml-2 mb-2 text-teal-500 w-1/4 font-semibold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center mb-5">
              <span className="text-white mr-2 font-semibold text-xl">
                {localTeamNames[0]}
              </span>
              <button
                type="button"
                onClick={() => setEditingTeamIndex(0)}
                className="text-teal-500"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
          )}
          {localPlayerNames[0].map((name, index) => (
            <input
              key={`team1-player${index}`}
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(0, index, e.target.value)}
              placeholder={`Player ${index + 1} of Team 1`}
              className="mb-2 p-2 rounded-lg outline-none text-black w-full"
              required
              minLength={3}
              pattern="[A-Za-z0-9]+"
              title="Only alphabets and numbers are allowed (no spaces)"
            />
          ))}
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center mb-6 pt-6 w-full border-slate-200 border-t-2">
          {editingTeamIndex === 1 ? (
            <div className="flex items-center justify-center w-full">
              <input
                type="text"
                value={localTeamNames[1]}
                onChange={(e) => handleTeamNameChange(1, e.target.value)}
                className="mb-2 p-2 rounded-lg outline-none text-black w-3/4"
                required
                minLength={3}
                pattern="[A-Za-z0-9]+"
                title="Only alphabets and numbers are allowed (no spaces)"
              />
              <button
                type="button"
                onClick={() => setEditingTeamIndex(null)}
                className="ml-2 mb-2 text-teal-500 w-1/4 font-semibold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center mb-5">
              <span className="text-white mr-2 font-semibold text-xl">
                {localTeamNames[1]}
              </span>
              <button
                type="button"
                onClick={() => setEditingTeamIndex(1)}
                className="text-teal-500"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
          )}
          {localPlayerNames[1].map((name, index) => (
            <input
              key={`team2-player${index}`}
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(1, index, e.target.value)}
              placeholder={`Player ${index + 1} of Team 2`}
              className="mb-2 p-2 rounded-lg outline-none text-black w-full"
              required
              minLength={3}
              pattern="[A-Za-z0-9]+"
              title="Only alphabets and numbers are allowed (no spaces)"
            />
          ))}
        </div>

        {/* Shuffle Button */}
        <button
          type="button"
          onClick={shufflePlayers}
          disabled={shuffling} // Disable the button while shuffling
          className={`bg-teal-500 text-white px-4 py-2 rounded-lg mb-2 w-full ${
            shuffling ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {shuffling ? "Shuffling..." : "Shuffle Players"}
        </button>

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
