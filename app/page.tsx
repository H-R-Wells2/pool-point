"use client";

import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import Form from "../components/Form";

const Home: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleFormSubmit = (names: string[]) => {
    setPlayerNames(names);
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
    </div>
  );
};

export default Home;