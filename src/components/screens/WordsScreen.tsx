import { useState, useCallback } from "react";
import { Volume2, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { getRandomWords, WordData } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface WordsScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

const categories = ["All", "Mario", "Sonic", "Paw Patrol", "Soccer", "Family", "Body", "Home", "Animals", "Colors"];

export const WordsScreen = ({
  showHebrew,
  onToggleHebrew,
}: WordsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedWords, setDisplayedWords] = useState<WordData[]>(() => getRandomWords(10));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { speakWord, isSpeaking } = useSpeech();

  const currentWord = displayedWords[currentWordIndex];

  const handlePlayWord = () => {
    if (currentWord) {
      speakWord(currentWord.english);
    }
  };

  const handleGenerateMore = useCallback(() => {
    const category = selectedCategory === "All" ? undefined : selectedCategory;
    const newWords = getRandomWords(10, category);
    setDisplayedWords(newWords);
    setCurrentWordIndex(0);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const cat = category === "All" ? undefined : category;
    const newWords = getRandomWords(10, cat);
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

      {/* Category selector */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`
              px-4 py-2 rounded-xl text-sm font-bold transition-all
              ${
                selectedCategory === category
                  ? "bg-secondary text-secondary-foreground shadow-button"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main word display */}
      {currentWord && (
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
      <div className="mt-8">
        <h3 className="text-lg font-bold text-center mb-4 text-muted-foreground">
          {selectedCategory === "All" ? "Words" : `${selectedCategory} words`}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
          {displayedWords.map((word, index) => (
            <GameButton
              key={`${word.english}-${index}`}
              variant={index === currentWordIndex ? "primary" : "word"}
              size="lg"
              onClick={() => {
                setCurrentWordIndex(index);
                speakWord(word.english);
              }}
              className="text-xl py-5 px-4"
            >
              <span>{word.emoji} {word.english}</span>
            </GameButton>
          ))}
        </div>
      </div>
    </div>
  );
};
