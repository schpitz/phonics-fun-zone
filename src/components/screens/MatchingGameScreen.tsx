import { useState, useCallback, useEffect } from "react";
import { Shuffle, RotateCcw, Trophy } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { ProgressBar } from "../ProgressBar";
import { StarBurst } from "../StarBurst";
import { EncouragementPopup } from "../EncouragementPopup";
import { matchingPairs } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface MatchingGameScreenProps {
  stars: number;
  onAddStar: () => void;
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

interface Card {
  id: string;
  content: string;
  type: "english" | "hebrew" | "emoji";
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MatchingGameScreen = ({
  stars,
  onAddStar,
  showHebrew,
  onToggleHebrew,
}: MatchingGameScreenProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const { speakWord } = useSpeech();

  const initializeGame = useCallback(() => {
    // Pick 6 random pairs for a 4x3 grid (12 cards)
    const selectedPairs = shuffleArray(matchingPairs).slice(0, 6);
    
    const newCards: Card[] = [];
    selectedPairs.forEach((pair, index) => {
      // English card
      newCards.push({
        id: `en-${index}`,
        content: pair.english,
        type: "english",
        pairId: `pair-${index}`,
        isFlipped: false,
        isMatched: false,
      });
      // Hebrew/Emoji card
      newCards.push({
        id: `he-${index}`,
        content: showHebrew ? pair.hebrew : pair.emoji,
        type: showHebrew ? "hebrew" : "emoji",
        pairId: `pair-${index}`,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(newCards));
    setSelectedCards([]);
    setMatchedPairs(0);
    setGameComplete(false);
  }, [showHebrew]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (card: Card) => {
    if (isChecking || card.isFlipped || card.isMatched || selectedCards.length >= 2) {
      return;
    }

    // Speak the word
    if (card.type === "english") {
      speakWord(card.content);
    }

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      
      setTimeout(() => {
        const [first, second] = newSelected;
        
        if (first.pairId === second.pairId) {
          // Match found!
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setShowStarBurst(true);
          onAddStar();
          setTimeout(() => setShowEncouragement(true), 200);

          // Check if game is complete
          if (matchedPairs + 1 === 6) {
            setTimeout(() => setGameComplete(true), 500);
          }
        } else {
          // No match - flip cards back
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }
        
        setSelectedCards([]);
        setIsChecking(false);
      }, 1000);
    }
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
          Match the Words! 🎯
        </h2>
        <p className="text-muted-foreground font-semibold mt-1">
          Find matching pairs: {matchedPairs}/6
        </p>
      </div>

      {/* Game complete celebration */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-3xl p-8 text-center shadow-glow-success animate-bounce-in max-w-sm">
            <Trophy className="h-20 w-20 text-success mx-auto mb-4" />
            <h3 className="text-3xl font-black text-foreground mb-2">
              Amazing! 🎉
            </h3>
            <p className="text-xl text-muted-foreground mb-6">
              You matched all the pairs!
            </p>
            <GameButton
              variant="accent"
              size="lg"
              onClick={initializeGame}
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Play Again
            </GameButton>
          </div>
        </div>
      )}

      {/* Card grid */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3 max-w-md mx-auto relative">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            disabled={card.isFlipped || card.isMatched || isChecking}
            className={`
              aspect-square rounded-2xl font-bold text-lg md:text-xl
              transition-all duration-300 transform
              ${
                card.isMatched
                  ? "bg-accent text-accent-foreground scale-95 opacity-60"
                  : card.isFlipped
                  ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                  : "bg-secondary text-secondary-foreground hover:scale-105 shadow-button active:translate-y-1 active:shadow-none"
              }
            `}
            style={{
              transform: card.isFlipped || card.isMatched ? "rotateY(0deg)" : "",
            }}
          >
            {card.isFlipped || card.isMatched ? (
              <span className={card.type === "emoji" ? "text-3xl" : ""}>
                {card.content}
              </span>
            ) : (
              <span className="text-4xl">?</span>
            )}
          </button>
        ))}
        
        <StarBurst
          show={showStarBurst}
          onComplete={() => setShowStarBurst(false)}
        />
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <GameButton
          variant="ghost"
          size="lg"
          onClick={initializeGame}
          className="gap-2"
        >
          <Shuffle className="h-5 w-5" />
          New Game
        </GameButton>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-muted-foreground">
        <p className="text-sm">
          Tap cards to flip them and find matching English-{showHebrew ? "Hebrew" : "Emoji"} pairs!
        </p>
      </div>

      <EncouragementPopup
        show={showEncouragement}
        onComplete={() => setShowEncouragement(false)}
      />
    </div>
  );
};
