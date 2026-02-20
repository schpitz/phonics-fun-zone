# 📐 ABC Fun — Code Architecture

## Overview

Single-page React application with client-side routing, no backend. All data is stored in `localStorage` via a vocabulary manager class. The app is structured around six learning screens accessed through a bottom navigation bar.

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
│   ├── Navigation.tsx        # Fixed bottom nav bar (6 tabs)
│   ├── screens/
│   │   ├── HomeScreen.tsx    # Landing menu with secret admin tap
│   │   ├── LettersScreen.tsx # A-Z alphabet learning
│   │   ├── WordsScreen.tsx   # Vocabulary cards with categories
│   │   ├── SentencesScreen.tsx # Read-along with word highlighting
│   │   ├── MatchingGameScreen.tsx # Memory-style pair matching
│   │   └── SpellingGameScreen.tsx # Letter-by-letter word building
│   ├── admin/
│   │   ├── AdminLogin.tsx    # Credentials gate (hardcoded, localStorage session)
│   │   ├── AdminPanel.tsx    # Tabbed manager (Words / Sentences)
│   │   ├── VocabularyManager.tsx # CRUD for words
│   │   └── SentencesManager.tsx  # CRUD for sentences
│   └── ui/                  # shadcn/ui primitives + custom game-button
├── data/
│   └── vocabulary.ts         # Unified data layer (see below)
└── hooks/
    ├── useSpeech.ts          # Web Speech API wrapper
    ├── use-mobile.tsx        # Viewport detection
    └── use-toast.ts          # Toast hook
```

## Key Architectural Decisions

### 1. Screen State Machine (`Index.tsx`)

Navigation uses a `useState<Screen>` instead of URL routes. All six screens (`home`, `letters`, `words`, `sentences`, `matching`, `spelling`) render inside the same `/` route. The admin flow short-circuits rendering when `showAdminLogin` or `isAdminLoggedIn` is true.

### 2. Unified Vocabulary System (`vocabulary.ts`)

Single source of truth for all words. Key design:

- **`UnifiedWord` interface**: Each word has `english`, `hebrew`, `category`, `emoji`, `difficulty` (1-5), `vowelType`, and four boolean flags (`enabledForABC`, `enabledForWords`, `enabledForMatching`, `enabledForSpelling`) controlling which screens display it.
- **`VocabularyManager` class**: Singleton that handles:
  - Loading/saving to `localStorage`
  - Auto-merging new default words into existing saved data (so updates ship without losing user edits)
  - Filtering words by screen, category, or difficulty
  - CRUD for sentences
  - Shuffling utilities
- **~500 default words** across categories: Animals, Food, Colors, Body, Family, Numbers, Sports, Nature, Objects, Clothes, Places, Vehicles, Technology, Countries.

### 3. Text-to-Speech (`useSpeech.ts`)

Wraps the Web Speech API with:
- Preferred voice selection (Samantha, Google US English, Microsoft Zira)
- Separate rate settings for letters (0.55), words (0.55), and sentences (0.5)
- Speaking state tracking for UI feedback

### 4. Admin System

- **Access**: Hidden behind 5-tap detection on home screen footer
- **Auth**: Hardcoded credentials with 1-hour `localStorage` session, 5-attempt lockout
- **Management**: Full CRUD for vocabulary words and sentences via `VocabularyManager`

### 5. Styling

- **Design tokens** defined as CSS variables in `index.css` (HSL format)
- **Tailwind semantic classes** (`bg-primary`, `text-foreground`, etc.) — no raw colors in components
- **`GameButton`** custom variant component extending shadcn Button with kid-friendly sizes and color variants (`primary`, `secondary`, `accent`, `highlight`, `success`, `ghost`)
- **Animations**: CSS keyframes (`float`, `bounce`, `glow`) defined in `index.css` and `tailwind.config.ts`

### 6. PWA

Configured via `vite-plugin-pwa` in `vite.config.ts`:
- Auto-updating service worker
- Custom icons (192px, 512px)
- Standalone display mode, portrait orientation
- Workbox runtime caching for Google Fonts

## Data Flow

```
defaultVocabulary (hardcoded ~500 words)
        │
        ▼
VocabularyManager.loadFromStorage()
        │
        ├── localStorage empty? → use defaults
        └── localStorage has data? → merge new defaults in
        │
        ▼
  this.vocabulary (runtime array)
        │
        ├── getWordsForScreen(screen) → filtered words
        ├── addWord() / updateWord() / deleteWord()
        └── saveVocabulary() → localStorage
```

## Adding New Content

**Words**: Add entries to the `allWords` array in `vocabulary.ts`. They'll auto-merge into existing user data on next load.

**Sentences**: Add entries to the `defaultSentences` array. Same auto-merge behavior.

**New Screen**: Add to the `Screen` type in `Index.tsx`, create component in `screens/`, add to `renderScreen()` switch, add nav item in `Navigation.tsx`.
