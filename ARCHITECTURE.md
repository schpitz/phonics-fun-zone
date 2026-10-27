# Project Architecture

Client-only React + Vite + TypeScript single-page app. No server or database: all content ships in the bundle and admin edits persist in `localStorage`.

## Top-level

```text
/
├── index.html            App shell, title + meta tags
├── vite.config.ts        Vite config, `@` alias -> src, VitePWA (manifest, offline cache)
├── vitest.config.ts      Test runner config (jsdom, src/test/setup.ts)
├── tailwind.config.ts    Theme tokens, custom keyframes (confetti-burst, wiggle, ...)
├── components.json       shadcn/ui generator config
├── public/               Static assets: favicon, PWA icons (192/512), robots.txt
├── README.md             User-facing overview + per-screen logic
├── ARCHITECTURE.md       This file: file organization
├── CODEX.md              Detailed data flow / implementation notes
├── AGENTS.md             Short architecture rules for contributors/agents
└── src/
```

## src/

```text
src/
├── main.tsx              React entry; mounts <App/>
├── App.tsx               Providers (QueryClient, Tooltip, Toaster) + router
├── index.css             Design tokens (HSL CSS variables), global styles,
│                         shared speaking effect for [data-speaking="true"]
├── pages/
│   ├── Index.tsx         Screen state machine: holds current Screen, renders
│   │                     the matching screen + bottom Navigation + admin overlay
│   └── NotFound.tsx      404 route
├── data/
│   ├── screens.ts        `Screen` union type and GAME_SCREENS list
│   ├── vocabulary.ts     Unified word + sentence bank and manager:
│   │                     defaults, localStorage load/merge/save, per-screen
│   │                     flags (enabledForABC/Words/Matching/Spelling/Sorting/
│   │                     Listening, enabledForBuilder), query helpers
│   │                     (getWordsForX, getDistractors, getSentencesByLength,
│   │                     findWord), letter data, icon sanitizing
│   └── gameRules.ts      Pure difficulty configs for Build + Listen
├── hooks/
│   ├── useSpeech.ts      Browser TTS wrapper: rates, voice choice, word-boundary
│   │                     index, speakingSource + speechProps(source) attributes,
│   │                     cross-instance cancel, unmount guard
│   ├── useSoundEffects.ts Web Audio tones: success, error, pop, fanfare
│   ├── use-mobile.tsx    Viewport breakpoint hook
│   └── use-toast.ts      shadcn toast state
├── components/
│   ├── Navigation.tsx        5-tab bottom bar (Games tab active inside games)
│   ├── BackToGamesButton.tsx "← Back" to the Games hub, used in each game
│   ├── LevelSelector.tsx     Shared difficulty button row
│   ├── HebrewToggle.tsx      Show/hide Hebrew translations
│   ├── CelebrationFeedback.tsx Confetti burst, auto-hides within 2s
│   ├── Flashcards.tsx        Flip-card mode used by WordsScreen
│   ├── ProgressBar.tsx, NavLink.tsx, StarBurst.tsx, EncouragementPopup.tsx
│   │                         Small helpers (some legacy/unused)
│   ├── screens/              One file per screen
│   │   ├── HomeScreen.tsx         Menu + hidden 5-tap admin trigger
│   │   ├── LettersScreen.tsx      ABC
│   │   ├── WordsScreen.tsx        Words (Grid / Flashcards)
│   │   ├── SentencesScreen.tsx    Read-along
│   │   ├── GamesScreen.tsx        Games hub
│   │   ├── MatchingGameScreen.tsx
│   │   ├── SpellingGameScreen.tsx
│   │   ├── SortingGameScreen.tsx
│   │   ├── SentenceBuilderScreen.tsx
│   │   └── ListenPickScreen.tsx
│   ├── admin/
│   │   ├── AdminLogin.tsx         Credential gate, lockout, session
│   │   ├── AdminPanel.tsx         Tabs container
│   │   ├── VocabularyManager.tsx  Word CRUD + per-screen toggles
│   │   └── SentencesManager.tsx   Sentence CRUD + builder toggle
│   └── ui/                   shadcn/ui primitives (button, select, dialog, ...)
│                             plus game-button.tsx (kid-sized button variants)
├── lib/utils.ts          `cn()` class merge helper
└── test/                 Vitest suites
    ├── setup.ts               jsdom setup
    ├── newGames.test.ts       Build/Listen rules + vocabulary helpers
    ├── pictorialIcons.test.ts Icon sanitizing (no "=" style signs)
    ├── speechFeedback.test.ts Speaking-source lifecycle
    └── example.test.ts
```

## How it fits together

```text
Navigation / HomeScreen / GamesScreen
        │ onNavigate(screen)
        ▼
pages/Index.tsx ── renders ──► components/screens/<Screen>.tsx
                                   │ reads words/sentences
                                   ├──► data/vocabulary.ts ◄── admin/* (edits, saved to localStorage)
                                   │ rules
                                   ├──► data/gameRules.ts
                                   │ audio
                                   ├──► hooks/useSpeech.ts  (TTS + speechProps glow)
                                   └──► hooks/useSoundEffects.ts
```

## Conventions
- No URL routing between screens; `Index.tsx` switches on the `Screen` id from `data/screens.ts`.
- Every screen reads content only through `vocabulary.ts` helpers, so admin toggles apply everywhere.
- Every spoken, tappable element uses `speechProps(sourceId)` so the speaking glow is identical app-wide.
- Colors come from CSS variables in `index.css`; components use semantic Tailwind classes.
- Rules worth protecting (difficulty sizes, filters) are tested in `src/test/`.
