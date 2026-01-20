import { useState, useCallback, useEffect } from "react";
import { Shuffle, RotateCcw, Volume2, Check, X } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { spellingWords } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface SpellingGameScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const SpellingGameScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: SpellingGameScreenProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; id: string; used: boolean }[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ letter: string; id: string }[]>([]);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const { speakWord } = useSpeech();

  const currentWord = spellingWords[currentWordIndex];

  const initializeWord = useCallback(() => {
    const word = spellingWords[currentWordIndex];
    const letters = word.english.toUpperCase().split("");
    
    // Add some extra random letters to make it more challenging
    const extraLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .filter((l) => !letters.includes(l))
      .slice(0, Math.min(3, 6 - letters.length));
    
    const allLetters = [...letters, ...extraLetters].map((letter, index) => ({
      letter,
      id: `${letter}-${index}-${Date.now()}`,
      used: false,
    }));

    setAvailableLetters(shuffleArray(allLetters));
    setSelectedLetters([]);
    setIsCorrect(null);
  }, [currentWordIndex]);

  useEffect(() => {
    initializeWord();
  }, [initializeWord]);

  const handleLetterClick = (letterObj: { letter: string; id: string }) => {
    if (isCorrect !== null) return;

    // Add to selected
    setSelectedLetters((prev) => [...prev, letterObj]);
    setAvailableLetters((prev) =>
      prev.map((l) => (l.id === letterObj.id ? { ...l, used: true } : l))
    );
  };

  const handleSelectedLetterClick = (letterObj: { letter: string; id: string }) => {
    if (isCorrect !== null) return;

    // Remove from selected and return to available
    setSelectedLetters((prev) => prev.filter((l) => l.id !== letterObj.id));
    setAvailableLetters((prev) =>
      prev.map((l) => (l.id === letterObj.id ? { ...l, used: false } : l))
    );
  };

  const checkAnswer = () => {
    const attempt = selectedLetters.map((l) => l.letter).join("");
    const correct = currentWord.english.toUpperCase();

    if (attempt === correct) {
      setIsCorrect(true);
      setShowStarBurst(true);
      onAddStar();
      setWordsCompleted((prev) => prev + 1);
      setTimeout(() => setShowEncouragement(true), 200);
      speakWord(currentWord.english);
    } else {
      setIsCorrect(false);
      // Shake animation handled by CSS
      setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % spellingWords.length);
  };

  const handleHearWord = () => {
    speakWord(currentWord.english);
  };

  const resetWord = () => {
    initializeWord();
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

      {/* Header */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-black text-foreground">
          Spell the Word! ✏️
        </h2>
        <p className="text-muted-foreground font-semibold mt-1">
          Words spelled: {wordsCompleted}
        </p>
      </div>

      {/* Word to spell */}
      <div className="mt-6 flex flex-col items-center">
        <div className="text-6xl mb-2">{currentWord.emoji}</div>
        
        {showHebrew && (
          <p className="text-xl text-muted-foreground font-bold mb-2" dir="rtl">
            {currentWord.hebrew}
          </p>
        )}

        <GameButton
          variant="ghost"
          size="default"
          onClick={handleHearWord}
          className="gap-2"
        >
          <Volume2 className="h-5 w-5" />
          Hear the word
        </GameButton>
      </div>

      {/* Selected letters (answer area) */}
      <div className="mt-6 relative">
        <div
          className={`
            flex justify-center gap-2 min-h-[70px] p-3 bg-card rounded-2xl shadow-soft mx-auto max-w-md
            ${isCorrect === false ? "animate-shake border-2 border-destructive" : ""}
            ${isCorrect === true ? "border-2 border-accent shadow-glow-accent" : ""}
          `}
        >
          {selectedLetters.length === 0 ? (
            <span className="text-muted-foreground font-semibold self-center">
              Tap letters below to spell the word
            </span>
          ) : (
            selectedLetters.map((letterObj) => (
              <button
                key={letterObj.id}
                onClick={() => handleSelectedLetterClick(letterObj)}
                disabled={isCorrect !== null}
                className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-xl text-2xl font-black
                  transition-all duration-200 shadow-button active:translate-y-1 active:shadow-none
                  ${
                    isCorrect === true
                      ? "bg-accent text-accent-foreground"
                      : isCorrect === false
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground hover:brightness-110"
                  }
                `}
              >
                {letterObj.letter}
              </button>
            ))
          )}
        </div>
        
        <StarBurst
          show={showStarBurst}
          onComplete={() => setShowStarBurst(false)}
        />
      </div>

      {/* Hint: show letter placeholders */}
      <div className="mt-2 flex justify-center gap-1">
        {currentWord.english.split("").map((_, index) => (
          <div
            key={index}
            className={`
              w-8 h-1 rounded-full
              ${index < selectedLetters.length ? "bg-primary" : "bg-muted-foreground/30"}
            `}
          />
        ))}
      </div>

      {/* Available letters */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
        {availableLetters.map((letterObj) => (
          <button
            key={letterObj.id}
            onClick={() => handleLetterClick(letterObj)}
            disabled={letterObj.used || isCorrect !== null}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-xl text-2xl font-black
              transition-all duration-200
              ${
                letterObj.used
                  ? "bg-muted text-muted-foreground opacity-40"
                  : "bg-secondary text-secondary-foreground shadow-button hover:scale-105 active:translate-y-1 active:shadow-none"
              }
            `}
          >
            {letterObj.letter}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-center gap-3">
        {isCorrect === true ? (
          <GameButton
            variant="accent"
            size="lg"
            onClick={nextWord}
            className="gap-2"
          >
            Next Word →
          </GameButton>
        ) : (
          <>
            <GameButton
              variant="ghost"
              size="default"
              onClick={resetWord}
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </GameButton>

            <GameButton
              variant="primary"
              size="lg"
              onClick={checkAnswer}
              disabled={selectedLetters.length === 0}
              className="gap-2"
            >
              <Check className="h-5 w-5" />
              Check
            </GameButton>

            <GameButton
              variant="ghost"
              size="default"
              onClick={nextWord}
              className="gap-2"
            >
              <Shuffle className="h-5 w-5" />
              Skip
            </GameButton>
          </>
        )}
      </div>

      {/* Word list */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-center mb-3 text-muted-foreground">
          All words
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          {spellingWords.map((word, index) => (
            <button
              key={word.english}
              onClick={() => setCurrentWordIndex(index)}
              className={`
                px-3 py-1 rounded-lg text-sm font-bold transition-all
                ${
                  index === currentWordIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
              `}
            >
              {word.emoji}
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
