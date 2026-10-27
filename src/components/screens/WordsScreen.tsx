import { useState, useCallback, useMemo } from "react";
import { Volume2, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { vocabularyManager, UnifiedWord } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { Flashcards } from "@/components/Flashcards";

interface WordsScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const WordsScreen = ({
  showHebrew,
  onToggleHebrew,
}: WordsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedWords, setDisplayedWords] = useState<UnifiedWord[]>(() => 
    vocabularyManager.getWordsForWordsScreen(undefined, 10)
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mode, setMode] = useState<"grid" | "cards">("grid");
  const { speakWord, isSpeaking } = useSpeech();

  // Get categories dynamically from vocabulary
  const categories = useMemo(() => {
    return ["All", ...vocabularyManager.getCategories()];
  }, []);

  const currentWord = displayedWords[currentWordIndex];

  const handlePlayWord = () => {
    if (currentWord) {
      speakWord(currentWord.english);
    }
  };

  const handleGenerateMore = useCallback(() => {
    const category = selectedCategory === "All" ? undefined : selectedCategory;
    const newWords = vocabularyManager.getWordsForWordsScreen(category, 10);
    setDisplayedWords(newWords);
    setCurrentWordIndex(0);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const cat = category === "All" ? undefined : category;
    const newWords = vocabularyManager.getWordsForWordsScreen(cat, 10);
    setDisplayedWords(newWords);
    setCurrentWordIndex(0);
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

      {/* Category selector dropdown */}
      <div className="mt-4 flex justify-center">
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="appearance-none bg-card text-foreground border-2 border-primary rounded-xl px-5 py-2.5 pr-10 text-sm font-bold shadow-soft cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "📚 All Categories" : category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m1 1 4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* View mode toggle */}
      <div className="mt-4 flex justify-center gap-2">
        <GameButton variant={mode === "grid" ? "primary" : "ghost"} size="sm" onClick={() => setMode("grid")}>
          🔲 Grid
        </GameButton>
        <GameButton variant={mode === "cards" ? "primary" : "ghost"} size="sm" onClick={() => setMode("cards")}>
          🃏 Flashcards
        </GameButton>
      </div>

      {mode === "cards" && (
        <>
          <Flashcards words={displayedWords} showHebrew={showHebrew} />
          <div className="flex justify-center mt-4">
            <GameButton variant="accent" size="lg" onClick={handleGenerateMore} className="gap-3">
              <Shuffle className="h-6 w-6" />
              New Words
            </GameButton>
          </div>
        </>
      )}

      {/* Main word display */}
      {mode === "grid" && currentWord && (
        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            <GameButton
              variant="primary"
              onClick={handlePlayWord}
              disabled={isSpeaking}
              className="min-w-[300px] h-36 text-5xl md:text-6xl gap-4 relative"
            >
              <Volume2 className="h-10 w-10" />
              {currentWord.english}
            </GameButton>
          </div>

          {showHebrew && (
            <p className="mt-3 text-2xl text-muted-foreground font-bold" dir="rtl">
              {currentWord.hebrew}
            </p>
          )}

          <p className="mt-1 text-sm text-muted-foreground">
            Category: {currentWord.category}
          </p>

          {/* Generate more button */}
          <GameButton
            variant="accent"
            size="lg"
            onClick={handleGenerateMore}
            className="mt-6 gap-3"
          >
            <Shuffle className="h-6 w-6" />
            New Words
          </GameButton>
        </div>
      )}

      {/* Word grid - show only 10 */}
      {mode === "grid" && <div className="mt-8">
        <h3 className="text-lg font-bold text-center mb-4 text-muted-foreground">
          {selectedCategory === "All" ? "Words" : `${selectedCategory} words`}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
          {displayedWords.map((word, index) => {
            // Calculate font size based on word length
            const getTextFontSize = (text: string) => {
              const len = text.length;
              if (len <= 5) return "text-xl";
              if (len <= 7) return "text-lg";
              if (len <= 10) return "text-base";
              return "text-sm";
            };
            
            // Check if word contains multiple words (spaces)
            const hasMultipleWords = word.english.includes(" ");
            const words = word.english.split(" ");
            
            return (
              <GameButton
                key={`${word.english}-${index}`}
                variant={index === currentWordIndex ? "primary" : "word"}
                size="lg"
                onClick={() => {
                  setCurrentWordIndex(index);
                  speakWord(word.english);
                }}
                className={`${getTextFontSize(word.english)} py-5 px-3`}
              >
                {hasMultipleWords ? (
                  <span className="flex flex-col items-center leading-tight">
                    <span>{word.emoji}</span>
                    {words.slice(0, 2).map((w, i) => (
                      <span key={i}>{w}</span>
                    ))}
                  </span>
                ) : (
                  <span>{word.emoji} {word.english}</span>
                )}
              </GameButton>
            );
          })}
        </div>
      </div>}
    </div>
  );
};
