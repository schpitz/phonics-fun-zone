import { useCallback, useRef, useState } from "react";

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, rate: number = 0.6, trackWords: boolean = false) => {
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
    if (trackWords) {
      setCurrentWordIndex(0);
      // Use boundary event to track which word is being spoken
      const words = text.split(/\s+/);
      // Build char offset map for each word
      const wordStarts: number[] = [];
      let offset = 0;
      for (const w of words) {
        wordStarts.push(offset);
        offset += w.length + 1; // +1 for space
      }

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const charIndex = event.charIndex;
          // Find which word this charIndex falls into
          let idx = 0;
          for (let i = wordStarts.length - 1; i >= 0; i--) {
            if (charIndex >= wordStarts[i]) {
              idx = i;
              break;
            }
          }
          setCurrentWordIndex(idx);
        }
      };
    } else {
      setCurrentWordIndex(null);
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakLetter = useCallback((letter: string) => {
    speak(letter, 0.55);
  }, [speak]);

  const speakWord = useCallback((word: string) => {
    speak(word, 0.55);
  }, [speak]);

  const speakSentence = useCallback((sentence: string) => {
    speak(sentence, 0.5);
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
    currentWordIndex,
  };
};
