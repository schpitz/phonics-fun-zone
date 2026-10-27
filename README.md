# 🎓 ABC Fun - Learn English!

A colorful, interactive English learning web app for kids up to age 10 (built for Hebrew-speaking learners). Installable as a Progressive Web App (PWA) on phones, tablets and computers.

![ABC Fun](public/icon-512.png)

> Technical layout of the code: see **[ARCHITECTURE.md](ARCHITECTURE.md)**. Deeper data-flow notes: **[CODEX.md](CODEX.md)**.

## ✨ Features

- **Letters A–Z** — letters, their sounds, and example words with the letter highlighted
- **Words** — 1,000+ words across many categories, Grid or Flashcards mode, Hebrew translations, pictures
- **Read** — 200+ short sentences read aloud with word-by-word gold highlighting and adjustable speed
- **Games hub** — Match, Spell, Sort, Build the Sentence, Listen & Pick (each with a ← Back button to the Games menu)
- **Speaking feedback** — every tappable item that talks glows the same way while it is speaking
- **Sounds & celebrations** — short chimes and a confetti burst that disappears within 2 seconds
- **Hebrew toggle**, **Admin panel** (hidden), **PWA / offline**

## 🧭 Navigation

Bottom bar has 5 large tabs: **Home, ABC, Words, Read, Games**. The Games tab opens a menu of all five games and stays highlighted while playing any of them.

## 📖 Screen-by-Screen Logic

### Home
Large buttons for ABC, Words and Read plus compact buttons for each game. Tapping the footer text 5 times opens the admin login.

### ABC (Letters)
26 letters. Choosing a letter shows uppercase/lowercase, its sounds (tappable), and 10 words (half capitalized) with the target letter highlighted. Uses words with `enabledForABC`.

### Words
Category dropdown, 10 random words per set. **Grid** mode: big tappable cards. **Flashcards** mode: flip card (front picture + English, back Hebrew + category), swipe/arrows, "I know it" progress dots. Uses `enabledForWords`.

### Read (Sentences)
Plays the whole sentence slowly with the current word highlighted in gold (via speech boundary events). Speed ×0.5–×2.0 in 0.25 steps; each word is tappable; "New Sentences" loads a fresh set; sentences fit on one line.

### Match
Memory game of picture ↔ word cards, read aloud on tap. Levels: Easy 4×4, Medium 4×5, Hard 4×6, Expert 5×6 (grids taller than wide). Uses `enabledForMatching` (franchise categories off by default).

### Spell
Fill missing letters for a pictured word. Easy 2–4 letters/1 blank (5-key keyboard), Medium 4–5/1 (10 keys), Hard 4–5/2, Expert 5–6/2, Master 7+/3. ABC/QWERTY layout, centered Check + Undo icon, wrong answer plays error sound and says the word. Uses `enabledForSpelling`.

### Sort
Tap a basket (or drag the card, mouse or touch) to sort the current word. Easy 2 baskets, Hard 3. The 🔊 basket title only speaks its name; sorted words appear as small chips. Uses `enabledForSorting`.

### Build the Sentence
Drag or tap mixed-up tiles into order. Placed tiles show a position number below and a small × to remove; tapping any tile speaks it; an insertion bar shows the drop position. Check reads the sentence **as the child built it**. Easy 3 words (first prefilled, pictures), Medium 4 words (first prefilled, pictures), Hard 5 words + extra tiles. 5 sentences per round. Uses sentences with `enabledForBuilder`.

### Listen & Pick
The app says a word; the child taps the matching picture. A wrong pick shows and speaks the clicked word, then replays the quiz word after ~2.5s. Easy 3 pictures, Medium 4, Hard 6 (same-category distractors). 10 per round. Uses `enabledForListening`.

### Admin Panel
5-tap footer trigger + login (client-side only, not truly secure). Vocabulary Manager: add/edit/delete words, per-screen toggles (ABC, Words, Match, Spell, Sort, Listen). Sentences Manager: add/edit/delete sentences, "Use in Sentence Builder" toggle. Data is saved in the browser; new built-in words/sentences auto-merge on load without overwriting edits.

## 🚀 Getting Started

```sh
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:8080)
npm test         # run unit tests (Vitest)
npm run build    # production build into dist/
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS + shadcn/ui |
| Speech | Web Speech API (browser TTS) |
| Sounds | Web Audio API (generated tones) |
| PWA | vite-plugin-pwa + Workbox |
| Tests | Vitest + Testing Library |

## 📱 Installation
- **Desktop Chrome**: click the install icon in the address bar
- **Mobile**: "Add to Home Screen" from the browser menu

## 📄 License
Private project.
