# Two new games: Sentence Builder and Listen & Pick

## 1. Listen & Pick (listening quiz)
The app says a word out loud, and the child taps the matching picture.
- A big speaker button plays the word. It also plays once by itself when each question starts.
- Picture cards show the emoji from the shared word list, with no text, so the child has to listen.
- Each round has 10 questions. Correct and wrong answers use the same sounds and short celebration (gone within 2 seconds) as the other games.
- After a wrong tap, the correct card glows and the word is said again.
- Difficulty levels, chosen with the same single-row selector the other games use:
  - **Easy**: 3 pictures, short and easy words (difficulty 1–2), and the wrong pictures come from other categories.
  - **Medium**: 4 pictures, difficulty up to 3, and wrong pictures can come from any category.
  - **Hard**: 6 pictures, all difficulties, and the wrong pictures come from the same category (for example animal vs. animal).
- Uses only words that have a picture and are turned on for this game. Movie and TV words are off by default, like in Match and Sort.

## 2. Sentence Builder
The child puts mixed-up word tiles in the right order to make a sentence.
- Sentences come from the existing sentence bank (the same one the Read page uses).
- Hint row: a speaker button plays the whole sentence, and the Hebrew translation can be shown with the Hebrew toggle.
- Tap a tile to move it into the answer row, and tap it again to move it back. Tapping works better than dragging on phones. Each tap also says the word.
- Buttons: Undo (icon) next to a large, centered Check button, the same layout as Spell.
- If the answer is wrong, the error sound plays, the sentence is read aloud, and any tiles in the right place are marked.
- Each round has 5 sentences, with a "New Sentences" button.
- Difficulty levels:
  - **Easy**: 3-word sentences, and the first word is already placed.
  - **Medium**: 4-word sentences.
  - **Hard**: 5-word sentences, plus 1–2 extra wrong tiles taken from the shared word list.
- When a word in a sentence is in the shared word list, its tile shows a small picture as a hint (Easy and Medium only).

## 3. Navigation and home screen
- Home screen: add "Build" and "Listen" as two more rectangle game cards next to Match, Spell and Sort, in the same style.
- Bottom bar: add two tabs, Build and Listen. Spacing gets a little tighter on mobile so all 9 tabs still fit.

## 4. Admin panel
- Add a "Listen" on/off switch for each word, with a badge and a count, like the other games. It starts with the same settings as Match.
- Add a "Use in Sentence Builder" switch to each sentence in the sentence manager. It is on by default.
- Saved words and sentences are updated automatically, so no existing changes are lost.

## 5. Docs
Update the README (what each page does) and the architecture notes.

## Technical details
- New screens `ListenPickScreen.tsx` and `SentenceBuilderScreen.tsx` in `components/screens/`. Add both to the `Screen` type in `Index.tsx`, `renderScreen`, `Navigation.tsx` and `HomeScreen.tsx`.
- `vocabulary.ts`: add `enabledForListening` to `UnifiedWord`, filled in from `enabledForMatching` the first time saved data loads. Add `enabledForBuilder?: boolean` to `SentenceData` (missing means true). Add helpers: `getWordsForScreen('listening')`, `getDistractors(word, count, sameCategory)`, `getSentencesByLength(n)`, and `findWord(english)`, which looks up a tile's emoji while ignoring capitals and punctuation.
- Reuse `useSpeech`, `useSoundEffects`, `CelebrationFeedback`, `GameButton` and the difficulty selector pattern from Spell.
- Add small Vitest tests for the rules: how many pictures each level shows, the sentence length for each level, and that distractors never repeat the target word.
