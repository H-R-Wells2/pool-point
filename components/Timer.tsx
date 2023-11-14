"use client";

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(1800);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  return (
    <div className="flex w-full max-w-sm px-4 justify-end">
      <span>{`${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`}</span>
    </div>
  );
};

export default Timer;
