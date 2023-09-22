"use client";

import React from "react";
import Link from "next/link";
import { useResultContext } from "@/context/resultContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const [playerNames, setPlayerNames, playerScores, setPlayerScores] =
    useResultContext();
  const router = useRouter();

  const newGame = () => {
    setPlayerNames([]);
    setPlayerScores({});
    router.push("/game");
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[80vh]">
      <button onClick={newGame} className="btn-primary w-1/2">
        New Game
      </button>
      {playerNames.length > 0 && (
        <Link href={"/game"} className="btn-primary text-center w-1/2">
          Resume
        </Link>
      )}
      <Link href={"/results"} className="btn-primary text-center w-1/2">
        Results
      </Link>
    </div>
  );
};

export default Home;
