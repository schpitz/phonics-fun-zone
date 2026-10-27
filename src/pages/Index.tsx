import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { LettersScreen } from "@/components/screens/LettersScreen";
import { WordsScreen } from "@/components/screens/WordsScreen";
import { SentencesScreen } from "@/components/screens/SentencesScreen";
import { MatchingGameScreen } from "@/components/screens/MatchingGameScreen";
import { SpellingGameScreen } from "@/components/screens/SpellingGameScreen";
import { SortingGameScreen } from "@/components/screens/SortingGameScreen";
import { SentenceBuilderScreen } from "@/components/screens/SentenceBuilderScreen";
import { ListenPickScreen } from "@/components/screens/ListenPickScreen";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

type Screen = "home" | "letters" | "words" | "sentences" | "matching" | "spelling" | "sorting" | "builder" | "listening";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showHebrew, setShowHebrew] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  // Secret admin access: triple-tap detection
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for existing admin session
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session) {
      try {
        const { expiry } = JSON.parse(session);
        if (Date.now() < expiry) {
          setIsAdminLoggedIn(true);
        } else {
          localStorage.removeItem("admin_session");
        }
      } catch {
        localStorage.removeItem("admin_session");
      }
    }
  }, []);

  // Initialize speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Secret admin access: detect 5 rapid taps on version text
  const handleSecretTap = () => {
    tapCountRef.current += 1;
    
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      setShowAdminLogin(true);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 1000);
    }
  };

  const handleToggleHebrew = () => {
    setShowHebrew((prev) => !prev);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // Show admin screens
  if (showAdminLogin && !isAdminLoggedIn) {
    return (
      <AdminLogin 
        onLogin={handleAdminLogin} 
        onBack={() => setShowAdminLogin(false)} 
      />
    );
  }

  if (isAdminLoggedIn) {
    return (
      <AdminPanel 
        onLogout={handleAdminLogout} 
        onBack={() => setIsAdminLoggedIn(false)} 
      />
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} onSecretTap={handleSecretTap} />;
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
      case "sorting":
        return (
          <SortingGameScreen
            showHebrew={showHebrew}
            onToggleHebrew={handleToggleHebrew}
          />
        );
      case "builder":
        return <SentenceBuilderScreen showHebrew={showHebrew} onToggleHebrew={handleToggleHebrew} />;
      case "listening":
        return <ListenPickScreen showHebrew={showHebrew} onToggleHebrew={handleToggleHebrew} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} onSecretTap={handleSecretTap} />;
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
