import { useState, useCallback } from "react";
import { Volume2, ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { letters, getWordsForLetter } from "@/data/content";
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
  const [currentWords, setCurrentWords] = useState(letters[0].words);
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

  const handleShuffle = useCallback(() => {
    const newWords = getWordsForLetter(currentLetter.letter, 10);
    setCurrentWords(newWords);
  }, [currentLetter.letter]);

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % letters.length;
    setCurrentIndex(nextIndex);
    setCurrentWords(letters[nextIndex].words);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + letters.length) % letters.length;
    setCurrentIndex(prevIndex);
    setCurrentWords(letters[prevIndex].words);
  };

  const goToLetter = (index: number) => {
    setCurrentIndex(index);
    setCurrentWords(letters[index].words);
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

      {/* Letter display - both uppercase and lowercase */}
      <div className="flex flex-col items-center mt-4">
        <div className="relative flex items-center gap-4">
          <GameButton
            variant="letter"
            size="icon-xl"
            onClick={handlePlayLetter}
            disabled={isSpeaking}
            className="w-28 h-28 md:w-36 md:h-36 text-6xl md:text-7xl relative"
          >
            {currentLetter.letter}
          </GameButton>
          <GameButton
            variant="letter"
            size="icon-xl"
            onClick={handlePlayLetter}
            disabled={isSpeaking}
            className="w-28 h-28 md:w-36 md:h-36 text-6xl md:text-7xl relative bg-gradient-to-br from-secondary to-secondary/80"
          >
            {currentLetter.lowercase}
          </GameButton>
          <StarBurst
            show={showStarBurst}
            onComplete={() => setShowStarBurst(false)}
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          <p className="text-lg text-muted-foreground font-semibold">
            Tap to hear the sound!
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center items-center gap-8 mt-4">
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

      {/* Example words - show all 10 by default */}
      <div className="mt-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground">
            Words with <span className="text-primary">{currentLetter.letter}{currentLetter.lowercase}</span>
          </h3>
          <GameButton
            variant="accent"
            size="sm"
            onClick={handleShuffle}
            className="gap-1"
          >
            <Shuffle className="h-4 w-4" />
            New Words
          </GameButton>
        </div>

        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          {currentWords.map((wordData, index) => (
            <GameButton
              key={`${wordData.english}-${index}`}
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
      <div className="mt-6 px-2">
        <div className="grid grid-cols-9 gap-1 max-w-md mx-auto">
          {letters.map((l, index) => (
            <button
              key={l.letter}
              onClick={() => goToLetter(index)}
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
