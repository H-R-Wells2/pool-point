"use client";

import React, { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import Form from "./components/Form";
import Result from "./components/Result";

const Home: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleFormSubmit = (names: string[]) => {
    setPlayerNames(names);
  };

  const handleReset = () => {
    setPlayerNames([]);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="mb-5">
        {playerNames.length === 0 ? (
          <Form onSubmit={handleFormSubmit} />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {playerNames.map((name, index) => (
              <PlayerCard key={index} name={name} />
            ))}
          </div>
        )}
      </div>
      {/* {playerNames.length > 0 && <Result playerNames={playerNames} onReset={handleReset} />} */}
    </div>
  );
};

export default Home;
