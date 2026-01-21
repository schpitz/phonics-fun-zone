import { useState, useCallback, useEffect } from "react";
import { Shuffle, RotateCcw, Trophy } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { getRandomMatchingPairs } from "@/data/content";
import { useSpeech } from "@/hooks/useSpeech";

interface MatchingGameScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

interface Card {
  id: string;
  content: string;
  imageUrl?: string;
  type: "english" | "image";
  pairId: string;
  englishWord: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = "easy" | "medium" | "hard";

const difficultyConfig: Record<Difficulty, { pairs: number; cols: number; label: string }> = {
  easy: { pairs: 6, cols: 3, label: "Easy (3×4)" },
  medium: { pairs: 8, cols: 4, label: "Medium (4×4)" },
  hard: { pairs: 12, cols: 4, label: "Hard (4×6)" },
};

// Character images mapping - using placeholder images that represent the characters
const characterImages: Record<string, string> = {
  // Mario characters
  "Mario": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop",
  "Luigi": "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop",
  "Peach": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop",
  "Toad": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200&h=200&fit=crop",
  "Bowser": "https://images.unsplash.com/photo-1597140943860-eb0e3e0fd723?w=200&h=200&fit=crop",
  "Yoshi": "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=200&h=200&fit=crop",
  
  // Sonic characters
  "Sonic": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
  "Tails": "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=200&h=200&fit=crop",
  "Knuckles": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
  "Amy": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop",
  "Shadow": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop",
  "Eggman": "https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=200&h=200&fit=crop",
  
  // Paw Patrol
  "Chase": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
  "Marshall": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop",
  "Skye": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
  "Rubble": "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=200&h=200&fit=crop",
  "Rocky": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop",
  "Zuma": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200&h=200&fit=crop",
  
  // Animals
  "Dog": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
  "Cat": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop",
  "Bird": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&h=200&fit=crop",
  "Fish": "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=200&h=200&fit=crop",
  "Lion": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=200&h=200&fit=crop",
  "Elephant": "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=200&h=200&fit=crop",
  "Monkey": "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=200&h=200&fit=crop",
  "Rabbit": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop",
  "Horse": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop",
  "Bear": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=200&h=200&fit=crop",
  
  // Family
  "Mom": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  "Dad": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "Brother": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
  "Sister": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  "Baby": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop",
  "Grandma": "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=200&h=200&fit=crop",
  "Grandpa": "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=200&h=200&fit=crop",
  
  // Home objects
  "Table": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop",
  "Chair": "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop",
  "Bed": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop",
  "Door": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
  "Window": "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=200&h=200&fit=crop",
  "Lamp": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
  
  // Body parts
  "Hand": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&h=200&fit=crop",
  "Eye": "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?w=200&h=200&fit=crop",
  "Ear": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
  "Nose": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "Mouth": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  
  // Soccer
  "Ball": "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&h=200&fit=crop",
  "Goal": "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=200&h=200&fit=crop",
  "Player": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&h=200&fit=crop",
  "Referee": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop",
  "Trophy": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=200&fit=crop",
  
  // Colors
  "Red": "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=200&fit=crop",
  "Blue": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
  "Green": "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&h=200&fit=crop",
  "Yellow": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=200&h=200&fit=crop",
  "Orange": "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=200&h=200&fit=crop",
  "Purple": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MatchingGameScreen = ({
  showHebrew,
  onToggleHebrew,
}: MatchingGameScreenProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const { speakWord } = useSpeech();

  const config = difficultyConfig[difficulty];

  const initializeGame = useCallback(() => {
    const selectedPairs = getRandomMatchingPairs(config.pairs);
    
    const newCards: Card[] = [];
    selectedPairs.forEach((pair, index) => {
      // English card
      newCards.push({
        id: `en-${index}`,
        content: pair.english,
        type: "english",
        pairId: `pair-${index}`,
        englishWord: pair.english,
        isFlipped: false,
        isMatched: false,
      });
      // Image card
      newCards.push({
        id: `img-${index}`,
        content: pair.emoji,
        imageUrl: characterImages[pair.english],
        type: "image",
        pairId: `pair-${index}`,
        englishWord: pair.english,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(newCards));
    setSelectedCards([]);
    setMatchedPairs(0);
    setGameComplete(false);
  }, [config.pairs]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (card: Card) => {
    if (isChecking || card.isFlipped || card.isMatched || selectedCards.length >= 2) {
      return;
    }

    // Always speak the English word when clicking any card
    speakWord(card.englishWord);

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

          // Check if game is complete
          if (matchedPairs + 1 === config.pairs) {
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

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
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

      {/* Header */}
      <div className="mt-2 text-center">
        <h2 className="text-2xl font-black text-foreground">
          Match Words & Pictures! 🎯
        </h2>
        <p className="text-muted-foreground font-semibold mt-1">
          Find matching pairs: {matchedPairs}/{config.pairs}
        </p>
      </div>

      {/* Difficulty selector */}
      <div className="mt-4 flex justify-center gap-2">
        {(Object.keys(difficultyConfig) as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`
              px-4 py-2 rounded-xl text-sm font-bold transition-all
              ${
                difficulty === level
                  ? "bg-primary text-primary-foreground shadow-button"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }
            `}
          >
            {difficultyConfig[level].label}
          </button>
        ))}
      </div>

      {/* Game complete celebration */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-3xl p-8 text-center shadow-soft animate-bounce-in max-w-sm">
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
      <div 
        className={`mt-6 grid gap-2 md:gap-3 max-w-lg mx-auto relative`}
        style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            disabled={card.isFlipped || card.isMatched || isChecking}
            className={`
              aspect-square rounded-2xl font-bold text-base md:text-lg
              transition-all duration-300 transform flex items-center justify-center p-2
              ${
                card.isMatched
                  ? "bg-accent text-accent-foreground scale-95 opacity-60"
                  : card.isFlipped
                  ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                  : "bg-secondary text-secondary-foreground hover:scale-105 shadow-button active:translate-y-1 active:shadow-none"
              }
            `}
          >
            {card.isFlipped || card.isMatched ? (
              card.type === "image" && card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt={card.englishWord}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : card.type === "image" ? (
                <span className="text-5xl md:text-6xl">{card.content}</span>
              ) : (
                <span className="text-sm md:text-base font-bold px-1">{card.content}</span>
              )
            ) : (
              <span className="text-4xl md:text-5xl">?</span>
            )}
            {/* Hidden emoji fallback */}
            {card.type === "image" && (
              <span className="hidden text-5xl md:text-6xl">{card.content}</span>
            )}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <GameButton
          variant="accent"
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
          Match English words with their pictures! 🖼️
        </p>
      </div>
    </div>
  );
};
