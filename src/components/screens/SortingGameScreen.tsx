import { useState, useCallback, useEffect, useRef } from "react";
import { Shuffle, Trophy } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { vocabularyManager, UnifiedWord } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { CelebrationFeedback } from "../CelebrationFeedback";

interface SortingGameScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

type Difficulty = "easy" | "hard";

// Categories suitable for sorting (must have enough words)
const SORTABLE_CATEGORIES = [
  "Animals", "Food", "Clothes", "Vehicles", "Sports",
  "Nature", "Objects", "Colors", "Body", "Family", "Places", "Technology"
];

const shuffleArray = <T,>(arr: T[]): T[] => {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};

interface SortItem {
  word: UnifiedWord;
  sorted: boolean;
}

export const SortingGameScreen = ({ showHebrew, onToggleHebrew }: SortingGameScreenProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<SortItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [feedback, setFeedback] = useState<{ basket: string; correct: boolean } | null>(null);
  const [basketContents, setBasketContents] = useState<Record<string, UnifiedWord[]>>({});
  const [draggingOver, setDraggingOver] = useState<string | null>(null);

  const { speakWord } = useSpeech();
  const { playSuccess, playError } = useSoundEffects();
  const feedbackTimeout = useRef<NodeJS.Timeout | null>(null);

  const basketCount = difficulty === "easy" ? 2 : 3;
  const wordsPerCategory = difficulty === "easy" ? 5 : 4;

  const startGame = useCallback(() => {
    // Pick random categories that have enough words
    const allWords = vocabularyManager.getAllWords();
    const validCategories = SORTABLE_CATEGORIES.filter(cat => {
      const count = allWords.filter(w => w.category === cat && w.enabledForSorting).length;
      return count >= wordsPerCategory;
    });

    const chosen = shuffleArray(validCategories).slice(0, basketCount);
    if (chosen.length < basketCount) return; // not enough categories

    // Get words for each category
    const wordPool: SortItem[] = [];
    chosen.forEach(cat => {
      const catWords = allWords.filter(w => w.category === cat && w.enabledForSorting);
      const picked = shuffleArray(catWords).slice(0, wordsPerCategory);
      picked.forEach(w => wordPool.push({ word: w, sorted: false }));
    });

    setCategories(chosen);
    setItems(shuffleArray(wordPool));
    setCurrentIndex(0);
    setScore(0);
    setMistakes(0);
    setGameComplete(false);
    setShowCelebration(false);
    setFeedback(null);
    const empty: Record<string, UnifiedWord[]> = {};
    chosen.forEach(c => (empty[c] = []));
    setBasketContents(empty);
  }, [basketCount, wordsPerCategory]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const currentItem = items[currentIndex] || null;

  const handleSort = useCallback((targetCategory: string) => {
    if (!currentItem || gameComplete) return;

    const correct = currentItem.word.category === targetCategory;

    if (correct) {
      playSuccess();
      setScore(prev => prev + 1);
      setShowCelebration(true);
      setBasketContents(prev => ({
        ...prev,
        [targetCategory]: [...(prev[targetCategory] || []), currentItem.word],
      }));
    } else {
      playError();
      setMistakes(prev => prev + 1);
    }

    setFeedback({ basket: targetCategory, correct });

    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    feedbackTimeout.current = setTimeout(() => {
      setFeedback(null);
      if (correct) {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          setGameComplete(true);
        } else {
          setCurrentIndex(nextIndex);
        }
      }
    }, correct ? 800 : 600);

    // Dismiss celebration independently after 1.5s
    if (correct) {
      setTimeout(() => setShowCelebration(false), 1500);
    }
  }, [currentItem, currentIndex, items.length, gameComplete, playSuccess, playError]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "word");
  };

  const handleDragOver = (e: React.DragEvent, cat: string) => {
    e.preventDefault();
    setDraggingOver(cat);
  };

  const handleDragLeave = () => {
    setDraggingOver(null);
  };

  const handleDrop = (e: React.DragEvent, cat: string) => {
    e.preventDefault();
    setDraggingOver(null);
    handleSort(cat);
  };

  // Touch drag state
  const touchRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startY: t.clientY };
  };

  const handleWordTap = () => {
    if (currentItem) speakWord(currentItem.word.english);
  };

  const handleBasketTap = (cat: string) => {
    speakWord(cat); // Only speak, no sorting
  };

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-28 px-4 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const totalWords = items.length;
  const progress = gameComplete ? 100 : Math.round((currentIndex / totalWords) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-3">
      {<CelebrationFeedback show={showCelebration} />}

      {/* Header */}
      <div className="pt-4 pb-2 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gradient-rainbow mb-1">
          Sort It! 🗂️
        </h1>
        <p className="text-sm text-muted-foreground font-semibold">
          Put each word in the right basket!
        </p>
      </div>

      {/* Difficulty */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <GameButton
          variant={difficulty === "easy" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setDifficulty("easy")}
        >
          Easy (2)
        </GameButton>
        <GameButton
          variant={difficulty === "hard" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setDifficulty("hard")}
        >
          Hard (3)
        </GameButton>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1 font-bold">
          <span>⭐ {score}</span>
          <span>{currentIndex}/{totalWords}</span>
          <span>❌ {mistakes}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {gameComplete ? (
        /* Game complete screen */
        <div className="max-w-md mx-auto text-center py-8">
          <Trophy className="h-16 w-16 text-success mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-black text-foreground mb-2">All Sorted! 🎉</h2>
          <p className="text-lg text-muted-foreground mb-1">
            Score: {score}/{totalWords}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Mistakes: {mistakes}
          </p>
          <div className={`grid gap-3 mb-6 ${categories.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {categories.map(cat => (
              <div key={cat} className="bg-card rounded-2xl p-3 border-2 border-border">
                <h3 className="font-bold text-sm text-foreground mb-2">{cat}</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(basketContents[cat] || []).map(w => (
                    <span key={w.id} className="text-lg">{w.emoji}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <GameButton variant="primary" size="lg" onClick={startGame}>
            Play Again! 🔄
          </GameButton>
        </div>
      ) : currentItem ? (
        /* Active game */
        <div className="max-w-md mx-auto">
          {/* Draggable word card */}
          <div
            className="max-w-[200px] mx-auto bg-card rounded-3xl shadow-[0_8px_0_hsl(var(--border)),0_12px_24px_-4px_hsl(var(--foreground)/0.15)] border-2 border-dashed border-primary/40 p-4 mb-5 text-center cursor-grab active:cursor-grabbing active:shadow-[0_2px_0_hsl(var(--border)),0_4px_8px_-2px_hsl(var(--foreground)/0.1)] active:translate-y-1 select-none touch-manipulation transition-all duration-150 hover:scale-[1.02]"
            draggable
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            onClick={handleWordTap}
          >
            <div className="text-5xl mb-1">{currentItem.word.emoji}</div>
            <div className="text-xl font-black text-foreground">{currentItem.word.english}</div>
          </div>

          {/* Baskets */}
          <div className={`grid gap-3 ${categories.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {categories.map(cat => {
              const isFeedback = feedback?.basket === cat;
              const isCorrectFeedback = isFeedback && feedback?.correct;
              const isWrongFeedback = isFeedback && !feedback?.correct;
              const contents = basketContents[cat] || [];

              return (
                <div
                  key={cat}
                  className={`
                    relative flex flex-col transition-all duration-200 touch-manipulation
                  `}
                  onDragOver={(e) => handleDragOver(e, cat)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, cat)}
                >
                  {/* Basket label */}
                  <button
                    className="text-base font-black text-foreground bg-muted rounded-t-xl px-3 py-2 text-center border-2 border-b-0 border-border"
                    onClick={() => handleBasketTap(cat)}
                  >
                    {cat}
                  </button>
                  {/* Basket body */}
                  <div
                    className={`
                      rounded-b-2xl rounded-t-none border-2 min-h-[90px] p-2 flex flex-col items-center justify-start
                      bg-[repeating-linear-gradient(0deg,transparent,transparent_14px,hsl(var(--border)/0.4)_14px,hsl(var(--border)/0.4)_15px)]
                      ${draggingOver === cat
                        ? "border-primary bg-primary/10 scale-105 shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)]"
                        : isCorrectFeedback
                          ? "border-accent bg-accent/10 scale-105"
                          : isWrongFeedback
                            ? "border-destructive bg-destructive/10 animate-shake"
                            : "border-border bg-card/60"
                      }
                      transition-all duration-200
                    `}
                  >
                    {contents.length === 0 && !isFeedback && (
                      <span className="text-xs text-muted-foreground/50 mt-4 italic">Drop here</span>
                    )}
                    <div className="flex flex-wrap gap-1 justify-center mt-1">
                      {contents.map(w => (
                        <span
                          key={w.id}
                          className="inline-flex items-center bg-muted/80 rounded-lg px-2 py-0.5 text-sm font-bold text-foreground"
                        >
                          {w.english}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isCorrectFeedback && (
                    <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✅</span>
                  )}
                  {isWrongFeedback && (
                    <span className="absolute -top-2 -right-2 text-2xl">❌</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Shuffle button below baskets */}
          <div className="flex justify-center mt-6">
            <GameButton variant="ghost" size="sm" onClick={startGame}>
              <Shuffle className="h-4 w-4 mr-1" /> New Round
            </GameButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};
