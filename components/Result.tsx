// Results.tsx

import React from "react";

interface ResultsProps {
  playerNames: string[];
  onReset: () => void;
}

const Result: React.FC<ResultsProps> = ({ playerNames, onReset }) => {
  const scores = [10, 20, 30, 40];

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-3">Results</h2>
      {playerNames.map((name, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{name}</p>
          <p>Score: {scores[index]}</p>
        </div>
      ))}
      <button
        onClick={onReset}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-3"
      >
        Reset Scores
      </button>
    </div>
  );
};

export default Result;
