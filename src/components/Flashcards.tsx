import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, Check } from "lucide-react";
import { GameButton } from "./ui/game-button";
import { UnifiedWord } from "@/data/vocabulary";
import { useSpeech } from "@/hooks/useSpeech";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface FlashcardsProps {
  words: UnifiedWord[];
  showHebrew: boolean;
}

/** Flip-card deck: front = picture + English, back = Hebrew + category. Swipe or arrows to move. */
export const Flashcards = ({ words, showHebrew }: FlashcardsProps) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const { speakWord, speechProps } = useSpeech();
  const { playPop, playFanfare } = useSoundEffects();
  const swipeX = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
  }, [words]);

  const word = words[index];
  if (!word) return null;

  const go = (dir: number) => {
    const next = Math.min(words.length - 1, Math.max(0, index + dir));
    if (next === index) return;
    setIndex(next);
    setFlipped(false);
    playPop();
    speakWord(words[next].english, "flashcard");
  };

  const toggleKnown = () => {
    const s = new Set(known);
    if (s.has(word.english)) s.delete(word.english);
    else {
      s.add(word.english);
      if (s.size === words.length) playFanfare();
      else playPop();
    }
    setKnown(s);
  };

  const isKnown = known.has(word.english);

  return (
    <div className="mt-6 flex flex-col items-center">
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-4">
        {words.map((w, i) => (
          <span
            key={w.english + i}
            className={`h-3 w-3 rounded-full transition-all ${
              known.has(w.english) ? "bg-success" : i === index ? "bg-primary scale-125" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <div
        {...speechProps("flashcard")}
        className="w-[280px] h-[340px] [perspective:1000px] cursor-pointer select-none"
        style={{ touchAction: "pan-y" }}
        onClick={() => { setFlipped((f) => !f); playPop(); }}
        onPointerDown={(e) => (swipeX.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 50) { e.stopPropagation(); go(dx < 0 ? 1 : -1); }
        }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-card border-4 border-primary rounded-3xl shadow-lg flex flex-col items-center justify-center gap-3 p-4">
            {isKnown && <Check className="absolute top-3 right-3 h-7 w-7 text-success" />}
            <span className="text-8xl">{word.emoji}</span>
            <span className={`font-black text-foreground text-center leading-tight ${word.english.length > 9 ? "text-3xl" : "text-5xl"}`}>
              {word.english}
            </span>
            <span className="text-xs text-muted-foreground">Tap to flip</span>
          </div>
          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-secondary/15 border-4 border-secondary rounded-3xl shadow-lg flex flex-col items-center justify-center gap-3 p-4">
            <span className="text-5xl">{word.emoji}</span>
            <span className="text-3xl font-black text-foreground">{word.english}</span>
            {showHebrew && (
              <span className="text-4xl font-bold text-foreground" dir="rtl">{word.hebrew}</span>
            )}
            <span className="text-sm font-bold text-muted-foreground bg-muted rounded-full px-3 py-1">{word.category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-5 w-full max-w-sm">
        <GameButton variant="ghost" size="sm" className="px-2" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">
          <ChevronLeft className="h-8 w-8" />
        </GameButton>
        <GameButton variant="primary" size="sm" className="px-4" {...speechProps("flashcard-audio")} onClick={() => speakWord(word.english, "flashcard-audio")} aria-label="Hear word">
          <Volume2 className="h-7 w-7" />
        </GameButton>
        <GameButton variant={isKnown ? "success" : "ghost"} size="sm" onClick={toggleKnown} className="gap-1 px-3">
          <Check className="h-6 w-6" /> I know it
        </GameButton>
        <GameButton variant="ghost" size="sm" className="px-2" onClick={() => go(1)} disabled={index === words.length - 1} aria-label="Next">
          <ChevronRight className="h-8 w-8" />
        </GameButton>
      </div>
      <p className="mt-2 text-sm text-muted-foreground font-bold">{index + 1} / {words.length}</p>
    </div>
  );
};
