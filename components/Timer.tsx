"use client";

import { useResultContext } from "@/context/resultContext";
import React, { useEffect } from "react";

const Timer = () => {
  const [, , , , timerSeconds, setTimerSeconds] = useResultContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimerSeconds]);

  const minutes: number = Math.floor(timerSeconds / 60);
  const remainingSeconds: number = timerSeconds % 60;

  return (
    <div className="flex w-full max-w-sm px-4 justify-end">
      <span>{`${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`}</span>
    </div>
  );
};

export default Timer;
