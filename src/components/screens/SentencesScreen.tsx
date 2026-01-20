import { useState, useCallback } from "react";
import { Play, Shuffle, Volume2 } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { getRandomSentences, SentenceData } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface SentencesScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const SentencesScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: SentencesScreenProps) => {
  const [displayedSentences, setDisplayedSentences] = useState<SentenceData[]>(() => getRandomSentences(3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const { speakWord, speakSentence, isSpeaking } = useSpeech();

  const currentSentence = displayedSentences[currentIndex];

  // Play the whole sentence smoothly
  const playSentence = useCallback(() => {
    speakSentence(currentSentence.english);
    setShowStarBurst(true);
    onAddStar();
    setTimeout(() => setShowEncouragement(true), 500);
  }, [currentSentence, speakSentence, onAddStar]);

  // Click individual word to hear it
  const handleWordClick = (word: string) => {
    speakWord(word.replace(/[!.,?]/g, ""));
  };

  const handleGenerateMore = () => {
    const newSentences = getRandomSentences(3);
    setDisplayedSentences(newSentences);
    setCurrentIndex(0);
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
          Read the Sentence! 📖
        </h2>
      </div>

      {/* Sentence display */}
      <div className="mt-6 flex flex-col items-center relative">
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft max-w-lg w-full relative">
          {/* Words - clickable individually */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            {currentSentence.words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                disabled={isSpeaking}
                className="text-3xl md:text-4xl font-bold py-2 px-4 rounded-xl transition-all duration-200 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>

          {/* Hebrew translation */}
          {showHebrew && (
            <p className="text-xl text-muted-foreground text-center font-semibold" dir="rtl">
              {currentSentence.hebrew}
            </p>
          )}

          <StarBurst
            show={showStarBurst}
            onComplete={() => setShowStarBurst(false)}
          />
        </div>

        {/* Tap hint */}
        <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Tap any word to hear it!
        </p>

        {/* Play button */}
        <div className="mt-6">
          <GameButton
            variant="accent"
            size="xl"
            onClick={playSentence}
            disabled={isSpeaking}
            className="gap-3 glow-accent"
          >
            <Play className="h-8 w-8" />
            Play Sentence
          </GameButton>
        </div>
      </div>

      {/* Sentence list - only 3 */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h3 className="text-lg font-bold text-muted-foreground">
            Sentences
          </h3>
          <GameButton
            variant="ghost"
            size="sm"
            onClick={handleGenerateMore}
            className="gap-1"
          >
            <Shuffle className="h-4 w-4" />
            More
          </GameButton>
        </div>

        <div className="flex flex-col gap-2 max-w-lg mx-auto">
          {displayedSentences.map((sentence, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                text-left p-3 rounded-xl transition-all text-base font-semibold
                ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
              `}
            >
              {sentence.english}
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
