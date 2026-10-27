import { describe, it, expect } from 'vitest';
import { isPictorialEmoji, vocabularyManager } from '../data/vocabulary';

// Rule: plain text signs ("=" and similar) must never be shown as word pictures.
describe('isPictorialEmoji', () => {
  it('rejects plain ASCII signs', () => {
    expect(isPictorialEmoji('=')).toBe(false);
    expect(isPictorialEmoji('+')).toBe(false);
    expect(isPictorialEmoji('?')).toBe(false);
  });

  it('rejects text-drawing symbols like the old rectangle bar and outline shapes', () => {
    expect(isPictorialEmoji('▬')).toBe(false);
    expect(isPictorialEmoji('⬠')).toBe(false);
    expect(isPictorialEmoji('⬡')).toBe(false);
    expect(isPictorialEmoji('→')).toBe(false);
  });

  it('accepts real pictures', () => {
    expect(isPictorialEmoji('⚽')).toBe(true);
    expect(isPictorialEmoji('🖼️')).toBe(true);
    expect(isPictorialEmoji('🖐️')).toBe(true);
    expect(isPictorialEmoji('⭐')).toBe(true);
  });

  it('treats missing icons as non-pictorial', () => {
    expect(isPictorialEmoji('')).toBe(false);
    expect(isPictorialEmoji(undefined)).toBe(false);
  });
});

// Rule: words carrying sign-like icons are sanitized on load and never
// reach the picture-based screens (Match, Listen & Pick).
describe('vocabulary icon sanitization', () => {
  it('loads "Is" without the "=" sign icon', () => {
    const is = vocabularyManager.findWord('Is');
    expect(is).toBeDefined();
    expect(is!.emoji).not.toBe('=');
  });

  it('only offers match words with real pictures', () => {
    const words = vocabularyManager.getWordsForMatching(50);
    expect(words.length).toBeGreaterThan(0);
    for (const w of words) {
      expect(isPictorialEmoji(w.emoji)).toBe(true);
    }
  });

  it('only offers listening words with real pictures', () => {
    const words = vocabularyManager.getWordsForListening();
    expect(words.length).toBeGreaterThan(0);
    for (const w of words) {
      expect(isPictorialEmoji(w.emoji)).toBe(true);
    }
  });
});
