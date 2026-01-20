import { useState } from "react";
import { Volume2, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { words } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface WordsScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

const categories = ["All", "Mario", "Sonic", "Paw Patrol", "Smurfs", "Soccer", "Colors"];

export const WordsScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: WordsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const { speakWord, isSpeaking } = useSpeech();

  const filteredWords =
    selectedCategory === "All"
      ? words
      : words.filter((w) => w.category === selectedCategory);

  const currentWord = filteredWords[currentWordIndex];

  const handlePlayWord = () => {
    if (currentWord) {
      speakWord(currentWord.english);
      setShowStarBurst(true);
      onAddStar();
      setTimeout(() => setShowEncouragement(true), 300);
    }
  };

  const handleShuffle = () => {
    const newIndex = Math.floor(Math.random() * filteredWords.length);
    setCurrentWordIndex(newIndex);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
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
              className="min-w-[280px] h-32 text-4xl md:text-5xl gap-4 relative"
            >
              <Volume2 className="h-8 w-8" />
              {currentWord.english}
            </GameButton>
            <StarBurst
              show={showStarBurst}
              onComplete={() => setShowStarBurst(false)}
            />
          </div>

          {showHebrew && (
            <p className="mt-4 text-2xl text-muted-foreground font-bold" dir="rtl">
              {currentWord.hebrew}
            </p>
          )}

          <p className="mt-2 text-sm text-muted-foreground">
            Category: {currentWord.category}
          </p>

          {/* Shuffle button */}
          <GameButton
            variant="accent"
            size="lg"
            onClick={handleShuffle}
            className="mt-6 gap-3"
          >
            <Shuffle className="h-6 w-6" />
            Next Word
          </GameButton>
        </div>
      )}

      {/* Word grid */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-center mb-4 text-muted-foreground">
          All {selectedCategory === "All" ? "" : selectedCategory + " "}words
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-lg mx-auto">
          {filteredWords.map((word, index) => (
            <GameButton
              key={word.english}
              variant={index === currentWordIndex ? "primary" : "word"}
              size="sm"
              onClick={() => {
                setCurrentWordIndex(index);
                speakWord(word.english);
              }}
              className="text-base"
            >
              {word.english}
            </GameButton>
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
