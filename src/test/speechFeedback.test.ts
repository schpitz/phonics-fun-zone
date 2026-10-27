import { act, renderHook, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpeech } from "@/hooks/useSpeech";

class MockUtterance {
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onboundary: ((event: { name: string; charIndex: number }) => void) | null = null;
  constructor(public text: string) {}
}
let utterances: MockUtterance[];
beforeEach(() => {
  utterances = [];
  vi.stubGlobal("SpeechSynthesisUtterance", MockUtterance);
  vi.stubGlobal("speechSynthesis", {
    cancel: vi.fn(), getVoices: () => [],
    speak: (utterance: MockUtterance) => utterances.push(utterance),
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("shared speech source lifecycle", () => {
  it("marks only the source whose audio has started, then clears it on completion", () => {
    const { result } = renderHook(useSpeech);
    act(() => result.current.speakWord("apple", "apple-card"));
    expect(result.current.speakingSource).toBeNull();
    act(() => utterances[0].onstart?.());
    expect(result.current.speakingSource).toBe("apple-card");
    expect(result.current.speechProps("other-card")["aria-busy"]).toBe(false);
    act(() => utterances[0].onend?.());
    expect(result.current.speakingSource).toBeNull();
  });
  it("replaces playback across hook instances and ignores stale callbacks", () => {
    const a = renderHook(useSpeech);
    const b = renderHook(useSpeech);
    act(() => { a.result.current.speakWord("cat", "cat"); utterances[0].onstart?.(); });
    act(() => { b.result.current.speakWord("dog", "dog"); utterances[1].onstart?.(); });
    expect(a.result.current.speakingSource).toBeNull();
    act(() => { utterances[0].onstart?.(); utterances[0].onend?.(); });
    expect(a.result.current.speakingSource).toBeNull();
    expect(b.result.current.speakingSource).toBe("dog");
  });
  it("clears feedback on error and stop", () => {
    const { result } = renderHook(useSpeech);
    act(() => { result.current.speakWord("cat", "cat"); utterances[0].onstart?.(); });
    act(() => utterances[0].onerror?.());
    expect(result.current.isSpeaking).toBe(false);
    act(() => { result.current.speakWord("dog", "dog"); utterances[1].onstart?.(); });
    act(() => result.current.stop());
    expect(result.current.speakingSource).toBeNull();
  });
  it("tracks sentence boundaries without losing its source", () => {
    const { result } = renderHook(useSpeech);
    act(() => { result.current.speak("We  like cats", 0.5, true, "sentence"); utterances[0].onstart?.(); });
    act(() => utterances[0].onboundary?.({ name: "word", charIndex: 9 }));
    expect(result.current.currentWordIndex).toBe(2);
    expect(result.current.speakingSource).toBe("sentence");
  });
  it("does not start delayed speech after its page unmounts", () => {
    const { result, unmount } = renderHook(useSpeech);
    const delayedSpeak = result.current.speakWord;
    unmount();
    act(() => delayedSpeak("cat", "cat"));
    expect(utterances).toHaveLength(0);
  });
});