import { fetchAllResults } from "@/lib/actions/result.actions";

const Results = async () => {
  const resultsData = await fetchAllResults();

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
    <div>
      <div className="flex flex-col my-3">
        {resultsData.map((result) => (
          <div
            key={result._id}
            className="bg-slate-700 mx-6 mb-4 p-5 rounded-lg "
          >
            <div className="mb-5 flex items-center justify-start">
              <p className="text-xs text-gray-300">
                {formatDateString(result.date)}
              </p>
            </div>
            <div className="flex flex-col">
              {result.players.map((player: any) => (
                <div
                  key={result._id}
                  className="flex self-center justify-between w-[50%]"
                >
                  <h1>{player.playerName}:</h1>
                  <h1>{player.score}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
