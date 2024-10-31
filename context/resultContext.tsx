"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Team {
  name: string;
  players: string[];
}

type ResultContextType = {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  playerScores: { [key: string]: number };
  setPlayerScores: Dispatch<SetStateAction<{ [key: string]: number }>>;
  teamNames: Team[];
  setTeamNames: Dispatch<SetStateAction<Team[]>>;
  teamScores: { [key: string]: number };
  setTeamScores: Dispatch<SetStateAction<{ [key: string]: number }>>;
  timerSeconds: number;
  setTimerSeconds: Dispatch<SetStateAction<number>>;
};

const Context = createContext<ResultContextType | undefined>(undefined);

interface ResultProviderProps {
  children: ReactNode;
}

export function ResultProvider({ children }: ResultProviderProps) {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>({});
  const [teamNames, setTeamNames] = useState<Team[]>([]);
  const [teamScores, setTeamScores] = useState<{ [key: string]: number }>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const contextValue: ResultContextType = {
    playerNames,
    setPlayerNames,
    playerScores,
    setPlayerScores,
    teamNames,
    setTeamNames,
    teamScores,
    setTeamScores,
    timerSeconds,
    setTimerSeconds,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useResultContext(): ResultContextType {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useResultContext must be used within a ResultProvider");
  }
  return context;
}
