import { useState, useCallback, useEffect, useMemo } from "react";
import { Shuffle, Volume2, Keyboard } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { getSpellingWordsByDifficulty, SpellingWord } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface SpellingGameScreenProps {
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

const ABC_LAYOUT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const QWERTY_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// Difficulty determines number of missing letters
// Difficulty config: word length range + missing letters
const getDifficultyConfig = (difficulty: number) => {
  switch (difficulty) {
    case 1: // Easy: 2-4 letters, 1 missing
      return { missingLetters: 1, minLength: 2, maxLength: 4, label: "Easy" };
    case 2: // Medium: 4-5 letters, 1 missing
      return { missingLetters: 1, minLength: 4, maxLength: 5, label: "Medium" };
    case 3: // Hard: 4-5 letters, 2 missing
      return { missingLetters: 2, minLength: 4, maxLength: 5, label: "Hard" };
    case 4: // Expert: 5-6 letters, 2 missing
      return { missingLetters: 2, minLength: 5, maxLength: 6, label: "Expert" };
    case 5: // Master: 7+ letters, 3 missing
      return { missingLetters: 3, minLength: 7, maxLength: 12, label: "Master" };
    default:
      return { missingLetters: 1, minLength: 2, maxLength: 4, label: "Easy" };
  }
};

export const SpellingGameScreen = ({
  showHebrew,
  onToggleHebrew,
}: SpellingGameScreenProps) => {
  const [difficulty, setDifficulty] = useState(1);
  const [wordList, setWordList] = useState<SpellingWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [keyboardLayout, setKeyboardLayout] = useState<"abc" | "qwerty">("abc");
  const { speakWord } = useSpeech();

  const currentWord = wordList[currentWordIndex];
  const difficultyConfig = getDifficultyConfig(difficulty);

  // Generate word puzzle with missing letters based on difficulty
  const puzzle = useMemo(() => {
    if (!currentWord) return { display: [], missingIndices: [], letters: [] };

    const word = currentWord.english.toUpperCase();
    const letters = word.split("");
    // Missing letters = difficulty level, but capped at half the word length
    const numMissing = Math.min(
      difficultyConfig.missingLetters,
      Math.max(1, Math.floor(letters.length / 2))
    );

    // Pick random indices to hide
    const indices = letters.map((_, i) => i);
    const missingIndices = shuffleArray(indices)
      .slice(0, numMissing)
      .sort((a, b) => a - b);

    const display = letters.map((letter, i) =>
      missingIndices.includes(i) ? "_" : letter
    );

    return { display, missingIndices, letters };
  }, [currentWord, difficultyConfig.missingLetters]);

  const loadWords = useCallback(() => {
    const words = getSpellingWordsByDifficulty(difficulty, 10);
    setWordList(words);
    setCurrentWordIndex(0);
    setUserInput([]);
    setIsCorrect(null);
  }, [difficulty]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  useEffect(() => {
    setUserInput([]);
    setIsCorrect(null);
  }, [currentWordIndex]);

  const handleLetterClick = (letter: string) => {
    if (isCorrect !== null || userInput.length >= puzzle.missingIndices.length)
      return;
    setUserInput((prev) => [...prev, letter]);
  };

  const handleBackspace = () => {
    if (isCorrect !== null) return;
    setUserInput((prev) => prev.slice(0, -1));
  };

  const checkAnswer = () => {
    const correctLetters = puzzle.missingIndices.map((i) => puzzle.letters[i]);
    const isAllCorrect =
      userInput.every((letter, i) => letter === correctLetters[i]) &&
      userInput.length === correctLetters.length;

    if (isAllCorrect) {
      setIsCorrect(true);
      speakWord(currentWord.english);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 1000);
      setUserInput([]);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < wordList.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      loadWords();
    }
  };

  const handleHearWord = () => {
    if (currentWord) speakWord(currentWord.english);
  };

  const handleDifficultyChange = (newDiff: number) => {
    setDifficulty(newDiff);
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

  const toggleKeyboardLayout = () => {
    setKeyboardLayout((prev) => (prev === "abc" ? "qwerty" : "abc"));
  };

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-3 sm:px-4 overflow-x-hidden">
      {/* Hebrew toggle */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onToggleHebrew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
        >
          <span className="text-lg">🇮🇱</span>
          <span
            className={showHebrew ? "text-foreground" : "text-muted-foreground"}
          >
            {showHebrew ? "עברית" : "Hebrew"}
          </span>
        </button>
      </div>

      {/* Header */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-black text-foreground">
          Fill the Letters! ✏️
        </h2>
        <p className="text-muted-foreground font-semibold mt-1">
          Level {difficulty}: {difficultyConfig.label} missing
        </p>
      </div>

      {/* Difficulty selector */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-muted-foreground">Choose Difficulty</p>
        <div className="flex flex-wrap justify-center gap-2 bg-muted/50 p-2 rounded-2xl max-w-sm sm:max-w-none">
          {[
            { level: 1, label: "Easy", icon: "🌟" },
            { level: 2, label: "Medium", icon: "⭐" },
            { level: 3, label: "Hard", icon: "🔥" },
            { level: 4, label: "Expert", icon: "💪" },
            { level: 5, label: "Master", icon: "🏆" },
          ].map((d) => (
            <button
              key={d.level}
              onClick={() => handleDifficultyChange(d.level)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-bold transition-all min-w-[55px] sm:min-w-[60px] ${
                difficulty === d.level
                  ? "bg-primary text-primary-foreground shadow-button scale-105"
                  : "bg-card text-muted-foreground hover:bg-card/80 hover:scale-102"
              }`}
            >
              <span className="text-lg">{d.icon}</span>
              <span>{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Word to spell - clickable emoji */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={handleHearWord}
          className="text-7xl mb-2 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          aria-label="Hear the word"
        >
          {currentWord.emoji}
        </button>

        {showHebrew && (
          <p
            className="text-xl text-muted-foreground font-bold mb-2"
            dir="rtl"
          >
            {currentWord.hebrew}
          </p>
        )}

        <button
          onClick={handleHearWord}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Hear the word"
        >
          <Volume2 className="h-6 w-6 text-primary" />
        </button>
      </div>

      {/* Word display with blanks */}
      <div className="mt-6">
        <div className="flex flex-col items-center gap-3 max-w-sm sm:max-w-lg mx-auto">
          <div
            className={`
              flex justify-center flex-wrap gap-1.5 sm:gap-2 min-h-[60px] p-3 bg-card rounded-2xl shadow-soft w-full
              ${isCorrect === false ? "animate-shake border-2 border-destructive" : ""}
              ${isCorrect === true ? "border-2 border-accent shadow-glow-accent" : ""}
            `}
          >
            {getDisplayWord().map((letter, index) => (
              <div
                key={index}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl text-xl sm:text-2xl font-black flex items-center justify-center
                  ${
                    puzzle.missingIndices.includes(index)
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
          
          {/* Check/Next button - below word input */}
          {isCorrect !== true ? (
            <button
              onClick={checkAnswer}
              disabled={userInput.length !== puzzle.missingIndices.length}
              className={`
                px-8 py-3 rounded-2xl font-bold text-lg transition-all shadow-button
                ${userInput.length === puzzle.missingIndices.length
                  ? "bg-accent text-accent-foreground hover:scale-105 active:scale-95"
                  : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                }
              `}
            >
              Check
            </button>
          ) : (
            <button
              onClick={nextWord}
              className="px-8 py-3 rounded-2xl font-bold text-lg bg-accent text-accent-foreground hover:scale-105 active:scale-95 transition-all shadow-button"
            >
              Next Word →
            </button>
          )}
        </div>
      </div>

      {/* Keyboard layout toggle */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={toggleKeyboardLayout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
        >
          <Keyboard className="h-4 w-4" />
          {keyboardLayout === "abc" ? "ABC" : "QWERTY"}
        </button>
      </div>

      {/* Letter keyboard */}
      <div className="mt-4 flex flex-col items-center gap-1 sm:gap-1.5 max-w-sm sm:max-w-lg mx-auto px-1">
        {keyboardLayout === "abc" ? (
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
            {ABC_LAYOUT.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={isCorrect !== null}
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold bg-secondary text-secondary-foreground shadow-button hover:scale-105 hover:bg-secondary/80 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {letter}
              </button>
            ))}
          </div>
        ) : (
          <>
            {QWERTY_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5">
                {row.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    disabled={isCorrect !== null}
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold bg-secondary text-secondary-foreground shadow-button hover:scale-105 hover:bg-secondary/80 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {/* New Word button - centered */}
      <div className="mt-8 flex justify-center">
        <GameButton variant="accent" size="default" onClick={loadWords} className="gap-2">
          <Shuffle className="h-4 w-4" />
          New Words
        </GameButton>
      </div>
    </div>
  );
};
