import { BookOpen, Sparkles, MessageSquare, Home } from "lucide-react";
import { GameButton } from "./ui/game-button";

type Screen = "home" | "letters" | "words" | "sentences";

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
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-2 py-2 z-40">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <GameButton
            key={screen}
            variant={currentScreen === screen ? "primary" : "ghost"}
            size="sm"
            onClick={() => onNavigate(screen)}
            className="flex flex-col items-center gap-1 h-auto py-2 px-4"
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-bold">{label}</span>
          </GameButton>
        ))}
      </div>
    </nav>
  );
};
