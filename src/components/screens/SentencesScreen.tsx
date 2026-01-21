import { useState, useCallback } from "react";
import { Play, Shuffle, Volume2, Minus, Plus } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { getRandomSentences, SentenceData } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface SentencesScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const SentencesScreen = ({
  showHebrew,
  onToggleHebrew,
}: SentencesScreenProps) => {
  const [displayedSentences, setDisplayedSentences] = useState<SentenceData[]>(() => getRandomSentences(3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const { speakWord, speak, isSpeaking } = useSpeech();

  const currentSentence = displayedSentences[currentIndex];

  // Base rate is 0.5 (what we consider 1x speed)
  const baseRate = 0.5;
  const actualRate = baseRate * speedMultiplier;

  // Play the whole sentence smoothly
  const playSentence = useCallback(() => {
    speak(currentSentence.english, actualRate);
  }, [currentSentence, speak, actualRate]);

  // Click individual word to hear it
  const handleWordClick = (word: string) => {
    speakWord(word.replace(/[!.,?]/g, ""));
  };

  const handleGenerateMore = () => {
    const newSentences = getRandomSentences(3);
    setDisplayedSentences(newSentences);
    setCurrentIndex(0);
  };

  const decreaseSpeed = () => {
    setSpeedMultiplier(prev => Math.max(0.5, prev - 0.25));
  };

  const increaseSpeed = () => {
    setSpeedMultiplier(prev => Math.min(2.0, prev + 0.25));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      {/* Hebrew toggle */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onToggleHebrew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
        >
          <span className="text-lg">🇮🇱</span>
          <span className={showHebrew ? "text-foreground" : "text-muted-foreground"}>
            {showHebrew ? "עברית" : "Hebrew"}
          </span>
        </button>
      </div>

      {/* Header */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-black text-foreground">
          Read the Sentence! 📖
        </h2>
      </div>

      {/* Speed control */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="text-sm font-bold text-muted-foreground">Speed:</span>
        <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2 shadow-soft">
          <button
            onClick={decreaseSpeed}
            disabled={speedMultiplier <= 0.5}
            className="p-1 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="w-16 text-center font-bold text-lg">
            x{speedMultiplier.toFixed(2)}
          </span>
          <button
            onClick={increaseSpeed}
            disabled={speedMultiplier >= 2.0}
            className="p-1 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sentence display */}
      <div className="mt-6 flex flex-col items-center relative">
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft max-w-lg w-full relative">
          {/* Words - clickable individually */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            {currentSentence.words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                disabled={isSpeaking}
                className="text-3xl md:text-4xl font-bold py-2 px-4 rounded-xl transition-all duration-200 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
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
        </div>

        {/* Tap hint */}
        <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Tap any word to hear it!
        </p>

        {/* Play button */}
        <div className="mt-6">
          <GameButton
            variant="accent"
            size="xl"
            onClick={playSentence}
            disabled={isSpeaking}
            className="gap-3 glow-accent"
          >
            <Play className="h-8 w-8" />
            Play Sentence
          </GameButton>
        </div>
      </div>

      {/* Sentence list - only 3 */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h3 className="text-lg font-bold text-muted-foreground">
            Sentences
          </h3>
          <GameButton
            variant="accent"
            size="sm"
            onClick={handleGenerateMore}
            className="gap-2"
          >
            <Shuffle className="h-4 w-4" />
            New Sentences
          </GameButton>
        </div>

        <div className="flex flex-col gap-2 max-w-lg mx-auto">
          {displayedSentences.map((sentence, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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
    </div>
  );
};
