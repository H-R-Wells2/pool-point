"use client";

import PlayersForm from "@/components/PlayersForm";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const router = useRouter();

const page = (props: Props) => {

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
