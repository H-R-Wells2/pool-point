"use client";

interface Props {
  name: string;
  players?: string[];
  score: number;
  setScore: (score: number) => void;
}

const PlayerCard = ({ name, players, score, setScore }: Props) => {
  const handleScoreChange = (amount: number) => {
    setScore(score + amount);
  };

  return (
    <div className="my-3 bg-slate-700 rounded-lg p-4 max-w-sm">
      <div className="flex w-full items-center mb-5 border-b border-gray-900">
        <div className="w-full flex justify-between">
          <div className="flex flex-col mb-2">
            <h1 className="text-2xl font-normal">{name}</h1>
            <div className="flex flex-col">
              {/* Render players under the team name */}
              {players?.map((player, index) => (
                <div key={index} className="text-slate-400 text-xs">
                  {index + 1}. {player}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mx-2 mb-2">
            <button
              className="mr-6 bg-gray-800 p-1 rounded-lg"
              onClick={() => handleScoreChange(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-center px-2 py-1 bg-teal-500 rounded-lg">
              {score}
            </h1>
            <button
              className="ml-6 bg-gray-800 p-1 rounded-lg"
              onClick={() => handleScoreChange(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="mb-2 bg-gray-800 p-1 rounded-lg"
          onClick={() => setScore(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rotate-ccw"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-1 flex-col">
          <div className="flex w-fit gap-2 mb-2">
            <button
              className="bg-red-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-1)}
            >
              -1
            </button>
            <button
              className="bg-yellow-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-2)}
            >
              -2
            </button>
            <button
              className="bg-green-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-3)}
            >
              -3
            </button>
          </div>
          <div className="flex w-fit gap-2 mb-2">
            <button
              className="bg-yellow-700 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-4)}
            >
              -4
            </button>
            <button
              className="bg-blue-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-5)}
            >
              -5
            </button>
            <button
              className="bg-pink-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-6)}
            >
              -6
            </button>
          </div>
          <div className="flex w-full justify-center gap-2">
            <button
              className="bg-black h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-7)}
            >
              -7
            </button>
            <button
              className="bg-orange-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(-8)}
            >
              -8
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex w-fit gap-2 mb-2">
            <button
              className="bg-red-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(1)}
            >
              +1
            </button>
            <button
              className="bg-yellow-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(2)}
            >
              +2
            </button>
            <button
              className="bg-green-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(3)}
            >
              +3
            </button>
          </div>
          <div className="flex w-fit gap-2 mb-2">
            <button
              className="bg-yellow-700 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(4)}
            >
              +4
            </button>
            <button
              className="bg-blue-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(5)}
            >
              +5
            </button>
            <button
              className="bg-pink-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(6)}
            >
              +6
            </button>
          </div>
          <div className="flex w-full justify-center gap-2 ">
            <button
              className="bg-black h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(7)}
            >
              +7
            </button>
            <button
              className="bg-orange-500 h-11 w-11 rounded-full"
              onClick={() => handleScoreChange(8)}
            >
              +8
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
