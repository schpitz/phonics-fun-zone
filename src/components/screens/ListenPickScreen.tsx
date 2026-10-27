import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Volume2, Shuffle } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { vocabularyManager, UnifiedWord } from "@/data/vocabulary";
import { getListenConfig, LISTEN_ROUND, ThreeLevel } from "@/data/gameRules";
import { useSpeech } from "@/hooks/useSpeech";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { CelebrationFeedback } from "../CelebrationFeedback";
import { LevelSelector, THREE_LEVELS } from "../LevelSelector";
import { HebrewToggle } from "../HebrewToggle";

interface Props {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

const shuffle = <T,>(a: T[]): T[] => {
  const s = [...a];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};

const buildRound = (level: ThreeLevel): UnifiedWord[] => {
  const cfg = getListenConfig(level);
  const pool = vocabularyManager.getWordsForListening().filter((w) => w.difficulty <= cfg.maxDifficulty);
  const seen = new Set<string>();
  return shuffle(pool).filter((w) => (seen.has(w.emoji) ? false : (seen.add(w.emoji), true))).slice(0, LISTEN_ROUND);
};

export const ListenPickScreen = ({ showHebrew, onToggleHebrew }: Props) => {
  const [level, setLevel] = useState<ThreeLevel>(1);
  const [round, setRound] = useState<UnifiedWord[]>(() => buildRound(1));
  const [index, setIndex] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [lastWrong, setLastWrong] = useState<UnifiedWord | null>(null);
  const [playing, setPlaying] = useState<"wrong" | "target" | null>(null);
  const [solved, setSolved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { speakWord, isSpeaking } = useSpeech();
  const { playSuccess, playError } = useSoundEffects();
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearReplay = () => {
    if (replayTimer.current) {
      clearTimeout(replayTimer.current);
      replayTimer.current = null;
    }
  };

  const cfg = getListenConfig(level);
  const target = round[index];

  const options = useMemo(() => {
    if (!target) return [];
    const pool = vocabularyManager.getWordsForListening();
    return shuffle([target, ...vocabularyManager.getDistractors(target, cfg.options - 1, cfg.sameCategory, pool)]);
  }, [target, cfg.options, cfg.sameCategory]);

  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => speakWord(target.english), 400);
    return () => clearTimeout(t);
  }, [target, speakWord]);

  useEffect(() => {
    if (!isSpeaking) setPlaying(null);
  }, [isSpeaking]);

  const startRound = useCallback((lvl: ThreeLevel) => {
    setRound(buildRound(lvl));
    setIndex(0);
    setWrongIds([]);
    setLastWrong(null);
    setPlaying(null);
    setSolved(false);
  }, []);

  const changeLevel = (l: number) => {
    setLevel(l as ThreeLevel);
    startRound(l as ThreeLevel);
  };

  const handlePick = (w: UnifiedWord) => {
    if (solved || !target) return;
    if (w.id === target.id) {
      setSolved(true);
      playSuccess();
      setShowCelebration(true);
      speakWord(target.english);
      setTimeout(() => {
        setShowCelebration(false);
        setSolved(false);
        setWrongIds([]);
        setLastWrong(null);
        setPlaying(null);
        if (index + 1 < round.length) setIndex(index + 1);
        else startRound(level);
      }, 1800);
    } else {
      playError();
      setWrongIds((p) => [...p, w.id]);
      setLastWrong(w);
      setPlaying("wrong");
      speakWord(w.english);
      // After the clicked word finishes, replay the quiz word
      setTimeout(() => {
        setPlaying("target");
        speakWord(target.english);
      }, 2500);
    }
  };

  const cols = cfg.options === 6 ? "grid-cols-3" : cfg.options === 4 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      <HebrewToggle showHebrew={showHebrew} onToggle={onToggleHebrew} />
      <div className="mt-2 text-center">
        <h2 className="text-2xl font-black text-foreground">Listen & Pick! 👂</h2>
        <p className="text-muted-foreground font-semibold mt-1">
          {target ? `${index + 1} / ${round.length}` : ""}
        </p>
      </div>

      <LevelSelector value={level} onChange={changeLevel} levels={THREE_LEVELS} />

      {!target ? (
        <p className="mt-10 text-center text-muted-foreground font-bold">No words available for this game.</p>
      ) : (
        <>
          <div className="mt-6 flex flex-col items-center gap-2">
            <GameButton
              variant="accent"
              size="xl"
              onClick={() => {
                setPlaying("target");
                speakWord(target.english);
              }}
              className={`glow-accent rounded-full h-24 w-24 p-0 transition-all ${playing === "target" ? "ring-8 ring-success/60 scale-110 animate-pulse" : ""}`}
              aria-label="Hear the word"
            >
              <Volume2 className="h-12 w-12" />
            </GameButton>
            {lastWrong && (
              <div className={`flex flex-col items-center gap-1 bg-card rounded-2xl px-5 py-2 shadow-soft border-2 transition-all ${playing === "wrong" ? "border-success ring-4 ring-success/50 scale-105" : "border-accent"}`}>
                <button
                  onClick={() => {
                    setPlaying("wrong");
                    speakWord(lastWrong.english);
                  }}
                  className="flex items-center gap-2 text-2xl font-black text-foreground hover:scale-105 transition-transform"
                  aria-label="Hear the picked word"
                >
                  {lastWrong.english}
                  <Volume2 className={`h-6 w-6 ${playing === "wrong" ? "text-success animate-pulse" : "text-accent"}`} />
                </button>
                {showHebrew && (
                  <p className="text-lg text-muted-foreground font-bold" dir="rtl">{lastWrong.hebrew}</p>
                )}
              </div>
            )}
          </div>

          <div className={`mt-6 grid ${cols} gap-3 max-w-md mx-auto`}>
            {options.map((w) => {
              const isWrong = wrongIds.includes(w.id);
              const reveal = (solved || wrongIds.length > 0) && w.id === target.id;
              return (
                <button
                  key={w.id}
                  onClick={() => handlePick(w)}
                  disabled={isWrong}
                  aria-label="Picture option"
                  className={`aspect-square rounded-3xl bg-card shadow-soft border-4 flex items-center justify-center transition-all
                    ${solved && w.id === target.id ? "border-success scale-105" : ""}
                    ${!solved && reveal ? "border-success animate-pulse" : ""}
                    ${isWrong ? "opacity-30 border-destructive" : ""}
                    ${!isWrong && !reveal && !(solved && w.id === target.id) ? "border-transparent hover:scale-105 active:scale-95" : ""}`}
                >
                  <span className={cfg.options === 6 ? "text-5xl sm:text-6xl" : "text-6xl sm:text-7xl"}>{w.emoji}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-8 flex justify-center">
        <GameButton variant="accent" size="sm" onClick={() => startRound(level)} className="gap-2">
          <Shuffle className="h-4 w-4" />
          New Words
        </GameButton>
      </div>

      <CelebrationFeedback show={showCelebration} />
    </div>
  );
};
