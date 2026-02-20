import { Sparkles, BookOpen, MessageSquare, Puzzle, PenTool, ArrowDownToLine } from "lucide-react";
import { GameButton } from "../ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling" | "sorting";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onSecretTap?: () => void;
}

export const HomeScreen = ({ onNavigate, onSecretTap }: HomeScreenProps) => {
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

      {/* Character mascots */}
      <div className="flex justify-center gap-4 mb-4 text-4xl animate-float">
        <span>🦔</span>
        <span>🍄</span>
        <span>🐕</span>
        <span>🔵</span>
      </div>

      {/* Game tiles grid */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <GameButton
          variant="primary"
          size="lg"
          onClick={() => onNavigate("letters")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <Sparkles className="h-8 w-8" />
          <div className="text-base font-bold">ABC</div>
        </GameButton>

        <GameButton
          variant="secondary"
          size="lg"
          onClick={() => onNavigate("words")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <BookOpen className="h-8 w-8" />
          <div className="text-base font-bold">Words</div>
        </GameButton>

        <GameButton
          variant="accent"
          size="lg"
          onClick={() => onNavigate("sentences")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <MessageSquare className="h-8 w-8" />
          <div className="text-base font-bold">Read</div>
        </GameButton>

        <GameButton
          variant="highlight"
          size="lg"
          onClick={() => onNavigate("matching")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <Puzzle className="h-8 w-8" />
          <div className="text-base font-bold">Match</div>
        </GameButton>

        <GameButton
          variant="success"
          size="lg"
          onClick={() => onNavigate("spelling")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <PenTool className="h-8 w-8" />
          <div className="text-base font-bold">Spell</div>
        </GameButton>

        <GameButton
          variant="secondary"
          size="lg"
          onClick={() => onNavigate("sorting")}
          className="w-full flex-col gap-1.5 py-5 aspect-square"
        >
          <ArrowDownToLine className="h-8 w-8" />
          <div className="text-base font-bold">Sort</div>
        </GameButton>
      </div>

      {/* Fun footer with secret admin tap */}
      <div className="mt-4 text-center">
        <p 
          className="text-base text-muted-foreground cursor-default select-none"
          onClick={onSecretTap}
        >
          ⚽ With Mario, Sonic & Paw Patrol! 🐾
        </p>
      </div>
    </div>
  );
};
