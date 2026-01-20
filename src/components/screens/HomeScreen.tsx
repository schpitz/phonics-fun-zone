import { Sparkles, BookOpen, MessageSquare, Star, Puzzle, PenTool } from "lucide-react";
import { GameButton } from "../ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling";

interface HomeScreenProps {
  stars: number;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen = ({ stars, onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      {/* Header */}
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gradient-rainbow mb-2">
          Learn English!
        </h1>
        <p className="text-xl text-muted-foreground font-semibold">
          Let's have fun! 🎮
        </p>
      </div>

      {/* Stars display */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-2xl shadow-soft">
          <Star className="h-10 w-10 fill-success text-success animate-pulse-glow" />
          <span className="text-4xl font-black text-foreground">{stars}</span>
          <span className="text-lg font-bold text-muted-foreground">stars</span>
        </div>
      </div>

      {/* Character mascots */}
      <div className="flex justify-center gap-4 mb-4 text-4xl animate-float">
        <span>🦔</span>
        <span>🍄</span>
        <span>🐕</span>
        <span>🔵</span>
      </div>

      {/* Main menu buttons */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <GameButton
          variant="primary"
          size="lg"
          onClick={() => onNavigate("letters")}
          className="w-full justify-start gap-4"
        >
          <Sparkles className="h-7 w-7" />
          <div className="text-left">
            <div className="text-xl">Letters A-Z</div>
            <div className="text-xs opacity-80 font-normal">Learn the alphabet</div>
          </div>
        </GameButton>

        <GameButton
          variant="secondary"
          size="lg"
          onClick={() => onNavigate("words")}
          className="w-full justify-start gap-4"
        >
          <BookOpen className="h-7 w-7" />
          <div className="text-left">
            <div className="text-xl">Words</div>
            <div className="text-xs opacity-80 font-normal">Practice vocabulary</div>
          </div>
        </GameButton>

        <GameButton
          variant="accent"
          size="lg"
          onClick={() => onNavigate("sentences")}
          className="w-full justify-start gap-4"
        >
          <MessageSquare className="h-7 w-7" />
          <div className="text-left">
            <div className="text-xl">Sentences</div>
            <div className="text-xs opacity-80 font-normal">Read along!</div>
          </div>
        </GameButton>

        <div className="grid grid-cols-2 gap-3">
          <GameButton
            variant="highlight"
            size="lg"
            onClick={() => onNavigate("matching")}
            className="w-full flex-col gap-1 py-4"
          >
            <Puzzle className="h-7 w-7" />
            <div className="text-lg">Match</div>
            <div className="text-xs opacity-80 font-normal">Find pairs</div>
          </GameButton>

          <GameButton
            variant="success"
            size="lg"
            onClick={() => onNavigate("spelling")}
            className="w-full flex-col gap-1 py-4"
          >
            <PenTool className="h-7 w-7" />
            <div className="text-lg">Spell</div>
            <div className="text-xs opacity-80 font-normal">Build words</div>
          </GameButton>
        </div>
      </div>

      {/* Fun footer */}
      <div className="mt-4 text-center">
        <p className="text-base text-muted-foreground">
          ⚽ With Mario, Sonic & Paw Patrol! 🐾
        </p>
      </div>
    </div>
  );
};
