import DateFilter from "@/components/DateFilter";
import ResultCard from "@/components/ResultCard";
import {
  fetchAllResults,
  fetchResultsByDate,
} from "@/lib/actions/result.actions";

export const revalidate = 0;

export const dynamic = "force-dynamic";

const fetchResults = async (date: string) => {
  if (!date) return null;

  const data = await fetchResultsByDate(new Date(date));
  // console.log(data);
  return data;
};

// interfaced for money calculating
interface Player {
  playerName: string;
  score: number;
}

interface Document {
  players: Player[];
}

interface PlayerRank {
  [playerName: string]: number;
}

// function for calculating money
function calculatePlayerRanks(data: any): PlayerRank[] {
  if (data == undefined || null) {
    return [];
  }

  const playerRanks: PlayerRank = {};

  data.forEach((document: Document) => {
    const players = document.players.slice();

    players.sort((a, b) => b.score - a.score);

    players.forEach((player: Player, index) => {
      const playerName = player.playerName;
      const rank = index + 1;

      if (!playerRanks[playerName]) {
        playerRanks[playerName] = 0;
      }

      playerRanks[playerName] += rank;
    });
  });

  // Convert the player ranks object to an array of objects
  const playerRanksArray: PlayerRank[] = Object.keys(playerRanks).map(
    (playerName) => ({
      [playerName]: playerRanks[playerName],
    })
  );

  return playerRanksArray;
}

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const selectedSearch = searchParams?.selected ?? "";
  const selected = Array.isArray(selectedSearch)
    ? selectedSearch[0]
    : selectedSearch;

  const dateData = await fetchResults(selected);

  const resultsData = await fetchAllResults();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const uniqueDates = Array.from(
    new Set(resultsData.map((result) => formatDate(result.date)))
  );

  const playerRanks: PlayerRank[] = calculatePlayerRanks(dateData);

  return (
    <div className="mt-20">
      <div className="flex flex-col mb-3 mt-6">
        <DateFilter uniqueDates={uniqueDates} selected={selected || ""} />
        {dateData ? (
          <section>
            {dateData.map((result) => (
              <ResultCard
                key={result._id.$oid}
                result={result}
                pathname="/results"
              />
            ))}
              <div className="text-center text-lg font-semibold mb-4">
                {selected}
              </div>
            <div className="bg-slate-700 border border-teal-300 mx-6 mb-4 p-5 rounded-lg">
            <div className="text-center text-lg font-semibold mb-2">
                Result
              </div>
              <div className="flex flex-col justify-center">
                {playerRanks
                  .sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]])
                  .map((rank) =>
                    Object.keys(rank).map((playerName) => (
                      <div
                        className="flex self-center justify-between w-[50%]"
                        key={playerName}
                      >
                        <h1>{playerName}:</h1>
                        <h1>{rank[playerName] * 10}</h1>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </section>
        ) : (
          <section>
            {resultsData.map((result) => (
              <ResultCard
                key={result._id.$oid}
                result={result}
                pathname="/results"
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default page;
