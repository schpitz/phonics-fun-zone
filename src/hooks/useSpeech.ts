import { useCallback, useEffect, useRef, useState } from "react";

// Browser speech is global: only one hook instance may own playback at a time.
let releasePlayback: (() => void) | null = null;

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [speakingSource, setSpeakingSource] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const clearRef = useRef<(() => void) | null>(null);
  const mountedRef = useRef(true);

  const stop = useCallback(() => {
    if (!utteranceRef.current) return;
    clearRef.current?.();
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; stop(); };
  }, [stop]);

  const speak = useCallback((text: string, rate = 0.6, trackWords = false, source = "") => {
    if (!mountedRef.current || !text.trim() || !window.speechSynthesis) return;
    releasePlayback?.();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    const preferredVoice = window.speechSynthesis.getVoices().find((voice) =>
      voice.name.includes("Samantha") || voice.name.includes("Google US English") ||
      voice.name.includes("Microsoft Zira") || (voice.lang.startsWith("en") && voice.name.includes("Female"))
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    utteranceRef.current = utterance;
    const clear = () => {
      if (utteranceRef.current !== utterance) return;
      utteranceRef.current = null;
      setIsSpeaking(false);
      setSpeakingSource(null);
      setCurrentWordIndex(null);
      if (releasePlayback === clear) releasePlayback = null;
    };
    clearRef.current = clear;
    releasePlayback = clear;
    utterance.onstart = () => {
      if (utteranceRef.current !== utterance) return;
      setIsSpeaking(true);
      setSpeakingSource(source || null);
      setCurrentWordIndex(trackWords ? 0 : null);
    };
    if (trackWords) {
      const starts = Array.from(text.matchAll(/\S+/g), (match) => match.index ?? 0);
      utterance.onboundary = (event) => {
        if (utteranceRef.current !== utterance || event.name !== "word") return;
        const index = starts.findIndex((start, i) => start <= event.charIndex &&
          (i === starts.length - 1 || starts[i + 1] > event.charIndex));
        if (index >= 0) setCurrentWordIndex(index);
      };
    }
    utterance.onend = clear;
    utterance.onerror = clear;
    window.speechSynthesis.speak(utterance);
  }, []);

  const speakLetter = useCallback((letter: string, source?: string) => speak(letter, 0.55, false, source), [speak]);
  const speakWord = useCallback((word: string, source?: string) => speak(word, 0.55, false, source), [speak]);
  const speakSentence = useCallback((sentence: string, source?: string) => speak(sentence, 0.5, false, source), [speak]);
  const speechProps = (source: string) => ({
    "data-speech-source": source,
    "data-speaking": speakingSource === source ? "true" : undefined,
    "aria-busy": speakingSource === source,
  });

  return { speak, speakLetter, speakWord, speakSentence, stop, isSpeaking, currentWordIndex, speakingSource, speechProps };
};
