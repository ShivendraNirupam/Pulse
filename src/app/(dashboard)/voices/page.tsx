import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/routers/server";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export default async function VoicePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));
  return (
    <HydrateClient>
        <VoicesView />
    </HydrateClient>
  )
}
