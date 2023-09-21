"use client";

import PlayersForm from "@/components/PlayersForm";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};


const page = (props: Props) => {
  
  const router = useRouter();
  
  const handleSubmit = () => {
    router.push("/game");
  };

  return (
    <div>
      <PlayersForm onSubmit={handleSubmit} />
    </div>
  );
};

export default page;
