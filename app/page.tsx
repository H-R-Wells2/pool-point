"use client";

import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import Form from "../components/Form";
import ResultCard from "@/components/ResultCard";
import { createResult } from "@/lib/actions/result.actions";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";

const Home = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>(
    {}
  );
  const [showResultCard, setShowResultCard] = useState(false);

  const handleFormSubmit = (names: string[]) => {
    setPlayerNames(names);
    const initialScores: { [key: string]: number } = {};
    names.forEach((name) => (initialScores[name] = 0));
    setPlayerScores(initialScores);
  };

  const toggleResultCard = () => {
    setShowResultCard(!showResultCard);
  };

  const submitResult = async () => {
    const playersData = playerNames.map((name) => ({
      playerName: name,
      score: playerScores[name],
    }));

    await toast.promise(
      createResult({
        players: playersData,
      }),
      {
        pending: "Submitting Points...",
        success: "Points submitted successfully!",
        error: "Error submitting points. Please try again.",
      }
    );
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="mb-20">
        {playerNames.length === 0 ? (
          <Form onSubmit={handleFormSubmit} />
        ) : (
          <div className="flex flex-col justify-center items-center">
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
            <div className="flex gap-5">
              <button
                onClick={toggleResultCard}
                className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                Show Result
              </button>

              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg">
                    Submit result
                  </button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
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
                        <button className=" hover:bg-slate-600 inline-flex h-[33px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
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

        {showResultCard && (
          <ResultCard playerNames={playerNames} playerScores={playerScores} />
        )}
      </div>
    </div>
  );
};

export default Home;
