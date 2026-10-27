import { useState, useCallback } from "react";
import { Volume2, ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { vocabularyManager, letters, letterSounds } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";

interface LettersScreenProps {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

export const LettersScreen = ({
  showHebrew,
  onToggleHebrew,
}: LettersScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWords, setCurrentWords] = useState(() => 
    vocabularyManager.getWordsForLetter(letters[0].letter, 10)
  );
  const { speakWord, isSpeaking, speechProps } = useSpeech();

  const currentLetter = letters[currentIndex];
  const currentSounds = letterSounds[currentLetter.letter] || [];

  const handlePlayUppercase = () => {
    speakWord(`Uppercase ${currentLetter.letter}`, "uppercase");
  };

  const handlePlayLowercase = () => {
    speakWord(`Lowercase ${currentLetter.lowercase}`, "lowercase");
  };

  const handlePlaySound = (example: string) => {
    speakWord(example, `sound-${example}`);
  };

  // Highlight the target letter in a word
  const highlightLetter = (word: string, letter: string) => {
    const upperLetter = letter.toUpperCase();
    const lowerLetter = letter.toLowerCase();
    
    return word.split('').map((char, index) => {
      if (char === upperLetter || char === lowerLetter) {
        return (
          <span key={index} className="text-primary font-black">
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  const handlePlayWord = (word: string) => {
    speakWord(word, `word-${word}`);
  };

  const handleShuffle = useCallback(() => {
    const newWords = vocabularyManager.getWordsForLetter(currentLetter.letter, 10);
    setCurrentWords(newWords);
  }, [currentLetter.letter]);

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % letters.length;
    setCurrentIndex(nextIndex);
    setCurrentWords(vocabularyManager.getWordsForLetter(letters[nextIndex].letter, 10));
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + letters.length) % letters.length;
    setCurrentIndex(prevIndex);
    setCurrentWords(vocabularyManager.getWordsForLetter(letters[prevIndex].letter, 10));
  };

  const goToLetter = (index: number) => {
    setCurrentIndex(index);
    setCurrentWords(vocabularyManager.getWordsForLetter(letters[index].letter, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      {/* Hebrew toggle */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onToggleHebrew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
        >
          <span className="text-lg">🇮🇱</span>
          <span className={showHebrew ? "text-foreground" : "text-muted-foreground"}>
            {showHebrew ? "עברית" : "Hebrew"}
          </span>
        </button>
      </div>

      {/* Letter display - both uppercase and lowercase */}
      <div className="flex flex-col items-center mt-4">
        <div className="relative flex items-center gap-4">
          <div className="flex flex-col items-center">
            <GameButton
              variant="letter"
              size="icon-xl"
              {...speechProps("uppercase")}
              onClick={handlePlayUppercase}
              disabled={isSpeaking}
              className="w-28 h-28 md:w-36 md:h-36 text-6xl md:text-7xl relative"
            >
              {currentLetter.letter}
            </GameButton>
            <span className="text-xs mt-1 text-muted-foreground font-bold">Uppercase</span>
          </div>
          <div className="flex flex-col items-center">
            <GameButton
              variant="letter"
              size="icon-xl"
              {...speechProps("lowercase")}
              onClick={handlePlayLowercase}
              disabled={isSpeaking}
              className="w-28 h-28 md:w-36 md:h-36 text-6xl md:text-7xl relative bg-gradient-to-br from-secondary to-secondary/80"
            >
              {currentLetter.lowercase}
            </GameButton>
            <span className="text-xs mt-1 text-muted-foreground font-bold">Lowercase</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          <p className="text-lg text-muted-foreground font-semibold">
            Tap to hear the letter name!
          </p>
        </div>
      </div>

      {/* Letter sounds section */}
      {currentSounds.length > 0 && (
        <div className="mt-4 px-4">
          <h3 className="text-center text-lg font-bold text-foreground mb-2">
            Sounds of <span className="text-primary">{currentLetter.letter}</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {currentSounds.map((soundData, index) => (
              <GameButton
                key={index}
                variant="accent"
                size="sm"
                {...speechProps(`sound-${soundData.example}`)}
                onClick={() => handlePlaySound(soundData.example)}
                className="flex-col py-3 px-4 h-auto min-h-[2.5rem]"
              >
                <span className="text-lg font-bold">{soundData.sound}</span>
                <span className="text-xs opacity-80">
                  {soundData.type === "consonant" ? "consonant" : `${soundData.type} vowel`}
                </span>
                <span className="text-xs opacity-60">{soundData.example}</span>
              </GameButton>
            ))}
          </div>
        </div>
      )}

      {/* Navigation arrows */}
      <div className="flex justify-center items-center gap-8 mt-4">
        <GameButton
          variant="ghost"
          size="icon"
          onClick={goPrev}
          className="rounded-full"
        >
          <ArrowLeft className="h-8 w-8" />
        </GameButton>

        <span className="text-muted-foreground font-bold">
          {currentIndex + 1} / {letters.length}
        </span>

        <GameButton
          variant="ghost"
          size="icon"
          onClick={goNext}
          className="rounded-full"
        >
          <ArrowRight className="h-8 w-8" />
        </GameButton>
      </div>

      {/* Example words - show all 10 by default */}
      <div className="mt-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground">
            Words with <span className="text-primary">{currentLetter.letter}{currentLetter.lowercase}</span>
          </h3>
          <GameButton
            variant="accent"
            size="sm"
            onClick={handleShuffle}
            className="gap-1"
          >
            <Shuffle className="h-4 w-4" />
            New Words
          </GameButton>
        </div>

        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          {currentWords.map((wordData, index) => {
            const startsWithUpper = wordData.english[0] === wordData.english[0].toUpperCase() &&
              wordData.english[0].toUpperCase() === currentLetter.letter;
            return (
              <GameButton
                key={`${wordData.english}-${index}`}
                variant="word"
                size="lg"
                {...speechProps(`word-${wordData.english}`)}
                onClick={() => handlePlayWord(wordData.english)}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <span className="text-xl">{highlightLetter(wordData.english, currentLetter.letter)}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    startsWithUpper 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary/50 text-secondary-foreground"
                  }`}>
                    {startsWithUpper ? "A" : "a"}
                  </span>
                </div>
                {showHebrew && (
                  <span className="text-lg text-muted-foreground" dir="rtl">
                    {wordData.hebrew}
                  </span>
                )}
              </GameButton>
            );
          })}
        </div>
      </div>

      {/* Letter grid quick navigation */}
      <div className="mt-6 px-2">
        <div className="grid grid-cols-9 gap-1 max-w-md mx-auto">
          {letters.map((l, index) => (
            <button
              key={l.letter}
              onClick={() => goToLetter(index)}
              className={`
                aspect-square rounded-lg text-sm font-bold transition-all
                ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "bg-muted text-muted-foreground hover:bg-primary/20"
                }
              `}
            >
              {l.letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
