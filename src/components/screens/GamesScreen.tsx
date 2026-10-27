import { Puzzle, PenTool, ArrowDownToLine, Blocks, Ear } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { Screen } from "@/data/screens";

interface GamesScreenProps {
  onNavigate: (screen: Screen) => void;
}

const games = [
  { screen: "matching" as Screen, icon: Puzzle, label: "Match", sub: "Find the pairs", variant: "highlight" as const },
  { screen: "spelling" as Screen, icon: PenTool, label: "Spell", sub: "Fill the letters", variant: "success" as const },
  { screen: "sorting" as Screen, icon: ArrowDownToLine, label: "Sort", sub: "Pick the basket", variant: "secondary" as const },
  { screen: "builder" as Screen, icon: Blocks, label: "Build", sub: "Make a sentence", variant: "primary" as const },
  { screen: "listening" as Screen, icon: Ear, label: "Listen", sub: "Hear & pick", variant: "accent" as const },
];

export const GamesScreen = ({ onNavigate }: GamesScreenProps) => (
  <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
    <div className="pt-6 pb-4 text-center">
      <h1 className="text-4xl font-black text-gradient-rainbow mb-1">Games 🎮</h1>
      <p className="text-lg text-muted-foreground font-semibold">Pick a game!</p>
    </div>
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      {games.map(({ screen, icon: Icon, label, sub, variant }, i) => (
        <GameButton
          key={screen}
          variant={variant}
          size="lg"
          onClick={() => onNavigate(screen)}
          className={`w-full flex-col gap-2 py-6 h-auto ${i === games.length - 1 ? "col-span-2" : ""}`}
        >
          <Icon className="h-9 w-9" />
          <div className="text-2xl">{label}</div>
          <div className="text-xs opacity-80 font-normal">{sub}</div>
        </GameButton>
      ))}
    </div>
  </div>
);
