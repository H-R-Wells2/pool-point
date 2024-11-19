"use client";

import React from "react";
import PlayerCard from "@/components/PlayerCard";
import TeamForm from "@/components/TeamForm";
import { createResult } from "@/lib/actions/result.actions";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useResultContext } from "@/context/resultContext";
import Timer from "@/components/Timer";

interface Team {
  name: string;
  players: string[];
}

interface PlayerData {
  playerName: string;
  score: number;
  amount: number;
  isTeamWon?: boolean;
}

const TeamGame: React.FC = () => {
  const router = useRouter();
  const {
    teamNames,
    setTeamNames,
    teamScores,
    setTeamScores,
  } = useResultContext();

  const handleFormSubmit = (teams: Team[]) => {
    setTeamNames(teams);
    const initialScores = teams.reduce((scores, team) => {
      scores[team.name] = 0;
      return scores;
    }, {} as Record<string, number>);
    setTeamScores(initialScores);
  };

  const splitTeamScore = (score: number): [number, number] => {
    const halfScore = Math.floor(score / 2);
    return score % 2 === 0
      ? [halfScore, halfScore]
      : [halfScore + 1, halfScore];
  };

  const submitResult = async () => {
    const team1Score = teamScores[teamNames[0].name];
    const team2Score = teamScores[teamNames[1].name];
  
    const team1PlayerScores = splitTeamScore(team1Score);
    const team2PlayerScores = splitTeamScore(team2Score);
  
    const team1Amount = team1Score >= team2Score ? 15 : 35;
    const team2Amount = team2Score > team1Score ? 15 : 35;
  
    const isTeam1Won = team1Score > team2Score;
    const isTeam2Won = team2Score > team1Score;
  
    const playersData: PlayerData[] = [
      {
        playerName: teamNames[0].players[0],
        score: team1PlayerScores[0],
        amount: team1Amount,
        isTeamWon: isTeam1Won,
      },
      {
        playerName: teamNames[0].players[1],
        score: team1PlayerScores[1],
        amount: team1Amount,
        isTeamWon: isTeam1Won,
      },
      {
        playerName: teamNames[1].players[0],
        score: team2PlayerScores[0],
        amount: team2Amount,
        isTeamWon: isTeam2Won,
      },
      {
        playerName: teamNames[1].players[1],
        score: team2PlayerScores[1],
        amount: team2Amount,
        isTeamWon: isTeam2Won,
      },
    ];
  
    await toast.promise(
      createResult({ players: playersData }),
      {
        pending: "Submitting Team Points...",
        success: "Points submitted successfully!",
        error: "Error submitting points. Please try again.",
      },
      { autoClose: 2000 }
    );
  
    setTeamNames([]);
    setTeamScores({});
    router.push("/results");
  };
  

  return (
    <div className="flex flex-col">
      <div className="mt-20 mb-10">
        {teamNames.length === 0 ? (
          <div className="w-full flex justify-center">
            <TeamForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Timer />
            {teamNames.map((team, index) => (
              <PlayerCard
                key={index}
                name={team.name}
                players={team.players}
                score={teamScores[team.name]}
                setScore={(score: number) =>
                  setTeamScores({ ...teamScores, [team.name]: score })
                }
              />
            ))}
            <div className="flex w-full justify-center">
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <button className="mt-3 btn-primary mx-1 max-w-[350px] flex w-full justify-center">
                    Submit result
                  </button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 transition-all duration-300" />
                  <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-700 p-[25px] shadow-[0px_0px_15px_2px] shadow-teal-300">
                    <AlertDialog.Title className=" m-0 text-[17px] font-medium">
                      Are you sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-slate-300 mt-4 mb-5 text-[15px] leading-normal">
                      Your team scores will be saved in PoolPoint. Submit to
                      save your points.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px] items-center">
                      <AlertDialog.Cancel asChild>
                        <button className="hover:bg-slate-600 inline-flex h-[33px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none border border-white focus:shadow-[0_0_0_2px]">
                          Cancel
                        </button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <button
                          onClick={submitResult}
                          className="bg-teal-500 hover:bg-teal-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px]"
                        >
                          Submit
                        </button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamGame;
