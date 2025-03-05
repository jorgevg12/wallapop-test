'use client';

import Image from "next/image";
import { MessageScreen } from "../types/types";

interface MessageIconScreenProps extends MessageScreen { }

export default function MessageIconScreen({ message, img }: MessageIconScreenProps) {

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[calc(100vh-74px)] bg-background-2/80 fixed top-[74px] left-0 right-0">
      {message && <h3>{message}</h3>}
      <Image
        src={`/icons/${img}.svg`}
        alt={img}
        width={100}
        height={100}
        className={img === "loading" ? "animate-spin w-12 h-auto" : ""}
      />
    </div>
  );
}