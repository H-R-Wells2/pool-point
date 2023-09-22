"use client"

import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type ResultContextType = [
  string[],
  Dispatch<SetStateAction<string[]>>,
  { [key: string]: number },
  Dispatch<SetStateAction<{ [key: string]: number }>>
];

const Context = createContext<ResultContextType | undefined>(undefined);

interface ResultProviderProps {
  children: ReactNode;
}

export function ResultProvider({ children }: ResultProviderProps) {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>({});

  const contextValue: ResultContextType = [playerNames, setPlayerNames, playerScores, setPlayerScores];

  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
}

export function useResultContext(): ResultContextType {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useResultContext must be used within a ResultProvider");
  }
  return context;
}