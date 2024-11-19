"use client";

import React from "react";
import Link from "next/link";
import { useResultContext } from "@/context/resultContext";
import { useRouter } from "next/navigation";
import { FaPlay, FaUsers, FaTrophy } from "react-icons/fa";
import { VscDebugContinue } from "react-icons/vsc";
import { MdSettings } from "react-icons/md";

const Home = () => {
  const {
    playerNames,
    setPlayerNames,
    setPlayerScores,
    teamNames,
    setTeamNames,
    setTeamScores,
  } = useResultContext();

  const router = useRouter();

  const newGame = () => {
    setPlayerNames([]);
    setPlayerScores({});
    router.push("/game");
  };

  const newTeamGame = () => {
    setTeamNames([]);
    setTeamScores({});
    router.push("team-game");
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[90vh]">
      <button
        onClick={newGame}
        className="btn-primary flex justify-center items-center gap-2 !w-1/2"
      >
        New Game
        <FaPlay />
      </button>

      <button
        onClick={newTeamGame}
        className="btn-primary flex justify-center items-center gap-2 !w-1/2"
      >
        Team Game
        <FaUsers className="w-5 h-5" />
      </button>

      {playerNames.length > 0 && (
        <Link
          href={"/game"}
          className="btn-primary flex justify-center items-center gap-2 !w-1/2"
        >
          Resume
          <VscDebugContinue className="w-5 h-5" />
        </Link>
      )}

      {teamNames.length > 0 && (
        <Link
          href={"/team-game"}
          className="btn-primary flex justify-center items-center gap-2 !w-1/2"
        >
          Resume
          <VscDebugContinue className="w-5 h-5" />
        </Link>
      )}

      <Link
        href={"/results"}
        className="btn-primary flex justify-center items-center gap-2 text-center !w-1/2"
      >
        Results
        <FaTrophy className="w-5 h-5" />
      </Link>

      <Link
        href={"/settings"}
        className="btn-primary flex justify-center items-center gap-2 text-center !w-1/2"
      >
        Settings
        <MdSettings className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default Home;
