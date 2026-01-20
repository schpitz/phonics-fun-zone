import { useState } from "react";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { letters } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface LettersScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const LettersScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: LettersScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const { speakLetter, speakWord, isSpeaking } = useSpeech();

  const currentLetter = letters[currentIndex];

  const handlePlayLetter = () => {
    speakLetter(currentLetter.letter);
    setShowStarBurst(true);
    onAddStar();
    setTimeout(() => setShowEncouragement(true), 300);
  };

  const handlePlayWord = (word: string) => {
    speakWord(word);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % letters.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + letters.length) % letters.length);
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

      {/* Letter display */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative">
          <GameButton
            variant="letter"
            size="icon-xl"
            onClick={handlePlayLetter}
            disabled={isSpeaking}
            className="w-40 h-40 text-8xl relative"
          >
            {currentLetter.letter}
            <Volume2 className="absolute bottom-3 right-3 h-6 w-6 opacity-60" />
          </GameButton>
          <StarBurst
            show={showStarBurst}
            onComplete={() => setShowStarBurst(false)}
          />
        </div>

        <p className="mt-4 text-lg text-muted-foreground font-semibold">
          Tap to hear the sound!
        </p>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center items-center gap-8 mt-6">
        <GameButton
          variant="ghost"
          size="icon"
          onClick={goPrev}
          className="rounded-full"
        >
          <ArrowLeft className="h-8 w-8" />
        </GameButton>

        <span className="text-muted-foreground font-bold">
          {currentIndex + 1} / {letters.length}
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

      {/* Example words */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-center mb-4 text-foreground">
          Words with <span className="text-primary">{currentLetter.letter}</span>
        </h3>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {currentLetter.words.map((wordData, index) => (
            <GameButton
              key={index}
              variant="word"
              size="lg"
              onClick={() => handlePlayWord(wordData.english)}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <span className="text-xl">{wordData.english}</span>
              </div>
              {showHebrew && (
                <span className="text-lg text-muted-foreground" dir="rtl">
                  {wordData.hebrew}
                </span>
              )}
            </GameButton>
          ))}
        </div>
      </div>

      {/* Letter grid quick navigation */}
      <div className="mt-8 px-2">
        <div className="grid grid-cols-9 gap-1 max-w-md mx-auto">
          {letters.map((l, index) => (
            <button
              key={l.letter}
              onClick={() => setCurrentIndex(index)}
              className={`
                aspect-square rounded-lg text-sm font-bold transition-all
                ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "bg-muted text-muted-foreground hover:bg-primary/20"
                }
              `}
            >
              {l.letter}
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
