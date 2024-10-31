"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useResultContext } from "@/context/resultContext";

interface TeamFormProps {
  onSubmit: (teams: { name: string; players: string[] }[]) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const [localTeamNames, setLocalTeamNames] = useState(["", ""]);
  const [localPlayerNames, setLocalPlayerNames] = useState([
    ["", ""],
    ["", ""],
  ]);

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
        className="flex flex-col justify-center items-center w-full bg-gray-700 px-3 py-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* Team 1 */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            value={localTeamNames[0]}
            onChange={(e) => handleTeamNameChange(0, e.target.value)}
            placeholder="Team 1 Name"
            className="mb-2 p-2 rounded-lg outline-none text-black"
            required
            minLength={3}
            pattern="[A-Za-z0-9]+"
            title="Only alphabets and numbers are allowed (no spaces)"
          />
          {localPlayerNames[0].map((name, index) => (
            <input
              key={`team1-player${index}`}
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(0, index, e.target.value)}
              placeholder={`Player ${index + 1} of Team 1`}
              className="mb-2 p-2 rounded-lg outline-none text-black"
              required
              minLength={3}
              pattern="[A-Za-z0-9]+"
              title="Only alphabets and numbers are allowed (no spaces)"
            />
          ))}
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            value={localTeamNames[1]}
            onChange={(e) => handleTeamNameChange(1, e.target.value)}
            placeholder="Team 2 Name"
            className="mb-2 p-2 rounded-lg outline-none text-black"
            required
            minLength={3}
            pattern="[A-Za-z0-9]+"
            title="Only alphabets and numbers are allowed (no spaces)"
          />
          {localPlayerNames[1].map((name, index) => (
            <input
              key={`team2-player${index}`}
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(1, index, e.target.value)}
              placeholder={`Player ${index + 1} of Team 2`}
              className="mb-2 p-2 rounded-lg outline-none text-black"
              required
              minLength={3}
              pattern="[A-Za-z0-9]+"
              title="Only alphabets and numbers are allowed (no spaces)"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg"
        >
          Start Team Game
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
