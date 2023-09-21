"use client";

import React, { useState } from "react";
// import PlayerCard from "../components/PlayerCard";
// import PlayersForm from "../components/PlayersForm";
// import ResultCard from "@/components/ResultCard";
// import { createResult } from "@/lib/actions/result.actions";
// import * as AlertDialog from "@radix-ui/react-alert-dialog";
// import { toast } from "react-toastify";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Link href={"/game"} className="btn-primary">
        New Game
      </Link>
    </div>
  );
};

export default Home;
