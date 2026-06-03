"use client";

import { useTRPC } from "@/trpc/routers/client";
import { useQueryState } from "nuqs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VoiceList } from "../components/voice-list";
import { voicesSearchParams } from "../lib/params";
import { VoiceToolbar } from "../components/voice-toobar";

function VoiceContent() {
  const trpc = useTRPC();
  const [ query ] = useQueryState("query", voicesSearchParams.query);
  const { data } = useSuspenseQuery(trpc.voices.getAll.queryOptions({ query }));

  return (
    <>
      <VoiceList title="Team Voices" voices={data.custom} />
      <VoiceList title="Built-in Voices" voices={data.system} />
    </>
  );
}

export function VoicesView() {
  return <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
    <VoiceToolbar />
    <VoiceContent />
  </div>;
}
