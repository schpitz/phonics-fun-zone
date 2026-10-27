import { BookOpen, Sparkles, MessageSquare, Home, Puzzle, PenTool, ArrowDownToLine, Blocks, Ear } from "lucide-react";
import { GameButton } from "./ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling" | "sorting" | "builder" | "listening";

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const navItems = [
    { screen: "home" as Screen, icon: Home, label: "Home" },
    { screen: "letters" as Screen, icon: Sparkles, label: "ABC" },
    { screen: "words" as Screen, icon: BookOpen, label: "Words" },
    { screen: "sentences" as Screen, icon: MessageSquare, label: "Read" },
    { screen: "matching" as Screen, icon: Puzzle, label: "Match" },
    { screen: "spelling" as Screen, icon: PenTool, label: "Spell" },
    { screen: "sorting" as Screen, icon: ArrowDownToLine, label: "Sort" },
    { screen: "builder" as Screen, icon: Blocks, label: "Build" },
    { screen: "listening" as Screen, icon: Ear, label: "Listen" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-0.5 py-2 z-40">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <GameButton
            key={screen}
            variant={currentScreen === screen ? "primary" : "ghost"}
            size="sm"
            onClick={() => onNavigate(screen)}
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-1 sm:px-2 md:px-3 min-w-0"
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold">{label}</span>
          </GameButton>
        ))}
      </div>
    </nav>
  );
};
