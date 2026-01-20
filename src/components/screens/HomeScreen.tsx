import { Sparkles, BookOpen, MessageSquare, Star } from "lucide-react";
import { GameButton } from "../ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences";

interface HomeScreenProps {
  stars: number;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen = ({ stars, onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-24 px-4">
      {/* Header */}
      <div className="pt-8 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gradient-rainbow mb-2">
          Learn English!
        </h1>
        <p className="text-xl text-muted-foreground font-semibold">
          Let's have fun! 🎮
        </p>
      </div>

      {/* Stars display */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-2xl shadow-soft">
          <Star className="h-10 w-10 fill-success text-success animate-pulse-glow" />
          <span className="text-4xl font-black text-foreground">{stars}</span>
          <span className="text-lg font-bold text-muted-foreground">stars</span>
        </div>
      </div>

      {/* Character mascots */}
      <div className="flex justify-center gap-4 mb-8 text-5xl animate-float">
        <span>🦔</span>
        <span>🍄</span>
        <span>🐕</span>
        <span>🔵</span>
      </div>

      {/* Main menu buttons */}
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <GameButton
          variant="primary"
          size="xl"
          onClick={() => onNavigate("letters")}
          className="w-full justify-start gap-4"
        >
          <Sparkles className="h-8 w-8" />
          <div className="text-left">
            <div className="text-2xl">Letters A-Z</div>
            <div className="text-sm opacity-80 font-normal">Learn the alphabet</div>
          </div>
        </GameButton>

        <GameButton
          variant="secondary"
          size="xl"
          onClick={() => onNavigate("words")}
          className="w-full justify-start gap-4"
        >
          <BookOpen className="h-8 w-8" />
          <div className="text-left">
            <div className="text-2xl">Words</div>
            <div className="text-sm opacity-80 font-normal">Practice vocabulary</div>
          </div>
        </GameButton>

        <GameButton
          variant="accent"
          size="xl"
          onClick={() => onNavigate("sentences")}
          className="w-full justify-start gap-4"
        >
          <MessageSquare className="h-8 w-8" />
          <div className="text-left">
            <div className="text-2xl">Sentences</div>
            <div className="text-sm opacity-80 font-normal">Read along!</div>
          </div>
        </GameButton>
      </div>

      {/* Fun footer */}
      <div className="mt-8 text-center">
        <p className="text-lg text-muted-foreground">
          ⚽ With Mario, Sonic & Paw Patrol! 🐾
        </p>
      </div>
    </div>
  );
};
