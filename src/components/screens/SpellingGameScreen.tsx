import { useState, useCallback, useEffect, useMemo } from "react";
import { Shuffle, RotateCcw, Volume2, Check, Keyboard } from "lucide-react";
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
const getDifficultyConfig = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return { missingLetters: 1, label: "1 letter" };
    case 2:
      return { missingLetters: 2, label: "2 letters" };
    case 3:
      return { missingLetters: 3, label: "3 letters" };
    case 4:
      return { missingLetters: 4, label: "4 letters" };
    case 5:
      return { missingLetters: 5, label: "5 letters" };
    default:
      return { missingLetters: 1, label: "1 letter" };
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
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
      <div className="mt-4 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => handleDifficultyChange(d)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              difficulty === d
                ? "bg-primary text-primary-foreground shadow-button"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {d}
          </button>
        ))}
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
      <div className="mt-4 flex flex-col items-center gap-1.5 max-w-lg mx-auto">
        {keyboardLayout === "abc" ? (
          <div className="flex flex-wrap justify-center gap-1.5">
            {ABC_LAYOUT.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={isCorrect !== null}
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl text-lg font-bold bg-secondary text-secondary-foreground shadow-button hover:scale-105 hover:bg-secondary/80 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {letter}
              </button>
            ))}
          </div>
        ) : (
          <>
            {QWERTY_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1.5">
                {row.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    disabled={isCorrect !== null}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl text-lg font-bold bg-secondary text-secondary-foreground shadow-button hover:scale-105 hover:bg-secondary/80 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-center gap-3">
        {isCorrect === true ? (
          <GameButton variant="accent" size="lg" onClick={nextWord} className="gap-2">
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
