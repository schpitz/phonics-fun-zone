# 🎓 ABC Fun - Learn English!

A colorful, interactive English learning web app designed for kids (ages 7-9). Built as a Progressive Web App (PWA) so it can be installed on any device.

![ABC Fun](public/icon-512.png)

## ✨ Features

- **Letters A-Z** — Learn the alphabet with audio pronunciation
- **Words** — Explore 500+ vocabulary words with Hebrew translations and emojis
- **Sentences** — Read along with highlighted word-by-word playback
- **Matching Game** — Find English-Hebrew word pairs
- **Spelling Game** — Build words letter by letter
- **Sorting Game** — Sort words into the correct category
- **Text-to-Speech** — Native browser speech for all content
- **Admin Panel** — Hidden admin access (5-tap secret) to manage vocabulary and sentences
- **PWA** — Installable on mobile & desktop, works offline

## 📖 Screen-by-Screen Logic

### Home Screen
The landing page with a menu of all activities. Displays large buttons for Letters, Words, and Sentences, and a row of compact buttons for Match, Spell, and Sort mini-games. Contains a hidden admin access trigger — tapping the footer text 5 times opens the admin login.

### Letters A-Z
Displays the 26 letters of the English alphabet as tappable buttons. Selecting a letter speaks it aloud via text-to-speech and shows vocabulary words that start with that letter (filtered by `enabledForABC`).

### Words
Browse vocabulary by category (Animals, Food, Colors, etc.). Each word card shows the English word, Hebrew translation, and emoji. Tapping a card speaks the word. Words are filtered by `enabledForWords`.

### Sentences
Read-along mode with pre-configured sentences. Words are highlighted one-by-one as the sentence is spoken. Sentences are managed via the admin panel.

### Matching Game
A memory-style card game. Cards are laid out in a grid — half show English words, half show their Hebrew translations. Players flip two cards at a time to find matching pairs. Words are filtered by `enabledForMatching`. Franchise categories (Mario, Sonic, Paw Patrol, Star Wars) are disabled by default.

### Spelling Game
A word-building activity. A target word is shown (with emoji and Hebrew hint) and the player must tap letters in the correct order to spell it. Letters are shuffled and include distractors. Words are filtered by `enabledForSpelling`.

### Sorting Game
A categorization activity. Words from multiple categories are shown and the player must drag/tap each word into the correct category bucket. Words are filtered by `enabledForSorting`. Franchise categories are disabled by default.

### Admin Panel
Accessible via the secret 5-tap trigger on the home screen footer. Requires a password (with lockout after 5 failed attempts, 1-hour session). Provides two tabs:
- **Vocabulary Manager** — Add, edit, and delete words. Toggle per-word visibility for each screen (ABC, Words, Match, Spell, Sort). View stats and filter by category.
- **Sentences Manager** — Add, edit, and delete sentences used in the read-along screen.

## 🚀 Getting Started

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Speech | Web Speech API |
| PWA | vite-plugin-pwa + Workbox |
| Routing | React Router DOM |

## 📱 Installation

Since this is a PWA, users can install it directly from Chrome:
- **Desktop**: Click the install icon in the address bar
- **Mobile**: Tap "Add to Home Screen" from the browser menu

## 🔐 Admin Access

Tap the footer text on the home screen **5 times rapidly** to reveal the admin login. From there you can add, edit, or remove vocabulary words and sentences, and toggle which words appear in each game.

## 📄 License

Private project.
