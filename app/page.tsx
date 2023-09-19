"use client";

import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import Form from "../components/Form";
import ResultCard from "@/components/ResultCard";
import { createResult } from "@/lib/actions/result.actions";

const Home = () => {
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

  const submitResult = async () => {
    const playersData = playerNames.map((name) => ({
      playerName: name,
      score: playerScores[name],
    }));

    await createResult({
      players: playersData,
    });
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
              <button
                onClick={submitResult}
                className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                Submit Result
              </button>
            </div>
          </div>
        )}

        {showResultCard && (
          <ResultCard playerNames={playerNames} playerScores={playerScores} />
        )}
      </div>
    </div>
  );
};

export default Home;
