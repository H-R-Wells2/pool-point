"use server";

import Result from "../models/result.model";
import { connectToDb } from "../mongoose";
import moment from "moment-timezone";

interface Params {
  players: Array<{
    playerName: string;
    score: number;
  }>;
}

// to create result
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

// to fetch results
export async function fetchAllResults() {
  try {
    connectToDb();

    const results = await Result.find().sort({ date: "desc" });
    console.log("updated results");

    return results;
  } catch (error: any) {
    throw new Error("Failed to fetch results");
  }
}

// to fetch results by date
export async function fetchResultsByDate(date: Date) {
  try {
    connectToDb();

    const kolkataDate = moment(date).tz("Asia/Kolkata");

    const query = {
      date: {
        $gte: kolkataDate.toDate(),
        $lt: kolkataDate.clone().add(1, "day").toDate(),
      },
    };

    const results = await Result.find(query).sort({ date: "desc" });

    // console.log("Fetched results of", date);
    return results;
  } catch (error) {
    throw new Error("Failed to fetch results by date");
  }
}

// to delete result
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
