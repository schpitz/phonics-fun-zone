import { useCallback, useRef, useState } from "react";

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, rate: number = 0.8) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to get a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) =>
        voice.name.includes("Samantha") ||
        voice.name.includes("Google US English") ||
        voice.name.includes("Microsoft Zira") ||
        (voice.lang.startsWith("en") && voice.name.includes("Female"))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utteranceRef.current = utterance;
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakLetter = useCallback((letter: string) => {
    speak(letter, 0.7);
  }, [speak]);

  const speakWord = useCallback((word: string) => {
    speak(word, 0.75);
  }, [speak]);

  const speakSentence = useCallback((sentence: string) => {
    speak(sentence, 0.7);
  }, [speak]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    speakLetter,
    speakWord,
    speakSentence,
    stop,
    isSpeaking,
  };
};
