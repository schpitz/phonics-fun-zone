# 📐 ABC Fun — Code Architecture

## Overview

Single-page React application with client-side routing, no backend. All data is stored in `localStorage` via a vocabulary manager class. The app is structured around seven learning screens accessed through a bottom navigation bar.

## Directory Structure

```
src/
├── App.tsx                  # Root: providers, router, toasters
├── main.tsx                 # Entry point
├── index.css                # Tailwind config, CSS variables, design tokens
├── pages/
│   ├── Index.tsx             # Main page — screen state machine + admin gate
│   └── NotFound.tsx
├── components/
│   ├── Navigation.tsx        # Fixed bottom nav bar (7 tabs)
│   ├── screens/
│   │   ├── HomeScreen.tsx    # Landing menu with secret admin tap
│   │   ├── LettersScreen.tsx # A-Z alphabet learning
│   │   ├── WordsScreen.tsx   # Vocabulary cards with categories
│   │   ├── SentencesScreen.tsx # Read-along with word highlighting
│   │   ├── MatchingGameScreen.tsx # Memory-style pair matching
│   │   ├── SpellingGameScreen.tsx # Letter-by-letter word building
│   │   └── SortingGameScreen.tsx  # Category-based word sorting
│   ├── admin/
│   │   ├── AdminLogin.tsx    # Credentials gate (hardcoded, localStorage session)
│   │   ├── AdminPanel.tsx    # Tabbed manager (Words / Sentences)
│   │   ├── VocabularyManager.tsx # CRUD for words + per-screen toggles
│   │   └── SentencesManager.tsx  # CRUD for sentences
│   └── ui/                  # shadcn/ui primitives + custom game-button
├── data/
│   └── vocabulary.ts         # Unified data layer (see below)
└── hooks/
    ├── useSpeech.ts          # Web Speech API wrapper
    ├── useSoundEffects.ts    # Game sound effects
    ├── use-mobile.tsx        # Viewport detection
    └── use-toast.ts          # Toast hook
```

## Key Architectural Decisions

### 1. Screen State Machine (`Index.tsx`)

Navigation uses a `useState<Screen>` instead of URL routes. All seven screens (`home`, `letters`, `words`, `sentences`, `matching`, `spelling`, `sorting`) render inside the same `/` route. The admin flow short-circuits rendering when `showAdminLogin` or `isAdminLoggedIn` is true.

### 2. Unified Vocabulary System (`vocabulary.ts`)

Single source of truth for all words. Key design:

- **`UnifiedWord` interface**: Each word has `english`, `hebrew`, `category`, `emoji`, `difficulty` (1-5), `vowelType`, and five boolean flags (`enabledForABC`, `enabledForWords`, `enabledForMatching`, `enabledForSpelling`, `enabledForSorting`) controlling which screens display it.
- **`FRANCHISE_CATEGORIES`**: Categories like "Mario", "Sonic", "Paw Patrol", and "Star Wars" are grouped as franchise categories. Words in these categories have `enabledForMatching` and `enabledForSorting` set to `false` by default to keep game content focused on general vocabulary.
- **`VocabularyManager` class**: Singleton that handles:
  - Loading/saving to `localStorage`
  - Auto-merging new default words and sentences into existing saved data (so updates ship without losing user edits)
  - Auto-migrating new flags (e.g. `enabledForSorting`) from existing flags on first load
  - Filtering words by screen, category, or difficulty
  - CRUD for sentences
  - Shuffling utilities
- **~1,000 default words** across 25+ categories: Animals, Food, Colors, Body, Family, Numbers, Sports, Nature, Objects, Clothes, Places, Vehicles, Technology, Countries, Weather, School, Music, Time, Actions, Shapes, Insects, Sea Animals, Birds, Adjectives, Garden, Soccer, Mario, Sonic, Paw Patrol, Star Wars.
- **~200 default sentences** across 20+ topics, each 3–5 words long, with synchronized word-by-word highlighting during playback.

### 3. Text-to-Speech (`useSpeech.ts`)

