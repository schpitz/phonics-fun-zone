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
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem("english-learning-stars");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showHebrew, setShowHebrew] = useState(true);

  // Save stars to localStorage
  useEffect(() => {
    localStorage.setItem("english-learning-stars", stars.toString());
  }, [stars]);

  // Initialize speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleAddStar = () => {
    setStars((prev) => prev + 1);
  };

  const handleToggleHebrew = () => {
    setShowHebrew((prev) => !prev);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen stars={stars} onNavigate={setCurrentScreen} />;
      case "letters":
        return (
          <LettersScreen
            stars={stars}
            onAddStar={handleAddStar}
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "words":
        return (
          <WordsScreen
            stars={stars}
            onAddStar={handleAddStar}
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "sentences":
        return (
          <SentencesScreen
            stars={stars}
            onAddStar={handleAddStar}
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "matching":
        return (
          <MatchingGameScreen
            stars={stars}
            onAddStar={handleAddStar}
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "spelling":
        return (
          <SpellingGameScreen
            stars={stars}
            onAddStar={handleAddStar}
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      default:
        return <HomeScreen stars={stars} onNavigate={setCurrentScreen} />;
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
