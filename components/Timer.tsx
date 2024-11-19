"use client";

import { useResultContext } from "@/context/resultContext";
import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";

const Timer = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimerSeconds]);

  const minutes: number = Math.floor(timerSeconds / 60);
  const remainingSeconds: number = timerSeconds % 60;

  return (
    <div className="flex w-full max-w-sm px-4 justify-end items-center">
      <div className="flex w-fit justify-center items-center border gap-1 px-2 rounded-lg">
      <FaRegClock />
      <span>{`${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`}</span>
    </div>
      </div>
  );
};

export default Timer;