Wraps the Web Speech API with:
- Preferred voice selection (Samantha, Google US English, Microsoft Zira)
- Separate rate settings for letters (0.55), words (0.55), and sentences (0.5)
- Adjustable speed multiplier (0.5x–2x) for sentence playback
- Word-by-word tracking via `onboundary` events for synchronized highlighting
- Speaking state tracking for UI feedback

### 4. Admin System

- **Access**: Hidden behind 5-tap detection on home screen footer
- **Auth**: Hardcoded credentials with 1-hour `localStorage` session, 5-attempt lockout
- **Management**: Full CRUD for vocabulary words and sentences via `VocabularyManager`
- **Per-screen toggles**: Each word can be individually enabled/disabled for ABC, Words, Match, Spell, and Sort screens

### 5. Styling

- **Design tokens** defined as CSS variables in `index.css` (HSL format)
- **Tailwind semantic classes** (`bg-primary`, `text-foreground`, etc.) — no raw colors in components
- **`GameButton`** custom variant component with kid-friendly sizes and color variants (`primary`, `secondary`, `accent`, `highlight`, `success`, `ghost`, `outline`, `word`, `letter`)
- **Animations**: CSS keyframes (`float`, `bounce`, `glow`) defined in `index.css` and `tailwind.config.ts`

### 6. PWA

Configured via `vite-plugin-pwa` in `vite.config.ts`:
- Auto-updating service worker
- Custom icons (192px, 512px)
- Standalone display mode, portrait orientation
- Workbox runtime caching for Google Fonts

## Data Flow

```
defaultVocabulary (hardcoded ~1,000 words)
defaultSentences  (hardcoded ~200 sentences)
        │
        ▼
VocabularyManager.loadFromStorage()
        │
        ├── localStorage empty? → use defaults
        └── localStorage has data? → merge new defaults + migrate new flags
        │
        ▼
  this.vocabulary / this.sentences (runtime arrays)
        │
        ├── getWordsForScreen(screen) → filtered words
        ├── getAllSentences() / getRandomSentences(n)
        ├── addWord() / updateWord() / deleteWord()
        ├── addSentence() / updateSentence() / deleteSentence()
        └── saveVocabulary() / saveSentences() → localStorage
```

## Adding New Content

**Words**: Add entries to the `allWords` array in `vocabulary.ts`. They'll auto-merge into existing user data on next load.

**Sentences**: Add entries to the `defaultSentences` array. Same auto-merge behavior.

**New Screen**: Add to the `Screen` type in `Index.tsx`, create component in `screens/`, add to `renderScreen()` switch, add nav item in `Navigation.tsx`. Add a corresponding `enabledFor*` flag to `UnifiedWord` and update the admin `VocabularyManager` to include a toggle.

## Sentence Builder & Listen & Pick
- Screens: `SentenceBuilderScreen.tsx`, `ListenPickScreen.tsx` (screen ids `builder`, `listening`).
- Difficulty rules live in `src/data/gameRules.ts` (tested in `src/test/newGames.test.ts`).
- Shared UI: `LevelSelector.tsx`, `HebrewToggle.tsx`.
- Data: `UnifiedWord.enabledForListening` (migrated from `enabledForMatching`), `SentenceData.enabledForBuilder` (missing = true). Helpers `getWordsForListening`, `getDistractors`/`pickDistractors`, `getSentencesByLength`, `findWord`.

## Navigation & UX (update)
- Bottom bar has 5 tabs: Home, ABC, Words, Read, Games. `src/data/screens.ts` defines the `Screen` type and `GAME_SCREENS`; the Games tab opens `GamesScreen` (hub) and stays highlighted inside any game.
- Sort: tap a basket to sort the current word (tap-to-sort); dragging the card with finger/mouse also works (pointer events). Tapping the 🔊 basket label only speaks its name.
- Words: Grid / Flashcards toggle. `Flashcards.tsx` = flip card (front picture + English, back Hebrew + category), swipe or arrows, "I know it" progress dots.
- `useSoundEffects`: `playSuccess` (arpeggio), `playError` (soft boing), `playPop`, `playFanfare` (round complete). Celebration uses a center confetti burst, still auto-hides within 2s.
