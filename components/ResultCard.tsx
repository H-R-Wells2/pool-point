import DeleteResult from "./DeleteResult";

interface ResultCardProps {
  result: {
    _id: {
      $oid: string;
    };
    date: string;
    players: {
      playerName: string;
      score: number;
      isTeamWon?: boolean;
      _id: {
        $oid: string;
      };
    }[];
  };
  pathname: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, pathname }) => {
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });

    return `${formattedDate} - ${time}`;
  };

  return (
    <div className="bg-slate-700 mx-6 mb-4 p-5 rounded-lg">
      <div className="mb-5 flex items-center justify-between text-gray-300">
        <p className="text-xs">{formatDateString(result.date)}</p>
        {pathname === "/admin" && (
          <DeleteResult resultId={JSON.stringify(result._id)} />
        )}
      </div>
      <div className="flex flex-col">
        {result.players
          .sort((a, b) => b.score - a.score)
          .map((player, index) => {
            const playerColor = player.isTeamWon === true
              ? "text-green-500"
              : player.isTeamWon === false
              ? "text-red-500"
              : "text-gray-300";

            return (
              <div
                key={index}
                className="flex self-center justify-between w-[50%]"
              >
                <h1 className={`flex justify-between gap-2 ${playerColor}`}>
                  <span>{index + 1 + "."}</span>
                  {player.playerName}:
                </h1>
                <h1 className={playerColor}>{player.score}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ResultCard;
