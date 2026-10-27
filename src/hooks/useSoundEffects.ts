import { useCallback, useRef } from "react";

type Note = { freq: number; at: number; dur: number; type?: OscillatorType; vol?: number };

export const useSoundEffects = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
    return ctxRef.current;
  }, []);

  const playNotes = useCallback((notes: Note[]) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      notes.forEach(({ freq, at, dur, type = "triangle", vol = 0.22 }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.value = freq;
        const start = now + at;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(vol, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.start(start);
        osc.stop(start + dur + 0.02);
      });
    } catch {}
  }, [getCtx]);

  /** Happy rising arpeggio (C-E-G) for a correct answer */
  const playSuccess = useCallback(() => {
    playNotes([
      { freq: 523.25, at: 0, dur: 0.18 },
      { freq: 659.25, at: 0.09, dur: 0.18 },
      { freq: 783.99, at: 0.18, dur: 0.35 },
    ]);
  }, [playNotes]);

  /** Short soft "pop" for placing / tapping */
  const playPop = useCallback(() => {
    playNotes([{ freq: 880, at: 0, dur: 0.08, type: "sine", vol: 0.15 }]);
  }, [playNotes]);

  /** Fanfare for finishing a whole round */
  const playFanfare = useCallback(() => {
    playNotes([
      { freq: 523.25, at: 0, dur: 0.15 },
      { freq: 659.25, at: 0.12, dur: 0.15 },
      { freq: 783.99, at: 0.24, dur: 0.15 },
      { freq: 1046.5, at: 0.36, dur: 0.5, vol: 0.25 },
      { freq: 783.99, at: 0.36, dur: 0.5, vol: 0.12 },
    ]);
  }, [playNotes]);

  /** Gentle, friendly "boing" (falling tone) for a wrong answer */
  const playError = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.35);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch {}
  }, [getCtx]);

  return { playSuccess, playError, playPop, playFanfare };
};
