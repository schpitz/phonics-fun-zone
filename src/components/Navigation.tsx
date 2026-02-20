import { BookOpen, Sparkles, MessageSquare, Home, Puzzle, PenTool, ArrowDownToLine } from "lucide-react";
import { GameButton } from "./ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling" | "sorting";

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
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-1 py-2 z-40">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <GameButton
            key={screen}
            variant={currentScreen === screen ? "primary" : "ghost"}
            size="sm"
            onClick={() => onNavigate(screen)}
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-2 md:px-4"
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
            <span className="text-[10px] md:text-xs font-bold">{label}</span>
          </GameButton>
        ))}
      </div>
    </nav>
  );
};
