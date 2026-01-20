import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { sentences } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface SentencesScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const SentencesScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: SentencesScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const { speakWord, isSpeaking } = useSpeech();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const currentSentence = sentences[currentIndex];

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  const playSentence = useCallback(() => {
    clearTimeouts();
    setIsPlaying(true);
    setHighlightedWordIndex(null);

    const words = currentSentence.words;
    let currentTime = 0;

    // Calculate timing for each word (roughly 400-600ms per word depending on length)
    words.forEach((word, index) => {
      const wordDuration = Math.max(400, word.length * 80);

      const highlightTimeout = setTimeout(() => {
        setHighlightedWordIndex(index);
      }, currentTime);

      const speakTimeout = setTimeout(() => {
        speakWord(word.replace(/[!.,?]/g, ""));
      }, currentTime);

      timeoutsRef.current.push(highlightTimeout, speakTimeout);
      currentTime += wordDuration;
    });

    // End playing after all words
    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      setHighlightedWordIndex(null);
      setShowStarBurst(true);
      onAddStar();
      setTimeout(() => setShowEncouragement(true), 300);
    }, currentTime + 300);

    timeoutsRef.current.push(endTimeout);
  }, [currentSentence, clearTimeouts, speakWord, onAddStar]);

  const stopPlaying = useCallback(() => {
    clearTimeouts();
    setIsPlaying(false);
    setHighlightedWordIndex(null);
    window.speechSynthesis.cancel();
  }, [clearTimeouts]);

  const handleWordClick = (word: string) => {
    if (!isPlaying) {
      speakWord(word.replace(/[!.,?]/g, ""));
    }
  };

  const goNext = () => {
    stopPlaying();
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
  };

  const goPrev = () => {
    stopPlaying();
    setCurrentIndex((prev) => (prev - 1 + sentences.length) % sentences.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      <div className="pt-4">
        <ProgressBar
          stars={stars}
          showHebrewToggle
          showHebrew={showHebrew}
          onToggleHebrew={onToggleHebrew}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <GameButton
          variant="ghost"
          size="icon"
          onClick={goPrev}
          className="rounded-full"
        >
          <ArrowLeft className="h-8 w-8" />
        </GameButton>

        <span className="text-muted-foreground font-bold text-lg">
          {currentIndex + 1} / {sentences.length}
        </span>

        <GameButton
          variant="ghost"
          size="icon"
          onClick={goNext}
          className="rounded-full"
        >
          <ArrowRight className="h-8 w-8" />
        </GameButton>
      </div>

      {/* Sentence display */}
      <div className="mt-8 flex flex-col items-center relative">
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft max-w-lg w-full relative">
          {/* Words */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            {currentSentence.words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                disabled={isSpeaking && isPlaying}
                className={`
                  text-3xl md:text-4xl font-bold py-2 px-4 rounded-xl transition-all duration-200
                  ${
                    highlightedWordIndex === index
                      ? "bg-primary text-primary-foreground scale-110 shadow-glow-primary animate-word-highlight"
                      : "text-foreground hover:bg-muted hover:scale-105"
                  }
                `}
              >
                {word}
              </button>
            ))}
          </div>

          {/* Hebrew translation */}
          {showHebrew && (
            <p className="text-xl text-muted-foreground text-center font-semibold" dir="rtl">
              {currentSentence.hebrew}
            </p>
          )}

          <StarBurst
            show={showStarBurst}
            onComplete={() => setShowStarBurst(false)}
          />
        </div>

        {/* Tap hint */}
        <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Tap any word to hear it!
        </p>

        {/* Play button */}
        <div className="mt-6">
          {isPlaying ? (
            <GameButton
              variant="destructive"
              size="xl"
              onClick={stopPlaying}
              className="gap-3"
            >
              <Pause className="h-8 w-8" />
              Stop
            </GameButton>
          ) : (
            <GameButton
              variant="accent"
              size="xl"
              onClick={playSentence}
              className="gap-3 glow-accent"
            >
              <Play className="h-8 w-8" />
              Play Sentence
            </GameButton>
          )}
        </div>
      </div>

      {/* Sentence list */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-center mb-4 text-muted-foreground">
          More sentences
        </h3>

        <div className="flex flex-col gap-2 max-w-lg mx-auto max-h-48 overflow-y-auto">
          {sentences.map((sentence, index) => (
            <button
              key={index}
              onClick={() => {
                stopPlaying();
                setCurrentIndex(index);
              }}
              className={`
                text-left p-3 rounded-xl transition-all text-base font-semibold
                ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
              `}
            >
              {sentence.english}
            </button>
          ))}
        </div>
      </div>

      <EncouragementPopup
        show={showEncouragement}
        onComplete={() => setShowEncouragement(false)}
      />
    </div>
  );
};
