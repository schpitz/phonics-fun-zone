import { useState, useCallback, useEffect, useMemo } from "react";
import { Shuffle, RotateCcw, Volume2, Check } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { getSpellingWordsByDifficulty, SpellingWord } from "@/data/content";
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
  const [difficulty, setDifficulty] = useState(1); // 1-5 difficulty
  const [missingLetters, setMissingLetters] = useState(1); // How many letters to fill
  const [wordList, setWordList] = useState<SpellingWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const { speakWord } = useSpeech();

  const currentWord = wordList[currentWordIndex];

  // Generate word puzzle with missing letters
  const puzzle = useMemo(() => {
    if (!currentWord) return { display: [], missingIndices: [], letters: [] };
    
    const word = currentWord.english.toUpperCase();
    const letters = word.split("");
    const numMissing = Math.min(missingLetters, Math.floor(letters.length / 2));
    
    // Pick random indices to hide
    const indices = letters.map((_, i) => i);
    const missingIndices = shuffleArray(indices).slice(0, numMissing).sort((a, b) => a - b);
    
    const display = letters.map((letter, i) => 
      missingIndices.includes(i) ? "_" : letter
    );
    
    return { display, missingIndices, letters };
  }, [currentWord, missingLetters]);

  const loadWords = useCallback(() => {
    const words = getSpellingWordsByDifficulty(difficulty, 10);
    setWordList(words);
    setCurrentWordIndex(0);
    setUserInput([]);
    setIsCorrect(null);
    setWordsCompleted(0);
  }, [difficulty]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  useEffect(() => {
    setUserInput([]);
    setIsCorrect(null);
  }, [currentWordIndex]);

  const handleLetterClick = (letter: string) => {
    if (isCorrect !== null || userInput.length >= puzzle.missingIndices.length) return;
    setUserInput(prev => [...prev, letter]);
  };

  const handleBackspace = () => {
    if (isCorrect !== null) return;
    setUserInput(prev => prev.slice(0, -1));
  };

  const checkAnswer = () => {
    const correctLetters = puzzle.missingIndices.map(i => puzzle.letters[i]);
    const isAllCorrect = userInput.every((letter, i) => letter === correctLetters[i]) 
      && userInput.length === correctLetters.length;

    if (isAllCorrect) {
      setIsCorrect(true);
      setShowStarBurst(true);
      onAddStar();
      setWordsCompleted(prev => prev + 1);
      speakWord(currentWord.english);
      setTimeout(() => setShowEncouragement(true), 200);
      
      // Increase difficulty after every 3 words
      if ((wordsCompleted + 1) % 3 === 0 && missingLetters < 4) {
        setMissingLetters(prev => prev + 1);
      }
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 1000);
      setUserInput([]);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < wordList.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      loadWords();
    }
  };

  const handleHearWord = () => {
    if (currentWord) speakWord(currentWord.english);
  };

  const handleDifficultyChange = (newDiff: number) => {
    setDifficulty(newDiff);
    setMissingLetters(1);
  };

  // Get current display with user input
  const getDisplayWord = () => {
    const result = [...puzzle.display];
    puzzle.missingIndices.forEach((idx, i) => {
      if (userInput[i]) {
        result[idx] = userInput[i];
      }
    });
    return result;
  };

  const letterOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (!currentWord) return null;

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
          Fill the Letters! ✏️
        </h2>
        <p className="text-muted-foreground font-semibold mt-1">
          Words: {wordsCompleted} | Missing: {missingLetters} letter{missingLetters > 1 ? "s" : ""}
        </p>
      </div>

      {/* Difficulty selector */}
      <div className="mt-4 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(d => (
          <button
            key={d}
            onClick={() => handleDifficultyChange(d)}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              difficulty === d
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Level {d}
          </button>
        ))}
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

      {/* Word display with blanks */}
      <div className="mt-6 relative">
        <div
          className={`
            flex justify-center gap-2 min-h-[70px] p-3 bg-card rounded-2xl shadow-soft mx-auto max-w-md
            ${isCorrect === false ? "animate-shake border-2 border-destructive" : ""}
            ${isCorrect === true ? "border-2 border-accent shadow-glow-accent" : ""}
          `}
        >
          {getDisplayWord().map((letter, index) => (
            <div
              key={index}
              className={`
                w-12 h-12 md:w-14 md:h-14 rounded-xl text-2xl font-black flex items-center justify-center
                ${puzzle.missingIndices.includes(index)
                  ? letter === "_"
                    ? "bg-muted border-2 border-dashed border-primary text-muted-foreground"
                    : isCorrect === true
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
                }
              `}
            >
              {letter}
            </div>
          ))}
        </div>
        
        <StarBurst
          show={showStarBurst}
          onComplete={() => setShowStarBurst(false)}
        />
      </div>

      {/* Letter keyboard */}
      <div className="mt-6 flex flex-wrap justify-center gap-1 max-w-md mx-auto">
        {letterOptions.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={isCorrect !== null}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg text-lg font-bold bg-secondary text-secondary-foreground shadow-button hover:scale-105 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
          >
            {letter}
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
              onClick={handleBackspace}
              disabled={userInput.length === 0}
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Undo
            </GameButton>

            <GameButton
              variant="primary"
              size="lg"
              onClick={checkAnswer}
              disabled={userInput.length !== puzzle.missingIndices.length}
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
      <div className="mt-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h3 className="text-lg font-bold text-muted-foreground">
            Words
          </h3>
          <GameButton
            variant="ghost"
            size="sm"
            onClick={loadWords}
            className="gap-1"
          >
            <Shuffle className="h-4 w-4" />
            New Set
          </GameButton>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          {wordList.map((word, index) => (
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
