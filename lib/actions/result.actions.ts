"use server";

import Result from "../models/result.model";
import { connectToDb } from "../mongoose";

interface Params {
  players: Array<{
    playerName: string;
    score: number;
  }>;
}

export async function createResult({ players }: Params) {
  try {
    connectToDb();

    const result = await Result.create({
      players,
    });

    console.log(result);

    return { success: true, message: "Result saved successfully" };
  } catch (error) {
    console.error("Error saving result:", error);
    throw new Error("Failed to create result");
  }
}
