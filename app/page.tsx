"use client";

import React from "react";
import Link from "next/link";
import { useResultContext } from "@/context/resultContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const {
    teamNames,
    setTeamNames,
    teamScores,
    setTeamScores,
    playerNames,
    setPlayerNames,
    playerScores,
    setPlayerScores,
    timerSeconds,
    setTimerSeconds,
  } = useResultContext();
  
  const router = useRouter();

  const newGame = () => {
    setPlayerNames([]);
    setPlayerScores({});
    router.push("/game");
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[90vh]">
      <button onClick={newGame} className="btn-primary w-1/2">
        New Game
      </button>
      
      <Link href={'/team-game'} className="btn-primary flex justify-center w-1/2">
        New Team Game
      </Link>
      
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
