"use client";

import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import Form from "../components/Form";

const Home: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>(
    {}
  );
  const [showResultCard, setShowResultCard] = useState(false);

  const handleFormSubmit = (names: string[]) => {
    setPlayerNames(names);
    const initialScores: { [key: string]: number } = {};
    names.forEach((name) => (initialScores[name] = 0));
    setPlayerScores(initialScores);
  };

  const toggleResultCard = () => {
    setShowResultCard(!showResultCard);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="mb-20">
        {playerNames.length === 0 ? (
          <Form onSubmit={handleFormSubmit} />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {playerNames.map((name, index) => (
              <PlayerCard
                key={index}
                name={name}
                score={playerScores[name]}
                setScore={(score) =>
                  setPlayerScores({ ...playerScores, [name]: score })
                }
              />
            ))}
            <div className="flex gap-3">
              <button
                onClick={toggleResultCard}
                className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                Show Results
              </button>
              <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg">
                New Game
              </button>
            </div>
          </div>
        )}

        {showResultCard && (
          <div className="flex flex-col justify-center items-center my-6 bg-slate-700 rounded-lg p-2 pt-0">
            <h2 className="text-xl font-semibold mt-4 border-b-2 w-full text-center">
              Results
            </h2>
            {playerNames.map((name, index) => (
              <div key={index} className="mt-2">
                <p>
                  {name}: {playerScores[name]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
