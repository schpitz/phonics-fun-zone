import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Volume2, Shuffle, Undo2 } from "lucide-react";
import { GameButton } from "../ui/game-button";
import { vocabularyManager, SentenceData, normalizeToken } from "@/data/vocabulary";
import { getBuilderConfig, BUILDER_ROUND, ThreeLevel } from "@/data/gameRules";
import { useSpeech } from "@/hooks/useSpeech";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { CelebrationFeedback } from "../CelebrationFeedback";
import { LevelSelector, THREE_LEVELS } from "../LevelSelector";
import { HebrewToggle } from "../HebrewToggle";

interface Props {
  showHebrew: boolean;
  onToggleHebrew: () => void;
}

interface Tile {
  id: number;
  text: string;
  emoji?: string;
}

const shuffle = <T,>(a: T[]): T[] => {
  const s = [...a];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};

export const SentenceBuilderScreen = ({ showHebrew, onToggleHebrew }: Props) => {
  const [level, setLevel] = useState<ThreeLevel>(1);
  const [sentences, setSentences] = useState<SentenceData[]>(() =>
    vocabularyManager.getSentencesByLength(getBuilderConfig(1).sentenceLength, BUILDER_ROUND)
  );
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [checked, setChecked] = useState<boolean[] | null>(null);
  const [solved, setSolved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { speakWord, speak } = useSpeech();
  const { playSuccess, playError } = useSoundEffects();

  const cfg = getBuilderConfig(level);
  const sentence = sentences[index];

  const tiles: Tile[] = useMemo(() => {
    if (!sentence) return [];
    const words = sentence.words;
    const base = words.map((text, i) => ({
      id: i,
      text,
      emoji: cfg.showPictures ? vocabularyManager.findWord(text)?.emoji : undefined,
    }));
    const lower = new Set(words.map(normalizeToken));
    const extras = shuffle(
      vocabularyManager.getAllWords().filter((w) => !w.english.includes(" ") && w.english.length <= 6 && !lower.has(w.english.toLowerCase()))
    )
      .slice(0, cfg.extraTiles)
      .map((w, i) => ({ id: 100 + i, text: w.english.toLowerCase() }));
    return shuffle([...base, ...extras]);
  }, [sentence, cfg.showPictures, cfg.extraTiles]);

  const resetSentence = useCallback(() => {
    setChecked(null);
    setSolved(false);
    setPlaced([]);
  }, []);

  useEffect(() => {
    if (!sentence) return;
    if (cfg.prefillFirst) {
      const first = tiles.find((t) => t.id === 0);
      setPlaced(first ? [first] : []);
    } else setPlaced([]);
    setChecked(null);
    setSolved(false);
  }, [tiles, sentence, cfg.prefillFirst]);

  const loadRound = (lvl: ThreeLevel) => {
    setSentences(vocabularyManager.getSentencesByLength(getBuilderConfig(lvl).sentenceLength, BUILDER_ROUND));
    setIndex(0);
    resetSentence();
  };

  const changeLevel = (l: number) => {
    setLevel(l as ThreeLevel);
    loadRound(l as ThreeLevel);
  };

  const lockedCount = cfg.prefillFirst ? 1 : 0;
  const available = tiles.filter((t) => !placed.some((p) => p.id === t.id));

  const addTile = (t: Tile) => {
    if (solved) return;
    speakWord(t.text.replace(/[!.,?]/g, ""));
    setChecked(null);
    setPlaced((p) => [...p, t]);
  };

  const removeTile = (i: number) => {
    if (solved || i < lockedCount) return;
    setChecked(null);
    setPlaced((p) => p.filter((_, idx) => idx !== i));
  };

  // ---- Pointer drag (mouse + touch) ----
  const dragRef = useRef<{ tile: Tile; from: "bank" | "answer"; index: number; sx: number; sy: number; moved: boolean } | null>(null);
  const [ghost, setGhost] = useState<{ text: string; x: number; y: number } | null>(null);

  const startDrag = (e: React.PointerEvent, tile: Tile, from: "bank" | "answer", index: number) => {
    if (solved || (from === "answer" && index < lockedCount)) return;
    dragRef.current = { tile, from, index, sx: e.clientX, sy: e.clientY, moved: false };
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 8) return;
      d.moved = true;
      e.preventDefault();
      setGhost({ text: d.tile.text, x: e.clientX, y: e.clientY });
    };
    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      dragRef.current = null;
      setGhost(null);
      if (!d) return;
      if (!d.moved) {
        if (d.from === "bank") addTile(d.tile);
        else removeTile(d.index);
        return;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const zone = el?.closest("[data-drop]")?.getAttribute("data-drop");
      const slotAttr = el?.closest("[data-slot]")?.getAttribute("data-slot");
      if (zone === "answer") {
        speakWord(d.tile.text.replace(/[!.,?]/g, ""));
        setChecked(null);
        setPlaced((p) => {
          const list = d.from === "answer" ? p.filter((_, i) => i !== d.index) : [...p];
          let at = slotAttr != null ? Number(slotAttr) : list.length;
          at = Math.max(lockedCount, Math.min(at, list.length));
          list.splice(at, 0, d.tile);
          return list;
        });
      } else if (d.from === "answer") {
        removeTile(d.index);
      }
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  });

  const undo = () => {
    if (solved || placed.length <= lockedCount) return;
    setChecked(null);
    setPlaced((p) => p.slice(0, -1));
  };

  const check = () => {
    if (!sentence || solved) return;
    const target = sentence.words.map(normalizeToken);
    const marks = placed.map((t, i) => normalizeToken(t.text) === target[i]);
    const ok = placed.length === target.length && marks.every(Boolean);
    if (ok) {
      setSolved(true);
      playSuccess();
      setShowCelebration(true);
      speak(sentence.english, 0.5);
      setTimeout(() => {
        setShowCelebration(false);
        if (index + 1 < sentences.length) setIndex(index + 1);
        else loadRound(level);
      }, 2200);
    } else {
      setChecked(marks);
      playError();
      setTimeout(() => speak(sentence.english, 0.5), 450);
    }
  };

  const tileSize = cfg.sentenceLength >= 5 ? "text-lg sm:text-xl px-3 py-2" : "text-xl sm:text-2xl px-4 py-3";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-28 px-4">
      <HebrewToggle showHebrew={showHebrew} onToggle={onToggleHebrew} />
      <div className="mt-2 text-center">
        <h2 className="text-2xl font-black text-foreground">Build the Sentence! 🧱</h2>
        <p className="text-muted-foreground font-semibold mt-1">
          {sentence ? `${index + 1} / ${sentences.length}` : ""}
        </p>
      </div>

      <LevelSelector value={level} onChange={changeLevel} levels={THREE_LEVELS} />

      {!sentence ? (
        <p className="mt-10 text-center text-muted-foreground font-bold">No sentences available for this level.</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mt-5 flex flex-col items-center gap-2">
            <GameButton
              variant="accent"
              size="lg"
              onClick={() => speak(sentence.english, 0.5)}
              className="rounded-full h-16 w-16 p-0 glow-accent"
              aria-label="Hear the sentence"
            >
              <Volume2 className="h-8 w-8" />
            </GameButton>
            {showHebrew && (
              <p className="text-xl text-muted-foreground font-bold text-center" dir="rtl">{sentence.hebrew}</p>
            )}
          </div>

          {/* Answer row */}
          <div
            data-drop="answer"
            className={`mt-5 min-h-[5rem] bg-card rounded-3xl p-3 shadow-soft border-4 border-dashed flex flex-wrap justify-center items-center gap-2
              ${solved ? "border-success" : "border-border"}`}
          >
            {placed.length === 0 && <span className="text-muted-foreground font-semibold">Tap the words below</span>}
            {placed.map((t, i) => {
              const mark = checked?.[i];
              return (
                <button
                  key={`${t.id}-${i}`}
                  data-slot={i}
                  onPointerDown={(e) => startDrag(e, t, "answer", i)}
                  style={{ touchAction: "none" }}
                  className={`relative rounded-2xl font-black transition-all select-none ${i < lockedCount ? "" : "cursor-grab"} ${tileSize}
                    ${solved || mark === true ? "bg-success text-success-foreground" : mark === false ? "bg-destructive text-destructive-foreground" : i < lockedCount ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  <span className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-black flex items-center justify-center shadow-soft">
                    {i + 1}
                  </span>
                  {t.text}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <GameButton variant="success" size="lg" onClick={check} disabled={solved || placed.length === 0} className="min-w-[10rem] text-xl">
              Check
            </GameButton>
            <GameButton variant="ghost" size="lg" onClick={undo} disabled={solved || placed.length <= lockedCount} aria-label="Undo">
              <Undo2 className="h-6 w-6" />
            </GameButton>
          </div>

          {/* Tile bank */}
          <div data-drop="bank" className="mt-6 min-h-[4rem] flex flex-wrap justify-center gap-3">
            {available.map((t) => (
              <button
                key={t.id}
                onPointerDown={(e) => startDrag(e, t, "bank", -1)}
                style={{ touchAction: "none" }}
                className={`cursor-grab select-none rounded-2xl font-black bg-card text-foreground shadow-button border-2 border-border hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 ${tileSize}`}
              >
                {t.emoji && <span className="text-2xl">{t.emoji}</span>}
                {t.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <GameButton variant="accent" size="sm" onClick={() => loadRound(level)} className="gap-2">
          <Shuffle className="h-4 w-4" />
          New Sentences
        </GameButton>
      </div>

      {ghost && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-2xl font-black bg-primary text-primary-foreground shadow-button px-4 py-3 text-xl scale-110"
          style={{ left: ghost.x, top: ghost.y }}
        >
          {ghost.text}
        </div>
      )}

      <CelebrationFeedback show={showCelebration} />
    </div>
  );
};
