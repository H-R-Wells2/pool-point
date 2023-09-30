"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ResultContextType = [
  playerNames:string[],
  setPlayerNames:Dispatch<SetStateAction<string[]>>,
  playerScores:{ [key: string]: number },
  setPlayerScores:Dispatch<SetStateAction<{ [key: string]: number }>>,
  sortByRank:boolean,
  setSortByRank:Dispatch<SetStateAction<boolean>>
];

const Context = createContext<ResultContextType | undefined>(undefined);

interface ResultProviderProps {
  children: ReactNode;
}

export function ResultProvider({ children }: ResultProviderProps) {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>(
    {}
  );

  const [sortByRank, setSortByRank] = useState<boolean>(false);

  const contextValue: ResultContextType = [
    playerNames,
    setPlayerNames,
    playerScores,
    setPlayerScores,
    sortByRank,
    setSortByRank
  ];

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useResultContext(): ResultContextType {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useResultContext must be used within a ResultProvider");
  }
  return context;
}
