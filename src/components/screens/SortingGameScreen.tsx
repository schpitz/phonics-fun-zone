import { useState, useCallback, useEffect, useRef } from "react";
import { Shuffle, Trophy, ArrowDownToLine } from "lucide-react";
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
      const count = allWords.filter(w => w.category === cat && w.enabledForWords).length;
      return count >= wordsPerCategory;
    });

    const chosen = shuffleArray(validCategories).slice(0, basketCount);
    if (chosen.length < basketCount) return; // not enough categories

    // Get words for each category
    const wordPool: SortItem[] = [];
    chosen.forEach(cat => {
      const catWords = allWords.filter(w => w.category === cat && w.enabledForWords);
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
      setShowCelebration(false);
      if (correct) {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          setGameComplete(true);
        } else {
          setCurrentIndex(nextIndex);
        }
      }
    }, correct ? 800 : 600);
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
    speakWord(cat);
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

      {/* Difficulty + controls */}
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
        <GameButton variant="ghost" size="sm" onClick={startGame}>
          <Shuffle className="h-4 w-4" />
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
          {/* Show what ended up in each basket */}
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
          {/* Current word card */}
          <div
            className="bg-card rounded-3xl shadow-lg border-4 border-primary/30 p-6 mb-4 text-center cursor-grab active:cursor-grabbing select-none touch-manipulation"
            draggable
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            onClick={handleWordTap}
          >
            <div className="text-5xl mb-2">{currentItem.word.emoji}</div>
            <div className="text-2xl font-black text-foreground">{currentItem.word.english}</div>
            {showHebrew && (
              <div className="text-lg text-muted-foreground mt-1">{currentItem.word.hebrew}</div>
            )}
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <ArrowDownToLine className="h-3 w-3" /> Tap a basket or drag me!
            </p>
          </div>

          {/* Baskets */}
          <div className={`grid gap-3 ${categories.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {categories.map(cat => {
              const isFeedback = feedback?.basket === cat;
              const isCorrectFeedback = isFeedback && feedback?.correct;
              const isWrongFeedback = isFeedback && !feedback?.correct;

              return (
                <button
                  key={cat}
                  className={`
                    relative rounded-2xl border-4 p-4 min-h-[100px] flex flex-col items-center justify-center gap-2
                    transition-all duration-200 touch-manipulation
                    ${draggingOver === cat
                      ? "border-primary bg-primary/10 scale-105"
                      : isCorrectFeedback
                        ? "border-accent bg-accent/10 scale-105"
                        : isWrongFeedback
                          ? "border-destructive bg-destructive/10 animate-shake"
                          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }
                  `}
                  onClick={() => {
                    handleBasketTap(cat);
                    handleSort(cat);
                  }}
                  onDragOver={(e) => handleDragOver(e, cat)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, cat)}
                >
                  <span className="text-lg font-black text-foreground">{cat}</span>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {(basketContents[cat] || []).map(w => (
                      <span key={w.id} className="text-sm">{w.emoji}</span>
                    ))}
                  </div>
                  {isCorrectFeedback && (
                    <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✅</span>
                  )}
                  {isWrongFeedback && (
                    <span className="absolute -top-2 -right-2 text-2xl">❌</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
