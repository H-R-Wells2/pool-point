import React from "react";
import { MdDeleteOutline } from "react-icons/md";

interface ResultCardProps {
  result: {
    date: string;
    players: {
      playerName: string;
      score: number;
      _id: {
        $oid: string;
      };
    }[];
  };
  // onDelete: (resultId: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {


  const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${formattedDate} - ${time}`;
  };

  return (
    <div className="bg-slate-700 mx-6 mb-4 p-5 rounded-lg">
      <div className="mb-5 flex items-center justify-between text-gray-300">
        <p className="text-xs">{formatDateString(result.date)}</p>
        {/* <button>
          <MdDeleteOutline className="w-6 h-6" />
        </button=> */}
      </div>
      <div className="flex flex-col">
        {result.players.map((player) => (
          <div
            key={player._id.$oid}
            className="flex self-center justify-between w-[50%]"
          >
            <h1>{player.playerName}:</h1>
            <h1>{player.score}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
