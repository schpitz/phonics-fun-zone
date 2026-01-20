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
  const [showAllWords, setShowAllWords] = useState(false);
  const { speakLetter, speakWord, isSpeaking } = useSpeech();

  const currentLetter = letters[currentIndex];
  const displayedWords = showAllWords ? currentLetter.words : currentLetter.words.slice(0, 4);

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
    setShowAllWords(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + letters.length) % letters.length);
    setShowAllWords(false);
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

      {/* Example words */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-center mb-3 text-foreground">
          Words with <span className="text-primary">{currentLetter.letter}{currentLetter.lowercase}</span>
        </h3>

        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          {displayedWords.map((wordData, index) => (
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

        {/* Show more/less button */}
        {currentLetter.words.length > 4 && (
          <button
            onClick={() => setShowAllWords(!showAllWords)}
            className="mt-2 mx-auto block text-primary font-bold hover:underline"
          >
            {showAllWords ? "Show less ↑" : `Show all ${currentLetter.words.length} words ↓`}
          </button>
        )}
      </div>

      {/* Letter grid quick navigation */}
      <div className="mt-6 px-2">
        <div className="grid grid-cols-9 gap-1 max-w-md mx-auto">
          {letters.map((l, index) => (
            <button
              key={l.letter}
              onClick={() => {
                setCurrentIndex(index);
                setShowAllWords(false);
              }}
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
