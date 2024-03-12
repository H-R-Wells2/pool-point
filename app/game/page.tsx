"use client";

import React from "react";
import PlayerCard from "@/components/PlayerCard";
import PlayersForm from "@/components/PlayersForm";
import { createResult } from "@/lib/actions/result.actions";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useResultContext } from "@/context/resultContext";
import Timer from "@/components/Timer";

const Game = () => {
  const router = useRouter();

  const [
    playerNames,
    setPlayerNames,
    playerScores,
    setPlayerScores,
  ] = useResultContext();

  const handleFormSubmit = (names: string[]) => {
    setPlayerNames(names);
    const initialScores: { [key: string]: number } = {};
    names.forEach((name) => (initialScores[name] = 0));
    setPlayerScores(initialScores);
  };

  const submitResult = async () => {
    const sortedPlayerScores = Object.entries(playerScores).sort(
      (a, b) => b[1] - a[1]
    );

    // Calculate amounts based on ranking and number of players
    const numberOfPlayers = sortedPlayerScores.length;
    const amounts = calculateAmounts(numberOfPlayers);

    const playersData = sortedPlayerScores.map(([name, score], index) => ({
      playerName: name,
      score: score,
      amount: amounts[index],
    }));

    await toast.promise(
      createResult({
        players: playersData,
      }),
      {
        pending: "Submitting Points...",
        success: "Points submitted successfully!",
        error: "Error submitting points. Please try again.",
      },
      {
        autoClose: 2000,
      }
    );

    setPlayerNames([]);
    setPlayerScores({});

    router.push("/results");
  };

  // Function to calculate amounts based on the number of players
  const calculateAmounts = (numberOfPlayers: number) => {
    switch (numberOfPlayers) {
      case 2:
        return [50, 50];
      case 3:
        return [25, 32, 43];
      default:
        return Array.from(
          { length: numberOfPlayers },
          (_, index) => (index + 1) * 10
        );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-20 mb-10">
        {playerNames.length === 0 ? (
          <div className="w-full flex justify-center">
            <PlayersForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Timer />
            {playerNames.map((name, index) => (
              <PlayerCard
                key={index}
                name={name}
                score={playerScores[name]}
                setScore={(score) =>
                  setPlayerScores({ ...playerScores, [name]: score })
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
                      Your score will be saved in PoolPoint. Submit to save your
                      points
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px] items-center">
                      <AlertDialog.Cancel asChild>
                        <button className=" hover:bg-slate-600 inline-flex h-[33px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none border border-white focus:shadow-[0_0_0_2px]">
                          Cancel
                        </button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <button
                          onClick={submitResult}
                          className=" bg-teal-500 hover:bg-teal-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px]"
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

export default Game;
