import React from "react";

type ResultCardProps = {
  playerNames: string[];
  playerScores: { [key: string]: number };
};

const ResultCard = ({ playerNames, playerScores }: ResultCardProps) => {
  return (
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
  );
};

export default ResultCard;
