import { BookOpen, Sparkles, MessageSquare, Home, Gamepad2 } from "lucide-react";
import { GameButton } from "./ui/game-button";
import { Screen, GAME_SCREENS } from "@/data/screens";

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
    { screen: "games" as Screen, icon: Gamepad2, label: "Games" },
  ];

  const isActive = (screen: Screen) =>
    screen === "games" ? currentScreen === "games" || GAME_SCREENS.includes(currentScreen) : currentScreen === screen;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-1 py-2 z-40">
      <div className="flex justify-around items-center max-w-xl mx-auto gap-1">
        {navItems.map(({ screen, icon: Icon, label }) => (
          <GameButton
            key={screen}
            variant={isActive(screen) ? "primary" : "ghost"}
            size="sm"
            onClick={() => onNavigate(screen)}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2 px-1 min-w-[56px]"
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-bold">{label}</span>
          </GameButton>
        ))}
      </div>
    </nav>
  );
};
