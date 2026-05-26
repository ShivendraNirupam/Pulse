"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
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

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());

  const { custom: customVoices, system: systemVoices } = voices;

  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  //Requested voice may no longer exist (deleted); fallback to first available
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId
  }

  return (
    <TTSVoiceProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingPanel />
      </div>
    </TextToSpeechForm>
    </TTSVoiceProvider>
  );
}
