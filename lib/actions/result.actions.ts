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

export async function fetchAllResults() {
  try {
    connectToDb();

    const results = await Result.find().sort({ date: "desc" });
    console.log("updated results")

    return results;
  } catch (error: any) {
    throw new Error("Failed to fetch results");
  }
}

export async function deleteResultById(resultId: string) {
  try {
    connectToDb();

    const deletedResult = await Result.findByIdAndRemove(resultId);

    if (!deletedResult) {
      throw new Error("Result not found");
    }

    return { success: true, message: "Result deleted successfully" };
  } catch (error: any) {
    throw new Error(`Failed to delete result: ${error.message}`);
  }
}
