import { describe, it, expect } from "vitest";
import { getListenConfig, getBuilderConfig } from "@/data/gameRules";
import { pickDistractors, vocabularyManager } from "@/data/vocabulary";

describe("Listen & Pick levels", () => {
  it("shows 3 / 4 / 6 pictures", () => {
    expect(getListenConfig(1).options).toBe(3);
    expect(getListenConfig(2).options).toBe(4);
    expect(getListenConfig(3).options).toBe(6);
  });
  it("distractors never repeat the target and Hard uses same category", () => {
    const pool = vocabularyManager.getWordsForListening();
    const target = pool.find(w => w.category === "Animals")!;
    for (let i = 0; i < 20; i++) {
      const d = pickDistractors(target, pool, 5, true);
      expect(d.length).toBe(5);
      expect(d.some(w => w.id === target.id || w.emoji === target.emoji)).toBe(false);
      expect(d.every(w => w.category === target.category)).toBe(true);
    }
  });
});

describe("Sentence Builder levels", () => {
  it("uses 3 / 4 / 5-word sentences", () => {
    for (const [lvl, n] of [[1, 3], [2, 4], [3, 5]] as const) {
      expect(getBuilderConfig(lvl).sentenceLength).toBe(n);
      const s = vocabularyManager.getSentencesByLength(n, 5);
      expect(s.length).toBeGreaterThan(0);
      expect(s.every(x => x.words.length === n)).toBe(true);
    }
  });
});
