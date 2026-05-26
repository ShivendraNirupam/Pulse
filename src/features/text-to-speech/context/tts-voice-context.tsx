"use client"

import React, { createContext, useContext } from "react";
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

type TTSVoiceItem = 
    inferRouterOutputs<AppRouter> ["voices"]["getAll"]["custom"][number];

interface TTSVoiceContextValue {
    customVoices: TTSVoiceItem[];
    systemVoices: TTSVoiceItem[];
    allVoices: TTSVoiceItem[];
}


const TTSVoiceContext = createContext<TTSVoiceContextValue | null>(null);

export function TTSVoiceProvider({
    children,
    value
} : {
    children: React.ReactNode,
    value: TTSVoiceContextValue
}) {
    return (
        <TTSVoiceContext.Provider value={value}>
            {children}
        </TTSVoiceContext.Provider>
    )
}

export function useTTSVoices() {
    const context = useContext(TTSVoiceContext);

    if(!context) {
        throw new Error("useTTSVoices must be used withing a TTSVoiceProvider");
    }

    return context;
}