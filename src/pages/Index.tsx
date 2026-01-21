import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { LettersScreen } from "@/components/screens/LettersScreen";
import { WordsScreen } from "@/components/screens/WordsScreen";
import { SentencesScreen } from "@/components/screens/SentencesScreen";
import { MatchingGameScreen } from "@/components/screens/MatchingGameScreen";
import { SpellingGameScreen } from "@/components/screens/SpellingGameScreen";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showHebrew, setShowHebrew] = useState(true);

  // Initialize speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleToggleHebrew = () => {
    setShowHebrew((prev) => !prev);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "letters":
        return (
          <LettersScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "words":
        return (
          <WordsScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "sentences":
        return (
          <SentencesScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "matching":
        return (
          <MatchingGameScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "spelling":
        return (
          <SpellingGameScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default Index;
