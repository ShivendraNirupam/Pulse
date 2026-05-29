"use client";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/routers/client";
import { SettingPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";

import {
  TextToSpeechForm,
  defaultTTSValues,
  type TTSFormValues,
} from "../components/text-to-speech-form";

import { TTSVoiceProvider } from "../context/tts-voice-context";
import { VoicePreviewPanel } from "../components/voice-preview";
import { VoicePreviewMobilePanel } from "../components/voice-preview-mobile";

export function TextToSpeechDetailView({
  generationId,
}: {
  generationId?: string
}) {
  const trpc = useTRPC();
  const [
    generationQuery,
    voicesQuery
  ] = useSuspenseQueries({
    queries: [
        trpc.generations.getById.queryOptions({ id: generationId as string }),
        trpc.voices.getAll.queryOptions()
    ]
  });

  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;

  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  //Requested voice may no longer exist (deleted); fallback to first available
  const resolvedVoiceId =
    data?.voiceId &&
    allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty
  }

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  }

  return (
    <TTSVoiceProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewMobilePanel 
            audioUrl={data.audioUrl}
            voice={generationVoice}
            text={data.text}
          />
          <VoicePreviewPanel
            audioUrl={data.audioUrl}
            voice={generationVoice}
            text={data.text}
          />
        </div>
        <SettingPanel />
      </div>
    </TextToSpeechForm>
    </TTSVoiceProvider>
  );
}
