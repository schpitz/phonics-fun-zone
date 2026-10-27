// ===== UNIFIED VOCABULARY SYSTEM =====
// Single source of truth for all words across all sections

export interface UnifiedWord {
  id: string;
  english: string;
  hebrew: string;
  category: string;
  emoji: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=easiest (2-3 letters), 5=hardest (7+ letters)
  vowelType: "short" | "long" | "none";
  enabledForABC: boolean;
  enabledForWords: boolean;
  enabledForMatching: boolean;
  enabledForSorting: boolean;
  enabledForListening: boolean;
  enabledForSpelling: boolean;
}

export interface SentenceData {
  id: string;
  english: string;
  hebrew: string;
  words: string[];
  enabledForBuilder?: boolean;
}

export const normalizeToken = (t: string): string =>
  t.toLowerCase().replace(/[^a-z0-9' -]/g, "").trim();

// True when the emoji is an actual picture, not a plain text sign ("=", "▬", outline shapes).
// Anything with explicit emoji presentation (variation selector, keycap, ZWJ, flags, skin tones) counts.
export const isPictorialEmoji = (emoji?: string): boolean => {
  if (!emoji) return false;
  if (/[\u{FE0F}\u{200D}\u{20E3}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F3FB}-\u{1F3FF}]/u.test(emoji)) return true;
  const textSymbolRanges: Array<[number, number]> = [
    [0x20, 0x7e],     // ASCII signs like "="
    [0x2010, 0x2015], // dashes
    [0x2190, 0x21ff], // arrows
    [0x2500, 0x25ff], // box drawing & geometric shapes ("▬")
    [0x2b00, 0x2b1a], // outline shapes ("⬠", "⬡")
    [0x2b1d, 0x2b4f],
  ];
  const chars = Array.from(emoji);
  return !chars.every(ch => {
    const code = ch.codePointAt(0) ?? 0;
    return textSymbolRanges.some(([lo, hi]) => code >= lo && code <= hi);
  });
};

// Pick wrong options: sameCategory true = same category, false = other categories, null = any
export const pickDistractors = (
  target: UnifiedWord,
  pool: UnifiedWord[],
  count: number,
  sameCategory: boolean | null
): UnifiedWord[] => {
  const base = pool.filter(
    w => w.id !== target.id && w.english.toLowerCase() !== target.english.toLowerCase() && w.emoji !== target.emoji
  );
  const preferred = sameCategory === null ? base : base.filter(w => (w.category === target.category) === sameCategory);
  const ordered = [...shuffleArray(preferred), ...shuffleArray(base.filter(w => !preferred.includes(w)))];
  const result: UnifiedWord[] = [];
  const emojis = new Set<string>([target.emoji]);
  for (const w of ordered) {
    if (result.length >= count) break;
    if (emojis.has(w.emoji)) continue;
    emojis.add(w.emoji);
    result.push(w);
  }
  return result;
};

// Helper to generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Helper to determine difficulty based on word length
const getDifficultyFromLength = (word: string): 1 | 2 | 3 | 4 | 5 => {
  const len = word.replace(/\s/g, '').length;
  if (len <= 3) return 1;
  if (len <= 4) return 2;
  if (len <= 5) return 3;
  if (len <= 6) return 4;
  return 5;
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Franchise/fictional categories that should not appear in the matching game
export const FRANCHISE_CATEGORIES = ["Mario", "Sonic", "Paw Patrol", "Star Wars"];

// ===== DEFAULT VOCABULARY DATA =====
// This is the initial word bank - can be extended via admin panel

// enabledForSorting defaults to enabledForMatching if not explicitly set
const defaultVocabulary: Omit<UnifiedWord, 'id' | 'enabledForSorting' | 'enabledForListening'>[] = [
  // ===== MARIO CHARACTERS =====
  { english: "Mario", hebrew: "מריו", category: "Mario", emoji: "🍄", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Luigi", hebrew: "לואיג'י", category: "Mario", emoji: "💚", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Peach", hebrew: "פיץ'", category: "Mario", emoji: "👸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Bowser", hebrew: "באוזר", category: "Mario", emoji: "🐢", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Yoshi", hebrew: "יושי", category: "Mario", emoji: "🦎", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Toad", hebrew: "טואד", category: "Mario", emoji: "🍄", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Goomba", hebrew: "גומבה", category: "Mario", emoji: "🟤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Koopa", hebrew: "קופה", category: "Mario", emoji: "🐢", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Rosalina", hebrew: "רוזלינה", category: "Mario", emoji: "⭐", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Daisy", hebrew: "דייזי", category: "Mario", emoji: "🌼", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },

  // ===== SONIC CHARACTERS =====
  { english: "Sonic", hebrew: "סוניק", category: "Sonic", emoji: "🦔", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Tails", hebrew: "טיילס", category: "Sonic", emoji: "🦊", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Knuckles", hebrew: "נאקלס", category: "Sonic", emoji: "👊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Shadow", hebrew: "שאדו", category: "Sonic", emoji: "🖤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Eggman", hebrew: "אגמן", category: "Sonic", emoji: "🥚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Amy", hebrew: "איימי", category: "Sonic", emoji: "🩷", difficulty: 2, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Rouge", hebrew: "רוז'", category: "Sonic", emoji: "🦇", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Silver", hebrew: "סילבר", category: "Sonic", emoji: "🤍", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },

  // ===== PAW PATROL =====
  { english: "Chase", hebrew: "צ'ייס", category: "Paw Patrol", emoji: "🐕", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Marshall", hebrew: "מרשל", category: "Paw Patrol", emoji: "🚒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Skye", hebrew: "סקיי", category: "Paw Patrol", emoji: "🚁", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Rubble", hebrew: "ראבל", category: "Paw Patrol", emoji: "🚜", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Rocky", hebrew: "רוקי", category: "Paw Patrol", emoji: "♻️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Zuma", hebrew: "זומה", category: "Paw Patrol", emoji: "🌊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Everest", hebrew: "אוורסט", category: "Paw Patrol", emoji: "❄️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Tracker", hebrew: "טראקר", category: "Paw Patrol", emoji: "🌴", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Ryder", hebrew: "ריידר", category: "Paw Patrol", emoji: "👦", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },

  // ===== SOCCER/FOOTBALL TERMS =====
  { english: "Ball", hebrew: "כדור", category: "Soccer", emoji: "⚽", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Goal", hebrew: "שער", category: "Soccer", emoji: "🥅", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kick", hebrew: "בעיטה", category: "Soccer", emoji: "🦵", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Team", hebrew: "קבוצה", category: "Soccer", emoji: "👥", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Win", hebrew: "לנצח", category: "Soccer", emoji: "🏆", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Play", hebrew: "לשחק", category: "Soccer", emoji: "🎮", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Score", hebrew: "ניקוד", category: "Soccer", emoji: "🔢", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pass", hebrew: "מסירה", category: "Soccer", emoji: "➡️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shoot", hebrew: "לבעוט", category: "Soccer", emoji: "💨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Run", hebrew: "לרוץ", category: "Soccer", emoji: "🏃", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fast", hebrew: "מהיר", category: "Soccer", emoji: "💨", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Referee", hebrew: "שופט", category: "Soccer", emoji: "👨‍⚖️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Player", hebrew: "שחקן", category: "Soccer", emoji: "⚽", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Offside", hebrew: "נבדל", category: "Soccer", emoji: "🚩", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Penalty", hebrew: "פנדל", category: "Soccer", emoji: "⚽", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Game", hebrew: "משחק", category: "Soccer", emoji: "🎯", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Match", hebrew: "משחק", category: "Soccer", emoji: "🏟️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Stadium", hebrew: "אצטדיון", category: "Soccer", emoji: "🏟️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Coach", hebrew: "מאמן", category: "Soccer", emoji: "📋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Trophy", hebrew: "גביע", category: "Soccer", emoji: "🏆", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Champion", hebrew: "אלוף", category: "Soccer", emoji: "🥇", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Corner", hebrew: "פינה", category: "Soccer", emoji: "📐", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Header", hebrew: "נגיחה", category: "Soccer", emoji: "🤕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dribble", hebrew: "כדרור", category: "Soccer", emoji: "⚽", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tackle", hebrew: "חטיפה", category: "Soccer", emoji: "🦵", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Goalie", hebrew: "שוער", category: "Soccer", emoji: "🧤", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Net", hebrew: "רשת", category: "Soccer", emoji: "🥅", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Field", hebrew: "מגרש", category: "Soccer", emoji: "🏟️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== FAMILY =====
  { english: "Mom", hebrew: "אמא", category: "Family", emoji: "👩", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dad", hebrew: "אבא", category: "Family", emoji: "👨", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mother", hebrew: "אמא", category: "Family", emoji: "👩", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Father", hebrew: "אבא", category: "Family", emoji: "👨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sister", hebrew: "אחות", category: "Family", emoji: "👧", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brother", hebrew: "אח", category: "Family", emoji: "👦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Baby", hebrew: "תינוק", category: "Family", emoji: "👶", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grandma", hebrew: "סבתא", category: "Family", emoji: "👵", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grandpa", hebrew: "סבא", category: "Family", emoji: "👴", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Uncle", hebrew: "דוד", category: "Family", emoji: "👨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Aunt", hebrew: "דודה", category: "Family", emoji: "👩", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Family", hebrew: "משפחה", category: "Family", emoji: "👨‍👩‍👧‍👦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Son", hebrew: "בן", category: "Family", emoji: "👦", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pet", hebrew: "חיית מחמד", category: "Family", emoji: "🐕", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== BODY PARTS =====
  { english: "Head", hebrew: "ראש", category: "Body", emoji: "🗣️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eye", hebrew: "עין", category: "Body", emoji: "👁️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eyes", hebrew: "עיניים", category: "Body", emoji: "👀", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Nose", hebrew: "אף", category: "Body", emoji: "👃", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mouth", hebrew: "פה", category: "Body", emoji: "👄", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ear", hebrew: "אוזן", category: "Body", emoji: "👂", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hair", hebrew: "שיער", category: "Body", emoji: "💇", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hand", hebrew: "יד", category: "Body", emoji: "✋", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Arm", hebrew: "זרוע", category: "Body", emoji: "💪", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Leg", hebrew: "רגל", category: "Body", emoji: "🦵", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Foot", hebrew: "כף רגל", category: "Body", emoji: "🦶", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Finger", hebrew: "אצבע", category: "Body", emoji: "👆", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toe", hebrew: "אצבע רגל", category: "Body", emoji: "🦶", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Teeth", hebrew: "שיניים", category: "Body", emoji: "🦷", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Face", hebrew: "פנים", category: "Body", emoji: "😊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Neck", hebrew: "צוואר", category: "Body", emoji: "🦒", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Back", hebrew: "גב", category: "Body", emoji: "🔙", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Belly", hebrew: "בטן", category: "Body", emoji: "🤰", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Knee", hebrew: "ברך", category: "Body", emoji: "🦵", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Heart", hebrew: "לב", category: "Body", emoji: "❤️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brain", hebrew: "מוח", category: "Body", emoji: "🧠", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== HOME OBJECTS =====
  { english: "House", hebrew: "בית", category: "Home", emoji: "🏠", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Door", hebrew: "דלת", category: "Home", emoji: "🚪", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Window", hebrew: "חלון", category: "Home", emoji: "🪟", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bed", hebrew: "מיטה", category: "Home", emoji: "🛏️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chair", hebrew: "כיסא", category: "Home", emoji: "🪑", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Table", hebrew: "שולחן", category: "Home", emoji: "🪑", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lamp", hebrew: "מנורה", category: "Home", emoji: "💡", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Light", hebrew: "אור", category: "Home", emoji: "💡", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "TV", hebrew: "טלוויזיה", category: "Home", emoji: "📺", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Couch", hebrew: "ספה", category: "Home", emoji: "🛋️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Floor", hebrew: "רצפה", category: "Home", emoji: "⬛", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wall", hebrew: "קיר", category: "Home", emoji: "🧱", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Roof", hebrew: "גג", category: "Home", emoji: "🏠", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Room", hebrew: "חדר", category: "Home", emoji: "🚪", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kitchen", hebrew: "מטבח", category: "Home", emoji: "🍳", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bathroom", hebrew: "אמבטיה", category: "Home", emoji: "🛁", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bedroom", hebrew: "חדר שינה", category: "Home", emoji: "🛏️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Garden", hebrew: "גינה", category: "Home", emoji: "🌷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Key", hebrew: "מפתח", category: "Home", emoji: "🔑", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Clock", hebrew: "שעון", category: "Home", emoji: "🕐", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== ANIMALS =====
  { english: "Dog", hebrew: "כלב", category: "Animals", emoji: "🐶", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cat", hebrew: "חתול", category: "Animals", emoji: "🐱", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bird", hebrew: "ציפור", category: "Animals", emoji: "🐦", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fish", hebrew: "דג", category: "Animals", emoji: "🐟", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lion", hebrew: "אריה", category: "Animals", emoji: "🦁", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Elephant", hebrew: "פיל", category: "Animals", emoji: "🐘", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Monkey", hebrew: "קוף", category: "Animals", emoji: "🐒", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Frog", hebrew: "צפרדע", category: "Animals", emoji: "🐸", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Butterfly", hebrew: "פרפר", category: "Animals", emoji: "🦋", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Turtle", hebrew: "צב", category: "Animals", emoji: "🐢", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rabbit", hebrew: "ארנב", category: "Animals", emoji: "🐰", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bear", hebrew: "דוב", category: "Animals", emoji: "🐻", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tiger", hebrew: "נמר", category: "Animals", emoji: "🐯", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zebra", hebrew: "זברה", category: "Animals", emoji: "🦓", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Giraffe", hebrew: "ג'ירפה", category: "Animals", emoji: "🦒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Penguin", hebrew: "פינגווין", category: "Animals", emoji: "🐧", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dolphin", hebrew: "דולפין", category: "Animals", emoji: "🐬", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shark", hebrew: "כריש", category: "Animals", emoji: "🦈", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Whale", hebrew: "לוויתן", category: "Animals", emoji: "🐋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dinosaur", hebrew: "דינוזאור", category: "Animals", emoji: "🦕", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== COLORS =====
  { english: "Red", hebrew: "אדום", category: "Colors", emoji: "🔴", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Blue", hebrew: "כחול", category: "Colors", emoji: "🔵", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Green", hebrew: "ירוק", category: "Colors", emoji: "🟢", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Yellow", hebrew: "צהוב", category: "Colors", emoji: "🟡", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Orange", hebrew: "כתום", category: "Colors", emoji: "🟠", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Purple", hebrew: "סגול", category: "Colors", emoji: "🟣", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pink", hebrew: "ורוד", category: "Colors", emoji: "🩷", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Black", hebrew: "שחור", category: "Colors", emoji: "⚫", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "White", hebrew: "לבן", category: "Colors", emoji: "⚪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brown", hebrew: "חום", category: "Colors", emoji: "🟤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== FOOD =====
  { english: "Apple", hebrew: "תפוח", category: "Food", emoji: "🍎", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Banana", hebrew: "בננה", category: "Food", emoji: "🍌", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pizza", hebrew: "פיצה", category: "Food", emoji: "🍕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cake", hebrew: "עוגה", category: "Food", emoji: "🎂", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cookie", hebrew: "עוגיה", category: "Food", emoji: "🍪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Candy", hebrew: "ממתק", category: "Food", emoji: "🍬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Milk", hebrew: "חלב", category: "Food", emoji: "🥛", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Water", hebrew: "מים", category: "Food", emoji: "💧", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Juice", hebrew: "מיץ", category: "Food", emoji: "🧃", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Egg", hebrew: "ביצה", category: "Food", emoji: "🥚", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== NATURE =====
  { english: "Sun", hebrew: "שמש", category: "Nature", emoji: "☀️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Moon", hebrew: "ירח", category: "Nature", emoji: "🌙", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Star", hebrew: "כוכב", category: "Nature", emoji: "⭐", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rainbow", hebrew: "קשת", category: "Nature", emoji: "🌈", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tree", hebrew: "עץ", category: "Nature", emoji: "🌳", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flower", hebrew: "פרח", category: "Nature", emoji: "🌸", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fire", hebrew: "אש", category: "Nature", emoji: "🔥", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Snow", hebrew: "שלג", category: "Nature", emoji: "❄️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rain", hebrew: "גשם", category: "Nature", emoji: "🌧️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cloud", hebrew: "ענן", category: "Nature", emoji: "☁️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sky", hebrew: "שמיים", category: "Nature", emoji: "🌤️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mountain", hebrew: "הר", category: "Nature", emoji: "🏔️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ocean", hebrew: "אוקיינוס", category: "Nature", emoji: "🌊", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "River", hebrew: "נהר", category: "Nature", emoji: "🏞️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== VEHICLES =====
  { english: "Car", hebrew: "מכונית", category: "Vehicles", emoji: "🚗", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bus", hebrew: "אוטובוס", category: "Vehicles", emoji: "🚌", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Train", hebrew: "רכבת", category: "Vehicles", emoji: "🚂", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Plane", hebrew: "מטוס", category: "Vehicles", emoji: "✈️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Boat", hebrew: "סירה", category: "Vehicles", emoji: "⛵", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bike", hebrew: "אופניים", category: "Vehicles", emoji: "🚴", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Truck", hebrew: "משאית", category: "Vehicles", emoji: "🚚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rocket", hebrew: "רקטה", category: "Vehicles", emoji: "🚀", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Helicopter", hebrew: "מסוק", category: "Vehicles", emoji: "🚁", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ship", hebrew: "ספינה", category: "Vehicles", emoji: "🚢", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== STAR WARS =====
  { english: "Jedi", hebrew: "ג'דיי", category: "Star Wars", emoji: "⚔️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Yoda", hebrew: "יודה", category: "Star Wars", emoji: "🧙", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Luke", hebrew: "לוק", category: "Star Wars", emoji: "👨", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Vader", hebrew: "ויידר", category: "Star Wars", emoji: "🖤", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Leia", hebrew: "ליאה", category: "Star Wars", emoji: "👸", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Force", hebrew: "הכוח", category: "Star Wars", emoji: "✨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Lightsaber", hebrew: "חרב אור", category: "Star Wars", emoji: "⚔️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Droid", hebrew: "דרואיד", category: "Star Wars", emoji: "🤖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Grogu", hebrew: "גרוגו", category: "Star Wars", emoji: "👶", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Mandalorian", hebrew: "מנדלוריאן", category: "Star Wars", emoji: "🪖", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },

  // ===== SIMPLE WORDS (for spelling) =====
  { english: "Go", hebrew: "ללכת", category: "Basic", emoji: "🚶", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Up", hebrew: "למעלה", category: "Basic", emoji: "⬆️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "No", hebrew: "לא", category: "Basic", emoji: "❌", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "On", hebrew: "על", category: "Basic", emoji: "🔛", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "In", hebrew: "בתוך", category: "Basic", emoji: "📥", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Is", hebrew: "הוא", category: "Basic", emoji: "", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "It", hebrew: "זה", category: "Basic", emoji: "👆", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "At", hebrew: "ב", category: "Basic", emoji: "📍", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "We", hebrew: "אנחנו", category: "Basic", emoji: "👫", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "He", hebrew: "הוא", category: "Basic", emoji: "👦", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Me", hebrew: "אני", category: "Basic", emoji: "👆", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Be", hebrew: "להיות", category: "Basic", emoji: "✨", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Do", hebrew: "לעשות", category: "Basic", emoji: "✅", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "So", hebrew: "אז", category: "Basic", emoji: "➡️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "To", hebrew: "ל", category: "Basic", emoji: "➡️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
  { english: "Hat", hebrew: "כובע", category: "Basic", emoji: "🧢", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cup", hebrew: "כוס", category: "Basic", emoji: "🥤", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Box", hebrew: "קופסה", category: "Basic", emoji: "📦", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pig", hebrew: "חזיר", category: "Basic", emoji: "🐷", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Big", hebrew: "גדול", category: "Basic", emoji: "🐘", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hot", hebrew: "חם", category: "Basic", emoji: "🥵", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sad", hebrew: "עצוב", category: "Basic", emoji: "😢", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sit", hebrew: "לשבת", category: "Basic", emoji: "🪑", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toy", hebrew: "צעצוע", category: "Basic", emoji: "🧸", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE MEDIUM WORDS =====
  { english: "Duck", hebrew: "ברווז", category: "Animals", emoji: "🦆", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jump", hebrew: "לקפוץ", category: "Actions", emoji: "⬆️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Love", hebrew: "אהבה", category: "Feelings", emoji: "❤️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "King", hebrew: "מלך", category: "Fantasy", emoji: "👑", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Book", hebrew: "ספר", category: "Objects", emoji: "📚", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE EXPERT WORDS =====
  { english: "Robot", hebrew: "רובוט", category: "Technology", emoji: "🤖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Happy", hebrew: "שמח", category: "Feelings", emoji: "😊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Queen", hebrew: "מלכה", category: "Fantasy", emoji: "👸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Horse", hebrew: "סוס", category: "Animals", emoji: "🐴", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Beach", hebrew: "חוף", category: "Nature", emoji: "🏖️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Party", hebrew: "מסיבה", category: "Events", emoji: "🎉", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Story", hebrew: "סיפור", category: "Objects", emoji: "📖", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE MASTER WORDS (7+ letters) =====
  { english: "Unicorn", hebrew: "חד קרן", category: "Fantasy", emoji: "🦄", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Princess", hebrew: "נסיכה", category: "Fantasy", emoji: "👸", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sandwich", hebrew: "כריך", category: "Food", emoji: "🥪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Strawberry", hebrew: "תות", category: "Food", emoji: "🍓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Skateboard", hebrew: "סקייטבורד", category: "Sports", emoji: "🛹", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Crocodile", hebrew: "תנין", category: "Animals", emoji: "🐊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kangaroo", hebrew: "קנגורו", category: "Animals", emoji: "🦘", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Octopus", hebrew: "תמנון", category: "Animals", emoji: "🐙", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jellyfish", hebrew: "מדוזה", category: "Animals", emoji: "🪼", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mushroom", hebrew: "פטריה", category: "Nature", emoji: "🍄", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pineapple", hebrew: "אננס", category: "Food", emoji: "🍍", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chocolate", hebrew: "שוקולד", category: "Food", emoji: "🍫", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Broccoli", hebrew: "ברוקולי", category: "Food", emoji: "🥦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Watermelon", hebrew: "אבטיח", category: "Food", emoji: "🍉", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Computer", hebrew: "מחשב", category: "Technology", emoji: "💻", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Keyboard", hebrew: "מקלדת", category: "Technology", emoji: "⌨️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Television", hebrew: "טלוויזיה", category: "Technology", emoji: "📺", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Telephone", hebrew: "טלפון", category: "Technology", emoji: "📞", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Backpack", hebrew: "תיק גב", category: "Objects", emoji: "🎒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Umbrella", hebrew: "מטריה", category: "Objects", emoji: "☂️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fireworks", hebrew: "זיקוקים", category: "Events", emoji: "🎆", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Birthday", hebrew: "יום הולדת", category: "Events", emoji: "🎂", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ambulance", hebrew: "אמבולנס", category: "Vehicles", emoji: "🚑", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Airplane", hebrew: "מטוס", category: "Vehicles", emoji: "✈️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spaceship", hebrew: "חללית", category: "Vehicles", emoji: "🚀", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Submarine", hebrew: "צוללת", category: "Vehicles", emoji: "🛟", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Motorcycle", hebrew: "אופנוע", category: "Vehicles", emoji: "🏍️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Astronaut", hebrew: "אסטרונאוט", category: "Jobs", emoji: "👨‍🚀", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Detective", hebrew: "בלש", category: "Jobs", emoji: "🕵️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Superhero", hebrew: "גיבור על", category: "Fantasy", emoji: "🦸", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Caterpillar", hebrew: "זחל", category: "Animals", emoji: "🐛", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dragonfly", hebrew: "שפירית", category: "Animals", emoji: "🪰", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flamingo", hebrew: "פלמינגו", category: "Animals", emoji: "🦩", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hedgehog", hebrew: "קיפוד", category: "Animals", emoji: "🦔", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Squirrel", hebrew: "סנאי", category: "Animals", emoji: "🐿️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hamburger", hebrew: "המבורגר", category: "Food", emoji: "🍔", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spaghetti", hebrew: "ספגטי", category: "Food", emoji: "🍝", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Playground", hebrew: "גן משחקים", category: "Places", emoji: "🛝", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Trampoline", hebrew: "טרמפולינה", category: "Objects", emoji: "🤸", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== SPORTS (Extended) =====
  { english: "Tennis", hebrew: "טניס", category: "Sports", emoji: "🎾", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Basketball", hebrew: "כדורסל", category: "Sports", emoji: "🏀", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Volleyball", hebrew: "כדורעף", category: "Sports", emoji: "🏐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Baseball", hebrew: "בייסבול", category: "Sports", emoji: "⚾", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hockey", hebrew: "הוקי", category: "Sports", emoji: "🏒", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Golf", hebrew: "גולף", category: "Sports", emoji: "⛳", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Swimming", hebrew: "שחייה", category: "Sports", emoji: "🏊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Racing", hebrew: "מירוץ", category: "Sports", emoji: "🏎️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Boxing", hebrew: "איגרוף", category: "Sports", emoji: "🥊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Karate", hebrew: "קראטה", category: "Sports", emoji: "🥋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Surf", hebrew: "גלישה", category: "Sports", emoji: "🏄", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ski", hebrew: "סקי", category: "Sports", emoji: "⛷️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Medal", hebrew: "מדליה", category: "Sports", emoji: "🏅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Race", hebrew: "מרוץ", category: "Sports", emoji: "🏁", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gym", hebrew: "חדר כושר", category: "Sports", emoji: "🏋️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pool", hebrew: "בריכה", category: "Sports", emoji: "🏊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bat", hebrew: "מחבט", category: "Sports", emoji: "🏏", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Net", hebrew: "רשת", category: "Sports", emoji: "🥅", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== TECHNOLOGY (Extended) =====
  { english: "Phone", hebrew: "טלפון", category: "Technology", emoji: "📱", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tablet", hebrew: "טאבלט", category: "Technology", emoji: "📱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Laptop", hebrew: "מחשב נייד", category: "Technology", emoji: "💻", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mouse", hebrew: "עכבר", category: "Technology", emoji: "🖱️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Screen", hebrew: "מסך", category: "Technology", emoji: "🖥️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Camera", hebrew: "מצלמה", category: "Technology", emoji: "📷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Video", hebrew: "וידאו", category: "Technology", emoji: "🎬", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Game", hebrew: "משחק", category: "Technology", emoji: "🎮", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Internet", hebrew: "אינטרנט", category: "Technology", emoji: "🌐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wifi", hebrew: "וויפי", category: "Technology", emoji: "📶", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Headphones", hebrew: "אוזניות", category: "Technology", emoji: "🎧", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Speaker", hebrew: "רמקול", category: "Technology", emoji: "🔊", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Printer", hebrew: "מדפסת", category: "Technology", emoji: "🖨️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Battery", hebrew: "סוללה", category: "Technology", emoji: "🔋", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Charger", hebrew: "מטען", category: "Technology", emoji: "🔌", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "App", hebrew: "אפליקציה", category: "Technology", emoji: "📲", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Code", hebrew: "קוד", category: "Technology", emoji: "💻", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Download", hebrew: "הורדה", category: "Technology", emoji: "⬇️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Password", hebrew: "סיסמה", category: "Technology", emoji: "🔐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Email", hebrew: "אימייל", category: "Technology", emoji: "📧", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== VEHICLES (Extended) =====
  { english: "Taxi", hebrew: "מונית", category: "Vehicles", emoji: "🚕", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tractor", hebrew: "טרקטור", category: "Vehicles", emoji: "🚜", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scooter", hebrew: "קורקינט", category: "Vehicles", emoji: "🛴", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jet", hebrew: "מטוס סילון", category: "Vehicles", emoji: "🛩️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Van", hebrew: "רכב מסחרי", category: "Vehicles", emoji: "🚐", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Canoe", hebrew: "קאנו", category: "Vehicles", emoji: "🛶", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ferry", hebrew: "מעבורת", category: "Vehicles", emoji: "⛴️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Trolley", hebrew: "עגלה", category: "Vehicles", emoji: "🚃", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Trailer", hebrew: "גרור", category: "Vehicles", emoji: "🚛", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sailboat", hebrew: "מפרשית", category: "Vehicles", emoji: "⛵", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Firetruck", hebrew: "כבאית", category: "Vehicles", emoji: "🚒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Police Car", hebrew: "ניידת משטרה", category: "Vehicles", emoji: "🚓", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tram", hebrew: "רכבת קלה", category: "Vehicles", emoji: "🚊", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cable Car", hebrew: "רכבל", category: "Vehicles", emoji: "🚡", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== PLACES =====
  { english: "School", hebrew: "בית ספר", category: "Places", emoji: "🏫", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Library", hebrew: "ספריה", category: "Places", emoji: "📚", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hospital", hebrew: "בית חולים", category: "Places", emoji: "🏥", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Airport", hebrew: "שדה תעופה", category: "Places", emoji: "✈️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Museum", hebrew: "מוזיאון", category: "Places", emoji: "🏛️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zoo", hebrew: "גן חיות", category: "Places", emoji: "🦁", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Park", hebrew: "פארק", category: "Places", emoji: "🌳", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mall", hebrew: "קניון", category: "Places", emoji: "🛒", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Market", hebrew: "שוק", category: "Places", emoji: "🏪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bank", hebrew: "בנק", category: "Places", emoji: "🏦", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Restaurant", hebrew: "מסעדה", category: "Places", emoji: "🍽️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cinema", hebrew: "קולנוע", category: "Places", emoji: "🎬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Theater", hebrew: "תיאטרון", category: "Places", emoji: "🎭", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Church", hebrew: "כנסייה", category: "Places", emoji: "⛪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Castle", hebrew: "טירה", category: "Places", emoji: "🏰", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Beach", hebrew: "חוף", category: "Places", emoji: "🏖️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Farm", hebrew: "חווה", category: "Places", emoji: "🌾", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hotel", hebrew: "מלון", category: "Places", emoji: "🏨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gym", hebrew: "חדר כושר", category: "Places", emoji: "🏋️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bakery", hebrew: "מאפייה", category: "Places", emoji: "🥐", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pharmacy", hebrew: "בית מרקחת", category: "Places", emoji: "💊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Station", hebrew: "תחנה", category: "Places", emoji: "🚉", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bridge", hebrew: "גשר", category: "Places", emoji: "🌉", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tower", hebrew: "מגדל", category: "Places", emoji: "🗼", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Factory", hebrew: "מפעל", category: "Places", emoji: "🏭", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== COUNTRIES =====
  { english: "Israel", hebrew: "ישראל", category: "Countries", emoji: "🇮🇱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "America", hebrew: "אמריקה", category: "Countries", emoji: "🇺🇸", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "England", hebrew: "אנגליה", category: "Countries", emoji: "🇬🇧", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "France", hebrew: "צרפת", category: "Countries", emoji: "🇫🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spain", hebrew: "ספרד", category: "Countries", emoji: "🇪🇸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Italy", hebrew: "איטליה", category: "Countries", emoji: "🇮🇹", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Germany", hebrew: "גרמניה", category: "Countries", emoji: "🇩🇪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Japan", hebrew: "יפן", category: "Countries", emoji: "🇯🇵", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "China", hebrew: "סין", category: "Countries", emoji: "🇨🇳", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brazil", hebrew: "ברזיל", category: "Countries", emoji: "🇧🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Canada", hebrew: "קנדה", category: "Countries", emoji: "🇨🇦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Australia", hebrew: "אוסטרליה", category: "Countries", emoji: "🇦🇺", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mexico", hebrew: "מקסיקו", category: "Countries", emoji: "🇲🇽", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Russia", hebrew: "רוסיה", category: "Countries", emoji: "🇷🇺", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "India", hebrew: "הודו", category: "Countries", emoji: "🇮🇳", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Egypt", hebrew: "מצרים", category: "Countries", emoji: "🇪🇬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Greece", hebrew: "יוון", category: "Countries", emoji: "🇬🇷", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Turkey", hebrew: "טורקיה", category: "Countries", emoji: "🇹🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Korea", hebrew: "קוריאה", category: "Countries", emoji: "🇰🇷", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Poland", hebrew: "פולין", category: "Countries", emoji: "🇵🇱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== OBJECTS (Extended) =====
  { english: "Pencil", hebrew: "עיפרון", category: "Objects", emoji: "✏️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pen", hebrew: "עט", category: "Objects", emoji: "🖊️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ruler", hebrew: "סרגל", category: "Objects", emoji: "📏", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eraser", hebrew: "מחק", category: "Objects", emoji: "🧹", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scissors", hebrew: "מספריים", category: "Objects", emoji: "✂️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Glue", hebrew: "דבק", category: "Objects", emoji: "🧴", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tape", hebrew: "סרט דבק", category: "Objects", emoji: "📎", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Paper", hebrew: "נייר", category: "Objects", emoji: "📄", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Notebook", hebrew: "מחברת", category: "Objects", emoji: "📓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bag", hebrew: "תיק", category: "Objects", emoji: "👜", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Watch", hebrew: "שעון יד", category: "Objects", emoji: "⌚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Glasses", hebrew: "משקפיים", category: "Objects", emoji: "👓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mirror", hebrew: "מראה", category: "Objects", emoji: "🪞", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brush", hebrew: "מברשת", category: "Objects", emoji: "🖌️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soap", hebrew: "סבון", category: "Objects", emoji: "🧼", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Towel", hebrew: "מגבת", category: "Objects", emoji: "🧺", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pillow", hebrew: "כרית", category: "Objects", emoji: "🛏️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Blanket", hebrew: "שמיכה", category: "Objects", emoji: "🛌", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toy", hebrew: "צעצוע", category: "Objects", emoji: "🧸", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Doll", hebrew: "בובה", category: "Objects", emoji: "🪆", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ball", hebrew: "כדור", category: "Objects", emoji: "🏐", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Puzzle", hebrew: "פאזל", category: "Objects", emoji: "🧩", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cards", hebrew: "קלפים", category: "Objects", emoji: "🃏", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bottle", hebrew: "בקבוק", category: "Objects", emoji: "🍼", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Plate", hebrew: "צלחת", category: "Objects", emoji: "🍽️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fork", hebrew: "מזלג", category: "Objects", emoji: "🍴", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Knife", hebrew: "סכין", category: "Objects", emoji: "🔪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spoon", hebrew: "כפית", category: "Objects", emoji: "🥄", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bowl", hebrew: "קערה", category: "Objects", emoji: "🥣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== FEELINGS (Extended) =====
  { english: "Happy", hebrew: "שמח", category: "Feelings", emoji: "😊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sad", hebrew: "עצוב", category: "Feelings", emoji: "😢", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Angry", hebrew: "כועס", category: "Feelings", emoji: "😠", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scared", hebrew: "מפוחד", category: "Feelings", emoji: "😨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tired", hebrew: "עייף", category: "Feelings", emoji: "😴", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hungry", hebrew: "רעב", category: "Feelings", emoji: "🍔", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thirsty", hebrew: "צמא", category: "Feelings", emoji: "💧", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Excited", hebrew: "נרגש", category: "Feelings", emoji: "🤩", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bored", hebrew: "משועמם", category: "Feelings", emoji: "😑", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Surprised", hebrew: "מופתע", category: "Feelings", emoji: "😲", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shy", hebrew: "ביישן", category: "Feelings", emoji: "😳", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Proud", hebrew: "גאה", category: "Feelings", emoji: "😤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brave", hebrew: "אמיץ", category: "Feelings", emoji: "💪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Calm", hebrew: "רגוע", category: "Feelings", emoji: "😌", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Nervous", hebrew: "עצבני", category: "Feelings", emoji: "😰", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Silly", hebrew: "מטופש", category: "Feelings", emoji: "🤪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lonely", hebrew: "בודד", category: "Feelings", emoji: "😔", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Curious", hebrew: "סקרן", category: "Feelings", emoji: "🧐", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Confused", hebrew: "מבולבל", category: "Feelings", emoji: "😕", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kind", hebrew: "נחמד", category: "Feelings", emoji: "🤗", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== FOOD (Extended) =====
  { english: "Bread", hebrew: "לחם", category: "Food", emoji: "🍞", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cheese", hebrew: "גבינה", category: "Food", emoji: "🧀", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rice", hebrew: "אורז", category: "Food", emoji: "🍚", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pasta", hebrew: "פסטה", category: "Food", emoji: "🍝", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soup", hebrew: "מרק", category: "Food", emoji: "🍲", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Salad", hebrew: "סלט", category: "Food", emoji: "🥗", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chicken", hebrew: "עוף", category: "Food", emoji: "🍗", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fish", hebrew: "דג", category: "Food", emoji: "🐟", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Meat", hebrew: "בשר", category: "Food", emoji: "🥩", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Carrot", hebrew: "גזר", category: "Food", emoji: "🥕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tomato", hebrew: "עגבניה", category: "Food", emoji: "🍅", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Potato", hebrew: "תפוח אדמה", category: "Food", emoji: "🥔", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Onion", hebrew: "בצל", category: "Food", emoji: "🧅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Corn", hebrew: "תירס", category: "Food", emoji: "🌽", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grape", hebrew: "ענב", category: "Food", emoji: "🍇", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lemon", hebrew: "לימון", category: "Food", emoji: "🍋", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mango", hebrew: "מנגו", category: "Food", emoji: "🥭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cherry", hebrew: "דובדבן", category: "Food", emoji: "🍒", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Peach", hebrew: "אפרסק", category: "Food", emoji: "🍑", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ice Cream", hebrew: "גלידה", category: "Food", emoji: "🍦", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Donut", hebrew: "סופגניה", category: "Food", emoji: "🍩", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Popcorn", hebrew: "פופקורן", category: "Food", emoji: "🍿", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fries", hebrew: "צ'יפס", category: "Food", emoji: "🍟", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Honey", hebrew: "דבש", category: "Food", emoji: "🍯", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Butter", hebrew: "חמאה", category: "Food", emoji: "🧈", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== JOBS (Extended) =====
  { english: "Doctor", hebrew: "רופא", category: "Jobs", emoji: "👨‍⚕️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Teacher", hebrew: "מורה", category: "Jobs", emoji: "👩‍🏫", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Nurse", hebrew: "אחות", category: "Jobs", emoji: "👩‍⚕️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pilot", hebrew: "טייס", category: "Jobs", emoji: "👨‍✈️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chef", hebrew: "שף", category: "Jobs", emoji: "👨‍🍳", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Police", hebrew: "שוטר", category: "Jobs", emoji: "👮", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Firefighter", hebrew: "כבאי", category: "Jobs", emoji: "👨‍🚒", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Artist", hebrew: "אמן", category: "Jobs", emoji: "👨‍🎨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Singer", hebrew: "זמר", category: "Jobs", emoji: "🎤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Actor", hebrew: "שחקן", category: "Jobs", emoji: "🎭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Writer", hebrew: "סופר", category: "Jobs", emoji: "✍️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Farmer", hebrew: "חקלאי", category: "Jobs", emoji: "👨‍🌾", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Builder", hebrew: "בנאי", category: "Jobs", emoji: "👷", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Driver", hebrew: "נהג", category: "Jobs", emoji: "🚗", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dentist", hebrew: "רופא שיניים", category: "Jobs", emoji: "🦷", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Vet", hebrew: "וטרינר", category: "Jobs", emoji: "🐕", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soldier", hebrew: "חייל", category: "Jobs", emoji: "🪖", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scientist", hebrew: "מדען", category: "Jobs", emoji: "🔬", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Engineer", hebrew: "מהנדס", category: "Jobs", emoji: "⚙️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lawyer", hebrew: "עורך דין", category: "Jobs", emoji: "⚖️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== NATURE (Extended) =====
  { english: "Forest", hebrew: "יער", category: "Nature", emoji: "🌲", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lake", hebrew: "אגם", category: "Nature", emoji: "🏞️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Desert", hebrew: "מדבר", category: "Nature", emoji: "🏜️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Island", hebrew: "אי", category: "Nature", emoji: "🏝️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Volcano", hebrew: "הר געש", category: "Nature", emoji: "🌋", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cave", hebrew: "מערה", category: "Nature", emoji: "🕳️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Waterfall", hebrew: "מפל", category: "Nature", emoji: "💦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Valley", hebrew: "עמק", category: "Nature", emoji: "🏔️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hill", hebrew: "גבעה", category: "Nature", emoji: "⛰️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Leaf", hebrew: "עלה", category: "Nature", emoji: "🍃", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grass", hebrew: "דשא", category: "Nature", emoji: "🌱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rose", hebrew: "ורד", category: "Nature", emoji: "🌹", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sunflower", hebrew: "חמנייה", category: "Nature", emoji: "🌻", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rock", hebrew: "סלע", category: "Nature", emoji: "🪨", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sand", hebrew: "חול", category: "Nature", emoji: "🏖️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wind", hebrew: "רוח", category: "Nature", emoji: "💨", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Storm", hebrew: "סערה", category: "Nature", emoji: "⛈️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thunder", hebrew: "רעם", category: "Nature", emoji: "⚡", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lightning", hebrew: "ברק", category: "Nature", emoji: "🌩️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fog", hebrew: "ערפל", category: "Nature", emoji: "🌫️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== COUNTRIES =====
  { english: "Israel", hebrew: "ישראל", category: "Countries", emoji: "🇮🇱", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "USA", hebrew: "ארה״ב", category: "Countries", emoji: "🇺🇸", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "England", hebrew: "אנגליה", category: "Countries", emoji: "🇬🇧", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "France", hebrew: "צרפת", category: "Countries", emoji: "🇫🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spain", hebrew: "ספרד", category: "Countries", emoji: "🇪🇸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Italy", hebrew: "איטליה", category: "Countries", emoji: "🇮🇹", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Germany", hebrew: "גרמניה", category: "Countries", emoji: "🇩🇪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Japan", hebrew: "יפן", category: "Countries", emoji: "🇯🇵", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "China", hebrew: "סין", category: "Countries", emoji: "🇨🇳", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "India", hebrew: "הודו", category: "Countries", emoji: "🇮🇳", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brazil", hebrew: "ברזיל", category: "Countries", emoji: "🇧🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Canada", hebrew: "קנדה", category: "Countries", emoji: "🇨🇦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mexico", hebrew: "מקסיקו", category: "Countries", emoji: "🇲🇽", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Australia", hebrew: "אוסטרליה", category: "Countries", emoji: "🇦🇺", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Egypt", hebrew: "מצרים", category: "Countries", emoji: "🇪🇬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Greece", hebrew: "יוון", category: "Countries", emoji: "🇬🇷", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Russia", hebrew: "רוסיה", category: "Countries", emoji: "🇷🇺", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Turkey", hebrew: "טורקיה", category: "Countries", emoji: "🇹🇷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Poland", hebrew: "פולין", category: "Countries", emoji: "🇵🇱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sweden", hebrew: "שוודיה", category: "Countries", emoji: "🇸🇪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Norway", hebrew: "נורווגיה", category: "Countries", emoji: "🇳🇴", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Denmark", hebrew: "דנמרק", category: "Countries", emoji: "🇩🇰", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ireland", hebrew: "אירלנד", category: "Countries", emoji: "🇮🇪", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Portugal", hebrew: "פורטוגל", category: "Countries", emoji: "🇵🇹", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Korea", hebrew: "קוריאה", category: "Countries", emoji: "🇰🇷", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Argentina", hebrew: "ארגנטינה", category: "Countries", emoji: "🇦🇷", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thailand", hebrew: "תאילנד", category: "Countries", emoji: "🇹🇭", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Morocco", hebrew: "מרוקו", category: "Countries", emoji: "🇲🇦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jordan", hebrew: "ירדן", category: "Countries", emoji: "🇯🇴", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== PLACES =====
  { english: "School", hebrew: "בית ספר", category: "Places", emoji: "🏫", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Library", hebrew: "ספרייה", category: "Places", emoji: "📚", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hospital", hebrew: "בית חולים", category: "Places", emoji: "🏥", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Airport", hebrew: "שדה תעופה", category: "Places", emoji: "✈️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bus Stop", hebrew: "תחנת אוטובוס", category: "Places", emoji: "🚏", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Train Station", hebrew: "תחנת רכבת", category: "Places", emoji: "🚉", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mall", hebrew: "קניון", category: "Places", emoji: "🏬", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Market", hebrew: "שוק", category: "Places", emoji: "🛒", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bank", hebrew: "בנק", category: "Places", emoji: "🏦", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Church", hebrew: "כנסייה", category: "Places", emoji: "⛪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mosque", hebrew: "מסגד", category: "Places", emoji: "🕌", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Temple", hebrew: "מקדש", category: "Places", emoji: "🛕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Museum", hebrew: "מוזיאון", category: "Places", emoji: "🏛️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zoo", hebrew: "גן חיות", category: "Places", emoji: "🦁", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cinema", hebrew: "קולנוע", category: "Places", emoji: "🎬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Theater", hebrew: "תיאטרון", category: "Places", emoji: "🎭", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gym", hebrew: "חדר כושר", category: "Places", emoji: "🏋️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pool", hebrew: "בריכה", category: "Places", emoji: "🏊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bakery", hebrew: "מאפייה", category: "Places", emoji: "🥖", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pharmacy", hebrew: "בית מרקחת", category: "Places", emoji: "💊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Post Office", hebrew: "דואר", category: "Places", emoji: "📮", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cafe", hebrew: "בית קפה", category: "Places", emoji: "☕", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Restaurant", hebrew: "מסעדה", category: "Places", emoji: "🍽️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hotel", hebrew: "מלון", category: "Places", emoji: "🏨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Office", hebrew: "משרד", category: "Places", emoji: "🏢", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Factory", hebrew: "מפעל", category: "Places", emoji: "🏭", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Stadium", hebrew: "אצטדיון", category: "Places", emoji: "🏟️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Playground", hebrew: "גן שעשועים", category: "Places", emoji: "🛝", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Beach", hebrew: "חוף", category: "Places", emoji: "🏖️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE SPORTS =====
  { english: "Basketball", hebrew: "כדורסל", category: "Sports", emoji: "🏀", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tennis", hebrew: "טניס", category: "Sports", emoji: "🎾", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Baseball", hebrew: "בייסבול", category: "Sports", emoji: "⚾", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Golf", hebrew: "גולף", category: "Sports", emoji: "⛳", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hockey", hebrew: "הוקי", category: "Sports", emoji: "🏒", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Swimming", hebrew: "שחייה", category: "Sports", emoji: "🏊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Running", hebrew: "ריצה", category: "Sports", emoji: "🏃", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cycling", hebrew: "רכיבה", category: "Sports", emoji: "🚴", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Boxing", hebrew: "אגרוף", category: "Sports", emoji: "🥊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Karate", hebrew: "קראטה", category: "Sports", emoji: "🥋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Judo", hebrew: "ג'ודו", category: "Sports", emoji: "🥋", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Surfing", hebrew: "גלישה", category: "Sports", emoji: "🏄", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Skiing", hebrew: "סקי", category: "Sports", emoji: "⛷️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Skating", hebrew: "החלקה", category: "Sports", emoji: "⛸️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Volleyball", hebrew: "כדורעף", category: "Sports", emoji: "🏐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Badminton", hebrew: "בדמינטון", category: "Sports", emoji: "🏸", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Archery", hebrew: "קשתות", category: "Sports", emoji: "🏹", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gymnastics", hebrew: "התעמלות", category: "Sports", emoji: "🤸", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wrestling", hebrew: "היאבקות", category: "Sports", emoji: "🤼", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fencing", hebrew: "סיוף", category: "Sports", emoji: "🤺", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== TECHNOLOGY =====
  { english: "Computer", hebrew: "מחשב", category: "Technology", emoji: "💻", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Phone", hebrew: "טלפון", category: "Technology", emoji: "📱", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tablet", hebrew: "טאבלט", category: "Technology", emoji: "📲", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Laptop", hebrew: "מחשב נייד", category: "Technology", emoji: "💻", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mouse", hebrew: "עכבר", category: "Technology", emoji: "🖱️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Keyboard", hebrew: "מקלדת", category: "Technology", emoji: "⌨️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Screen", hebrew: "מסך", category: "Technology", emoji: "🖥️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Printer", hebrew: "מדפסת", category: "Technology", emoji: "🖨️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Camera", hebrew: "מצלמה", category: "Technology", emoji: "📷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Video", hebrew: "וידאו", category: "Technology", emoji: "📹", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Robot", hebrew: "רובוט", category: "Technology", emoji: "🤖", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Internet", hebrew: "אינטרנט", category: "Technology", emoji: "🌐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Email", hebrew: "דוא״ל", category: "Technology", emoji: "📧", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Website", hebrew: "אתר", category: "Technology", emoji: "🌍", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "App", hebrew: "אפליקציה", category: "Technology", emoji: "📱", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Game", hebrew: "משחק", category: "Technology", emoji: "🎮", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Console", hebrew: "קונסולה", category: "Technology", emoji: "🎮", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Headphones", hebrew: "אוזניות", category: "Technology", emoji: "🎧", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Speaker", hebrew: "רמקול", category: "Technology", emoji: "🔊", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Battery", hebrew: "סוללה", category: "Technology", emoji: "🔋", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Charger", hebrew: "מטען", category: "Technology", emoji: "🔌", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "USB", hebrew: "יו אס בי", category: "Technology", emoji: "🔌", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Drone", hebrew: "רחפן", category: "Technology", emoji: "🛸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Smart Watch", hebrew: "שעון חכם", category: "Technology", emoji: "⌚", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "VR", hebrew: "מציאות מדומה", category: "Technology", emoji: "🥽", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== VEHICLES =====
  { english: "Car", hebrew: "מכונית", category: "Vehicles", emoji: "🚗", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bus", hebrew: "אוטובוס", category: "Vehicles", emoji: "🚌", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Train", hebrew: "רכבת", category: "Vehicles", emoji: "🚂", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Plane", hebrew: "מטוס", category: "Vehicles", emoji: "✈️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Boat", hebrew: "סירה", category: "Vehicles", emoji: "⛵", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ship", hebrew: "אנייה", category: "Vehicles", emoji: "🚢", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Helicopter", hebrew: "מסוק", category: "Vehicles", emoji: "🚁", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Motorcycle", hebrew: "אופנוע", category: "Vehicles", emoji: "🏍️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bicycle", hebrew: "אופניים", category: "Vehicles", emoji: "🚲", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scooter", hebrew: "קורקינט", category: "Vehicles", emoji: "🛴", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Truck", hebrew: "משאית", category: "Vehicles", emoji: "🚚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Taxi", hebrew: "מונית", category: "Vehicles", emoji: "🚕", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ambulance", hebrew: "אמבולנס", category: "Vehicles", emoji: "🚑", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fire Truck", hebrew: "כבאית", category: "Vehicles", emoji: "🚒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Police Car", hebrew: "ניידת", category: "Vehicles", emoji: "🚓", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tractor", hebrew: "טרקטור", category: "Vehicles", emoji: "🚜", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Subway", hebrew: "רכבת תחתית", category: "Vehicles", emoji: "🚇", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rocket", hebrew: "טיל", category: "Vehicles", emoji: "🚀", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spaceship", hebrew: "חללית", category: "Vehicles", emoji: "🛸", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jet", hebrew: "סילון", category: "Vehicles", emoji: "🛩️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Van", hebrew: "ואן", category: "Vehicles", emoji: "🚐", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Canoe", hebrew: "קאנו", category: "Vehicles", emoji: "🛶", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ferry", hebrew: "מעבורת", category: "Vehicles", emoji: "⛴️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Yacht", hebrew: "יאכטה", category: "Vehicles", emoji: "🛥️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sailboat", hebrew: "מפרשית", category: "Vehicles", emoji: "⛵", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE OBJECTS =====
  { english: "Pencil", hebrew: "עיפרון", category: "Objects", emoji: "✏️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pen", hebrew: "עט", category: "Objects", emoji: "🖊️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eraser", hebrew: "מחק", category: "Objects", emoji: "🧹", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ruler", hebrew: "סרגל", category: "Objects", emoji: "📏", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scissors", hebrew: "מספריים", category: "Objects", emoji: "✂️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Glue", hebrew: "דבק", category: "Objects", emoji: "🧴", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tape", hebrew: "סרט דבק", category: "Objects", emoji: "📼", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Notebook", hebrew: "מחברת", category: "Objects", emoji: "📓", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Backpack", hebrew: "תיק גב", category: "Objects", emoji: "🎒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Umbrella", hebrew: "מטריה", category: "Objects", emoji: "☂️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Glasses", hebrew: "משקפיים", category: "Objects", emoji: "👓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Watch", hebrew: "שעון", category: "Objects", emoji: "⌚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ring", hebrew: "טבעת", category: "Objects", emoji: "💍", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Necklace", hebrew: "שרשרת", category: "Objects", emoji: "📿", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wallet", hebrew: "ארנק", category: "Objects", emoji: "👛", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Keys", hebrew: "מפתחות", category: "Objects", emoji: "🔑", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lock", hebrew: "מנעול", category: "Objects", emoji: "🔒", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Box", hebrew: "קופסה", category: "Objects", emoji: "📦", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bag", hebrew: "תיק", category: "Objects", emoji: "👜", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bottle", hebrew: "בקבוק", category: "Objects", emoji: "🍼", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cup", hebrew: "כוס", category: "Objects", emoji: "🥤", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Plate", hebrew: "צלחת", category: "Objects", emoji: "🍽️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bowl", hebrew: "קערה", category: "Objects", emoji: "🥣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spoon", hebrew: "כף", category: "Objects", emoji: "🥄", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fork", hebrew: "מזלג", category: "Objects", emoji: "🍴", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Knife", hebrew: "סכין", category: "Objects", emoji: "🔪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Towel", hebrew: "מגבת", category: "Objects", emoji: "🛁", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soap", hebrew: "סבון", category: "Objects", emoji: "🧼", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Brush", hebrew: "מברשת", category: "Objects", emoji: "🪥", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Comb", hebrew: "מסרק", category: "Objects", emoji: "🪮", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mirror", hebrew: "מראה", category: "Objects", emoji: "🪞", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pillow", hebrew: "כרית", category: "Objects", emoji: "🛏️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Blanket", hebrew: "שמיכה", category: "Objects", emoji: "🛏️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Candle", hebrew: "נר", category: "Objects", emoji: "🕯️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Map", hebrew: "מפה", category: "Objects", emoji: "🗺️", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flag", hebrew: "דגל", category: "Objects", emoji: "🚩", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Calendar", hebrew: "לוח שנה", category: "Objects", emoji: "📅", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Clock", hebrew: "שעון קיר", category: "Objects", emoji: "🕐", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bell", hebrew: "פעמון", category: "Objects", emoji: "🔔", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toy", hebrew: "צעצוע", category: "Objects", emoji: "🧸", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Doll", hebrew: "בובה", category: "Objects", emoji: "🎎", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kite", hebrew: "עפיפון", category: "Objects", emoji: "🪁", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Puzzle", hebrew: "פאזל", category: "Objects", emoji: "🧩", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Balloon", hebrew: "בלון", category: "Objects", emoji: "🎈", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gift", hebrew: "מתנה", category: "Objects", emoji: "🎁", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE FOOD =====
  { english: "Egg", hebrew: "ביצה", category: "Food", emoji: "🥚", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Milk", hebrew: "חלב", category: "Food", emoji: "🥛", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Juice", hebrew: "מיץ", category: "Food", emoji: "🧃", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Water", hebrew: "מים", category: "Food", emoji: "💧", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Coffee", hebrew: "קפה", category: "Food", emoji: "☕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tea", hebrew: "תה", category: "Food", emoji: "🍵", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sugar", hebrew: "סוכר", category: "Food", emoji: "🧂", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Salt", hebrew: "מלח", category: "Food", emoji: "🧂", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pepper", hebrew: "פלפל", category: "Food", emoji: "🌶️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sandwich", hebrew: "כריך", category: "Food", emoji: "🥪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Burger", hebrew: "המבורגר", category: "Food", emoji: "🍔", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hot Dog", hebrew: "נקניקייה", category: "Food", emoji: "🌭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Taco", hebrew: "טאקו", category: "Food", emoji: "🌮", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sushi", hebrew: "סושי", category: "Food", emoji: "🍣", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Noodles", hebrew: "אטריות", category: "Food", emoji: "🍜", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pancake", hebrew: "פנקייק", category: "Food", emoji: "🥞", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Waffle", hebrew: "וופל", category: "Food", emoji: "🧇", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cupcake", hebrew: "קאפקייק", category: "Food", emoji: "🧁", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pie", hebrew: "פאי", category: "Food", emoji: "🥧", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cookie", hebrew: "עוגייה", category: "Food", emoji: "🍪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chocolate", hebrew: "שוקולד", category: "Food", emoji: "🍫", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Candy", hebrew: "סוכריה", category: "Food", emoji: "🍬", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Peanut", hebrew: "בוטן", category: "Food", emoji: "🥜", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Coconut", hebrew: "קוקוס", category: "Food", emoji: "🥥", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pineapple", hebrew: "אננס", category: "Food", emoji: "🍍", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Strawberry", hebrew: "תות", category: "Food", emoji: "🍓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Blueberry", hebrew: "אוכמניה", category: "Food", emoji: "🫐", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Melon", hebrew: "מלון", category: "Food", emoji: "🍈", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kiwi", hebrew: "קיווי", category: "Food", emoji: "🥝", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Avocado", hebrew: "אבוקדו", category: "Food", emoji: "🥑", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Broccoli", hebrew: "ברוקולי", category: "Food", emoji: "🥦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cucumber", hebrew: "מלפפון", category: "Food", emoji: "🥒", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lettuce", hebrew: "חסה", category: "Food", emoji: "🥬", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mushroom", hebrew: "פטריה", category: "Food", emoji: "🍄", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Garlic", hebrew: "שום", category: "Food", emoji: "🧄", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== CLOTHES =====
  { english: "Shirt", hebrew: "חולצה", category: "Clothes", emoji: "👕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pants", hebrew: "מכנסיים", category: "Clothes", emoji: "👖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shoes", hebrew: "נעליים", category: "Clothes", emoji: "👟", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Socks", hebrew: "גרביים", category: "Clothes", emoji: "🧦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dress", hebrew: "שמלה", category: "Clothes", emoji: "👗", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jacket", hebrew: "ז'קט", category: "Clothes", emoji: "🧥", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Coat", hebrew: "מעיל", category: "Clothes", emoji: "🧥", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scarf", hebrew: "צעיף", category: "Clothes", emoji: "🧣", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gloves", hebrew: "כפפות", category: "Clothes", emoji: "🧤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Boots", hebrew: "מגפיים", category: "Clothes", emoji: "👢", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Skirt", hebrew: "חצאית", category: "Clothes", emoji: "👗", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sweater", hebrew: "סוודר", category: "Clothes", emoji: "🧶", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Belt", hebrew: "חגורה", category: "Clothes", emoji: "👔", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tie", hebrew: "עניבה", category: "Clothes", emoji: "👔", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Jeans", hebrew: "ג'ינס", category: "Clothes", emoji: "👖", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shorts", hebrew: "מכנסיים קצרים", category: "Clothes", emoji: "🩳", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pajamas", hebrew: "פיג'מה", category: "Clothes", emoji: "🛌", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Slippers", hebrew: "נעלי בית", category: "Clothes", emoji: "🥿", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hoodie", hebrew: "קפוצ'ון", category: "Clothes", emoji: "👕", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cap", hebrew: "כובע מצחייה", category: "Clothes", emoji: "🧢", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sandals", hebrew: "סנדלים", category: "Clothes", emoji: "👡", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Uniform", hebrew: "מדים", category: "Clothes", emoji: "👔", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Vest", hebrew: "אפוד", category: "Clothes", emoji: "🦺", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pocket", hebrew: "כיס", category: "Clothes", emoji: "👖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zipper", hebrew: "רוכסן", category: "Clothes", emoji: "🔗", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Button", hebrew: "כפתור", category: "Clothes", emoji: "🔘", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== WEATHER =====
  { english: "Sunny", hebrew: "שמשי", category: "Weather", emoji: "☀️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rainy", hebrew: "גשום", category: "Weather", emoji: "🌧️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cloudy", hebrew: "מעונן", category: "Weather", emoji: "☁️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Windy", hebrew: "סוער", category: "Weather", emoji: "💨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Snowy", hebrew: "מושלג", category: "Weather", emoji: "❄️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Warm", hebrew: "חמים", category: "Weather", emoji: "🌡️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cold", hebrew: "קר", category: "Weather", emoji: "🥶", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Frost", hebrew: "כפור", category: "Weather", emoji: "🧊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hail", hebrew: "ברד", category: "Weather", emoji: "🌨️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Breeze", hebrew: "משב רוח", category: "Weather", emoji: "🍃", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Drizzle", hebrew: "טפטוף", category: "Weather", emoji: "🌦️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Humid", hebrew: "לח", category: "Weather", emoji: "💧", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flood", hebrew: "שיטפון", category: "Weather", emoji: "🌊", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tornado", hebrew: "טורנדו", category: "Weather", emoji: "🌪️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sunshine", hebrew: "שמש", category: "Weather", emoji: "🌞", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Puddle", hebrew: "שלולית", category: "Weather", emoji: "💧", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== SCHOOL =====
  { english: "Student", hebrew: "תלמיד", category: "School", emoji: "👨‍🎓", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Homework", hebrew: "שיעורי בית", category: "School", emoji: "📝", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lesson", hebrew: "שיעור", category: "School", emoji: "📖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Class", hebrew: "כיתה", category: "School", emoji: "🏫", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Desk", hebrew: "שולחן כתיבה", category: "School", emoji: "🪑", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Board", hebrew: "לוח", category: "School", emoji: "📋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Chalk", hebrew: "גיר", category: "School", emoji: "🖍️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Crayon", hebrew: "צבע שעווה", category: "School", emoji: "🖍️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Paint", hebrew: "צבע", category: "School", emoji: "🎨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Test", hebrew: "מבחן", category: "School", emoji: "📝", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grade", hebrew: "ציון", category: "School", emoji: "💯", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Recess", hebrew: "הפסקה", category: "School", emoji: "🛝", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Marker", hebrew: "טוש", category: "School", emoji: "🖊️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Globe", hebrew: "גלובוס", category: "School", emoji: "🌍", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lunch Box", hebrew: "קופסת אוכל", category: "School", emoji: "🍱", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Exam", hebrew: "בחינה", category: "School", emoji: "📄", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Quiz", hebrew: "חידון", category: "School", emoji: "❓", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MUSIC =====
  { english: "Piano", hebrew: "פסנתר", category: "Music", emoji: "🎹", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Guitar", hebrew: "גיטרה", category: "Music", emoji: "🎸", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Drum", hebrew: "תוף", category: "Music", emoji: "🥁", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flute", hebrew: "חליל", category: "Music", emoji: "🪈", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Violin", hebrew: "כינור", category: "Music", emoji: "🎻", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Trumpet", hebrew: "חצוצרה", category: "Music", emoji: "🎺", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Song", hebrew: "שיר", category: "Music", emoji: "🎵", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Band", hebrew: "להקה", category: "Music", emoji: "🎤", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Concert", hebrew: "הופעה", category: "Music", emoji: "🎶", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rhythm", hebrew: "קצב", category: "Music", emoji: "🎵", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Melody", hebrew: "מנגינה", category: "Music", emoji: "🎼", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Harp", hebrew: "נבל", category: "Music", emoji: "🎵", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Xylophone", hebrew: "קסילופון", category: "Music", emoji: "🎵", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tambourine", hebrew: "תוף מרים", category: "Music", emoji: "🪇", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Saxophone", hebrew: "סקסופון", category: "Music", emoji: "🎷", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== TIME =====
  { english: "Morning", hebrew: "בוקר", category: "Time", emoji: "🌅", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Afternoon", hebrew: "אחר הצהריים", category: "Time", emoji: "🌤️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Evening", hebrew: "ערב", category: "Time", emoji: "🌆", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Night", hebrew: "לילה", category: "Time", emoji: "🌙", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Today", hebrew: "היום", category: "Time", emoji: "📅", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tomorrow", hebrew: "מחר", category: "Time", emoji: "➡️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Yesterday", hebrew: "אתמול", category: "Time", emoji: "⬅️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Week", hebrew: "שבוע", category: "Time", emoji: "📆", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Month", hebrew: "חודש", category: "Time", emoji: "📅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Year", hebrew: "שנה", category: "Time", emoji: "🗓️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hour", hebrew: "שעה", category: "Time", emoji: "🕐", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Minute", hebrew: "דקה", category: "Time", emoji: "⏱️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Second", hebrew: "שניה", category: "Time", emoji: "⏰", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spring", hebrew: "אביב", category: "Time", emoji: "🌸", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Summer", hebrew: "קיץ", category: "Time", emoji: "☀️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Autumn", hebrew: "סתיו", category: "Time", emoji: "🍂", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Winter", hebrew: "חורף", category: "Time", emoji: "❄️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Monday", hebrew: "יום שני", category: "Time", emoji: "📅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tuesday", hebrew: "יום שלישי", category: "Time", emoji: "📅", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wednesday", hebrew: "יום רביעי", category: "Time", emoji: "📅", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thursday", hebrew: "יום חמישי", category: "Time", emoji: "📅", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Friday", hebrew: "יום שישי", category: "Time", emoji: "📅", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Saturday", hebrew: "שבת", category: "Time", emoji: "📅", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sunday", hebrew: "יום ראשון", category: "Time", emoji: "📅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== ACTIONS (Verbs) =====
  { english: "Walk", hebrew: "ללכת", category: "Actions", emoji: "🚶", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Talk", hebrew: "לדבר", category: "Actions", emoji: "💬", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eat", hebrew: "לאכול", category: "Actions", emoji: "🍽️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Drink", hebrew: "לשתות", category: "Actions", emoji: "🥤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sleep", hebrew: "לישון", category: "Actions", emoji: "😴", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Read", hebrew: "לקרוא", category: "Actions", emoji: "📖", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Write", hebrew: "לכתוב", category: "Actions", emoji: "✍️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Draw", hebrew: "לצייר", category: "Actions", emoji: "🎨", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cook", hebrew: "לבשל", category: "Actions", emoji: "👨‍🍳", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Clean", hebrew: "לנקות", category: "Actions", emoji: "🧹", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wash", hebrew: "לשטוף", category: "Actions", emoji: "🧼", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Open", hebrew: "לפתוח", category: "Actions", emoji: "📂", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Close", hebrew: "לסגור", category: "Actions", emoji: "📁", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Push", hebrew: "לדחוף", category: "Actions", emoji: "👐", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pull", hebrew: "למשוך", category: "Actions", emoji: "🤏", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Throw", hebrew: "לזרוק", category: "Actions", emoji: "🤾", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Catch", hebrew: "לתפוס", category: "Actions", emoji: "🤲", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Climb", hebrew: "לטפס", category: "Actions", emoji: "🧗", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hide", hebrew: "להתחבא", category: "Actions", emoji: "🫣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Laugh", hebrew: "לצחוק", category: "Actions", emoji: "😂", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cry", hebrew: "לבכות", category: "Actions", emoji: "😢", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sing", hebrew: "לשיר", category: "Actions", emoji: "🎤", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dance", hebrew: "לרקוד", category: "Actions", emoji: "💃", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Think", hebrew: "לחשוב", category: "Actions", emoji: "🤔", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dream", hebrew: "לחלום", category: "Actions", emoji: "💭", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Build", hebrew: "לבנות", category: "Actions", emoji: "🏗️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fix", hebrew: "לתקן", category: "Actions", emoji: "🔧", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Give", hebrew: "לתת", category: "Actions", emoji: "🤲", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Take", hebrew: "לקחת", category: "Actions", emoji: "✊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Help", hebrew: "לעזור", category: "Actions", emoji: "🤝", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Share", hebrew: "לשתף", category: "Actions", emoji: "🤝", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wait", hebrew: "לחכות", category: "Actions", emoji: "⏳", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Stop", hebrew: "לעצור", category: "Actions", emoji: "🛑", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Start", hebrew: "להתחיל", category: "Actions", emoji: "▶️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Listen", hebrew: "להקשיב", category: "Actions", emoji: "👂", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Look", hebrew: "להסתכל", category: "Actions", emoji: "👀", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Smile", hebrew: "לחייך", category: "Actions", emoji: "😊", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hug", hebrew: "לחבק", category: "Actions", emoji: "🤗", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Kiss", hebrew: "לנשק", category: "Actions", emoji: "😘", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wave", hebrew: "לנופף", category: "Actions", emoji: "👋", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Clap", hebrew: "למחוא כפיים", category: "Actions", emoji: "👏", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Point", hebrew: "להצביע", category: "Actions", emoji: "👆", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== SHAPES =====
  { english: "Circle", hebrew: "עיגול", category: "Shapes", emoji: "⭕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Square", hebrew: "ריבוע", category: "Shapes", emoji: "⬜", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Triangle", hebrew: "משולש", category: "Shapes", emoji: "🔺", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rectangle", hebrew: "מלבן", category: "Shapes", emoji: "🖼️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Diamond", hebrew: "יהלום", category: "Shapes", emoji: "💎", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Oval", hebrew: "אליפסה", category: "Shapes", emoji: "🥚", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cube", hebrew: "קוביה", category: "Shapes", emoji: "🧊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sphere", hebrew: "כדור", category: "Shapes", emoji: "🔮", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cone", hebrew: "חרוט", category: "Shapes", emoji: "📐", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cylinder", hebrew: "גליל", category: "Shapes", emoji: "🧪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pentagon", hebrew: "מחומש", category: "Shapes", emoji: "🖐️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hexagon", hebrew: "משושה", category: "Shapes", emoji: "", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },

  // ===== NUMBERS (as words) =====
  { english: "One", hebrew: "אחד", category: "Numbers", emoji: "1️⃣", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Two", hebrew: "שתיים", category: "Numbers", emoji: "2️⃣", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Three", hebrew: "שלוש", category: "Numbers", emoji: "3️⃣", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Four", hebrew: "ארבע", category: "Numbers", emoji: "4️⃣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Five", hebrew: "חמש", category: "Numbers", emoji: "5️⃣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Six", hebrew: "שש", category: "Numbers", emoji: "6️⃣", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Seven", hebrew: "שבע", category: "Numbers", emoji: "7️⃣", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eight", hebrew: "שמונה", category: "Numbers", emoji: "8️⃣", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Nine", hebrew: "תשע", category: "Numbers", emoji: "9️⃣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ten", hebrew: "עשר", category: "Numbers", emoji: "🔟", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Twenty", hebrew: "עשרים", category: "Numbers", emoji: "🔢", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hundred", hebrew: "מאה", category: "Numbers", emoji: "💯", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zero", hebrew: "אפס", category: "Numbers", emoji: "0️⃣", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "First", hebrew: "ראשון", category: "Numbers", emoji: "🥇", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Last", hebrew: "אחרון", category: "Numbers", emoji: "🏁", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== INSECTS =====
  { english: "Ant", hebrew: "נמלה", category: "Insects", emoji: "🐜", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bee", hebrew: "דבורה", category: "Insects", emoji: "🐝", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spider", hebrew: "עכביש", category: "Insects", emoji: "🕷️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ladybug", hebrew: "פרת משה רבנו", category: "Insects", emoji: "🐞", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Beetle", hebrew: "חיפושית", category: "Insects", emoji: "🪲", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cricket", hebrew: "צרצר", category: "Insects", emoji: "🦗", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Worm", hebrew: "תולעת", category: "Insects", emoji: "🪱", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Moth", hebrew: "עש", category: "Insects", emoji: "🦋", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wasp", hebrew: "צרעה", category: "Insects", emoji: "🐝", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Firefly", hebrew: "גחלילית", category: "Insects", emoji: "✨", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Snail", hebrew: "חילזון", category: "Insects", emoji: "🐌", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Scorpion", hebrew: "עקרב", category: "Insects", emoji: "🦂", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mosquito", hebrew: "יתוש", category: "Insects", emoji: "🦟", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cockroach", hebrew: "ג'וק", category: "Insects", emoji: "🪳", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== SEA ANIMALS =====
  { english: "Crab", hebrew: "סרטן", category: "Sea Animals", emoji: "🦀", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lobster", hebrew: "לובסטר", category: "Sea Animals", emoji: "🦞", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Seahorse", hebrew: "סוסון ים", category: "Sea Animals", emoji: "🐡", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Starfish", hebrew: "כוכב ים", category: "Sea Animals", emoji: "⭐", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Clam", hebrew: "צדפה", category: "Sea Animals", emoji: "🐚", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Seal", hebrew: "כלב ים", category: "Sea Animals", emoji: "🦭", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Walrus", hebrew: "סוס ים", category: "Sea Animals", emoji: "🦭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Otter", hebrew: "לוטרה", category: "Sea Animals", emoji: "🦦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shrimp", hebrew: "שרימפ", category: "Sea Animals", emoji: "🦐", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Squid", hebrew: "דיונון", category: "Sea Animals", emoji: "🦑", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eel", hebrew: "צלופח", category: "Sea Animals", emoji: "🐍", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Coral", hebrew: "אלמוג", category: "Sea Animals", emoji: "🪸", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Whale", hebrew: "לוויתן", category: "Sea Animals", emoji: "🐋", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dolphin", hebrew: "דולפין", category: "Sea Animals", emoji: "🐬", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shark", hebrew: "כריש", category: "Sea Animals", emoji: "🦈", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Penguin", hebrew: "פינגווין", category: "Sea Animals", emoji: "🐧", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== BIRDS =====
  { english: "Eagle", hebrew: "נשר", category: "Birds", emoji: "🦅", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Parrot", hebrew: "תוכי", category: "Birds", emoji: "🦜", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Owl", hebrew: "ינשוף", category: "Birds", emoji: "🦉", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Swan", hebrew: "ברבור", category: "Birds", emoji: "🦢", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Crow", hebrew: "עורב", category: "Birds", emoji: "🐦‍⬛", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sparrow", hebrew: "דרור", category: "Birds", emoji: "🐦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pigeon", hebrew: "יונה", category: "Birds", emoji: "🕊️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Peacock", hebrew: "טווס", category: "Birds", emoji: "🦚", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Falcon", hebrew: "בז", category: "Birds", emoji: "🦅", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Robin", hebrew: "אדום החזה", category: "Birds", emoji: "🐦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hawk", hebrew: "נץ", category: "Birds", emoji: "🦅", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Stork", hebrew: "חסידה", category: "Birds", emoji: "🐦", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pelican", hebrew: "שקנאי", category: "Birds", emoji: "🐦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toucan", hebrew: "טוקן", category: "Birds", emoji: "🐦", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Woodpecker", hebrew: "נקר", category: "Birds", emoji: "🐦", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== ADJECTIVES =====
  { english: "Small", hebrew: "קטן", category: "Adjectives", emoji: "🐜", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tall", hebrew: "גבוה", category: "Adjectives", emoji: "🦒", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Short", hebrew: "נמוך", category: "Adjectives", emoji: "⬇️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Long", hebrew: "ארוך", category: "Adjectives", emoji: "📏", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wide", hebrew: "רחב", category: "Adjectives", emoji: "↔️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thin", hebrew: "דק", category: "Adjectives", emoji: "📄", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Round", hebrew: "עגול", category: "Adjectives", emoji: "⭕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Heavy", hebrew: "כבד", category: "Adjectives", emoji: "🏋️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soft", hebrew: "רך", category: "Adjectives", emoji: "🧸", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hard", hebrew: "קשה", category: "Adjectives", emoji: "🪨", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wet", hebrew: "רטוב", category: "Adjectives", emoji: "💦", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dry", hebrew: "יבש", category: "Adjectives", emoji: "🏜️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "New", hebrew: "חדש", category: "Adjectives", emoji: "✨", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Old", hebrew: "ישן", category: "Adjectives", emoji: "🏚️", difficulty: 1, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Young", hebrew: "צעיר", category: "Adjectives", emoji: "👶", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Slow", hebrew: "איטי", category: "Adjectives", emoji: "🐢", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Loud", hebrew: "רועש", category: "Adjectives", emoji: "📢", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Quiet", hebrew: "שקט", category: "Adjectives", emoji: "🤫", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Strong", hebrew: "חזק", category: "Adjectives", emoji: "💪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Weak", hebrew: "חלש", category: "Adjectives", emoji: "😵", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Full", hebrew: "מלא", category: "Adjectives", emoji: "🥤", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Empty", hebrew: "ריק", category: "Adjectives", emoji: "📭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Deep", hebrew: "עמוק", category: "Adjectives", emoji: "🌊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Smooth", hebrew: "חלק", category: "Adjectives", emoji: "🧈", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rough", hebrew: "מחוספס", category: "Adjectives", emoji: "🪨", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sweet", hebrew: "מתוק", category: "Adjectives", emoji: "🍬", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sour", hebrew: "חמוץ", category: "Adjectives", emoji: "🍋", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Spicy", hebrew: "חריף", category: "Adjectives", emoji: "🌶️", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fresh", hebrew: "טרי", category: "Adjectives", emoji: "🌿", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dirty", hebrew: "מלוכלך", category: "Adjectives", emoji: "💩", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pretty", hebrew: "יפה", category: "Adjectives", emoji: "🌺", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ugly", hebrew: "מכוער", category: "Adjectives", emoji: "👹", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Funny", hebrew: "מצחיק", category: "Adjectives", emoji: "😄", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Smart", hebrew: "חכם", category: "Adjectives", emoji: "🧠", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Crazy", hebrew: "משוגע", category: "Adjectives", emoji: "🤪", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tiny", hebrew: "זעיר", category: "Adjectives", emoji: "🔬", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Huge", hebrew: "ענק", category: "Adjectives", emoji: "🏔️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bright", hebrew: "בהיר", category: "Adjectives", emoji: "💡", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dark", hebrew: "חשוך", category: "Adjectives", emoji: "🌑", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Flat", hebrew: "שטוח", category: "Adjectives", emoji: "📄", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sharp", hebrew: "חד", category: "Adjectives", emoji: "🔪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thick", hebrew: "עבה", category: "Adjectives", emoji: "📕", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sick", hebrew: "חולה", category: "Adjectives", emoji: "🤒", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Healthy", hebrew: "בריא", category: "Adjectives", emoji: "💚", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rich", hebrew: "עשיר", category: "Adjectives", emoji: "💰", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Poor", hebrew: "עני", category: "Adjectives", emoji: "😔", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Safe", hebrew: "בטוח", category: "Adjectives", emoji: "🛡️", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Dangerous", hebrew: "מסוכן", category: "Adjectives", emoji: "⚠️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Beautiful", hebrew: "יפהפה", category: "Adjectives", emoji: "🌹", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wonderful", hebrew: "נפלא", category: "Adjectives", emoji: "✨", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Terrible", hebrew: "נורא", category: "Adjectives", emoji: "😱", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Delicious", hebrew: "טעים", category: "Adjectives", emoji: "😋", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Colorful", hebrew: "צבעוני", category: "Adjectives", emoji: "🌈", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== GARDEN =====
  { english: "Seed", hebrew: "זרע", category: "Garden", emoji: "🌱", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Soil", hebrew: "אדמה", category: "Garden", emoji: "🪴", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Root", hebrew: "שורש", category: "Garden", emoji: "🌿", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Stem", hebrew: "גבעול", category: "Garden", emoji: "🌱", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Petal", hebrew: "עלי כותרת", category: "Garden", emoji: "🌸", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Thorn", hebrew: "קוץ", category: "Garden", emoji: "🌹", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Weed", hebrew: "עשב שוטה", category: "Garden", emoji: "🌿", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pot", hebrew: "עציץ", category: "Garden", emoji: "🪴", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hose", hebrew: "צינור", category: "Garden", emoji: "💧", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fence", hebrew: "גדר", category: "Garden", emoji: "🏡", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lawn", hebrew: "מדשאה", category: "Garden", emoji: "🌱", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sprout", hebrew: "נבט", category: "Garden", emoji: "🌱", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Daisy", hebrew: "חיננית", category: "Garden", emoji: "🌼", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tulip", hebrew: "צבעוני", category: "Garden", emoji: "🌷", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cactus", hebrew: "קקטוס", category: "Garden", emoji: "🌵", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Vine", hebrew: "גפן", category: "Garden", emoji: "🍇", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== MORE ANIMALS (Farm & Pets) =====
  { english: "Cow", hebrew: "פרה", category: "Animals", emoji: "🐄", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sheep", hebrew: "כבשה", category: "Animals", emoji: "🐑", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Goat", hebrew: "עז", category: "Animals", emoji: "🐐", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Donkey", hebrew: "חמור", category: "Animals", emoji: "🫏", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Camel", hebrew: "גמל", category: "Animals", emoji: "🐪", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hamster", hebrew: "אוגר", category: "Animals", emoji: "🐹", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Parrot", hebrew: "תוכי", category: "Animals", emoji: "🦜", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Fox", hebrew: "שועל", category: "Animals", emoji: "🦊", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Wolf", hebrew: "זאב", category: "Animals", emoji: "🐺", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Deer", hebrew: "צבי", category: "Animals", emoji: "🦌", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Snake", hebrew: "נחש", category: "Animals", emoji: "🐍", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lizard", hebrew: "לטאה", category: "Animals", emoji: "🦎", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mouse", hebrew: "עכבר", category: "Animals", emoji: "🐭", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bat", hebrew: "עטלף", category: "Animals", emoji: "🦇", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Panda", hebrew: "פנדה", category: "Animals", emoji: "🐼", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Gorilla", hebrew: "גורילה", category: "Animals", emoji: "🦍", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hippo", hebrew: "היפופוטם", category: "Animals", emoji: "🦛", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cheetah", hebrew: "ברדלס", category: "Animals", emoji: "🐆", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Leopard", hebrew: "נמר", category: "Animals", emoji: "🐆", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rhino", hebrew: "קרנף", category: "Animals", emoji: "🦏", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
];

// ===== DEFAULT SENTENCES DATA =====
const defaultSentences: Omit<SentenceData, 'id'>[] = [
  // === Five-word sentences (Sentence Builder Hard) ===
  { english: "I have a red ball", hebrew: "יש לי כדור אדום", words: ["I", "have", "a", "red", "ball"] },
  { english: "The cat is very small", hebrew: "החתול קטן מאוד", words: ["The", "cat", "is", "very", "small"] },
  { english: "My dog likes to run", hebrew: "הכלב שלי אוהב לרוץ", words: ["My", "dog", "likes", "to", "run"] },
  { english: "We go to school today", hebrew: "אנחנו הולכים לבית הספר היום", words: ["We", "go", "to", "school", "today"] },
  { english: "The sun is very hot", hebrew: "השמש חמה מאוד", words: ["The", "sun", "is", "very", "hot"] },
  { english: "I eat an apple today", hebrew: "אני אוכל תפוח היום", words: ["I", "eat", "an", "apple", "today"] },
  { english: "Mom reads a good book", hebrew: "אמא קוראת ספר טוב", words: ["Mom", "reads", "a", "good", "book"] },
  { english: "The bird can fly high", hebrew: "הציפור יכולה לעוף גבוה", words: ["The", "bird", "can", "fly", "high"] },
  { english: "I kick the ball hard", hebrew: "אני בועט בכדור חזק", words: ["I", "kick", "the", "ball", "hard"] },
  { english: "The fish swims in water", hebrew: "הדג שוחה במים", words: ["The", "fish", "swims", "in", "water"] },
  { english: "My sister likes pink shoes", hebrew: "אחותי אוהבת נעליים ורודות", words: ["My", "sister", "likes", "pink", "shoes"] },
  { english: "Dad drives a blue car", hebrew: "אבא נוהג במכונית כחולה", words: ["Dad", "drives", "a", "blue", "car"] },
  { english: "I drink milk every day", hebrew: "אני שותה חלב כל יום", words: ["I", "drink", "milk", "every", "day"] },
  { english: "The goalkeeper catches the ball", hebrew: "השוער תופס את הכדור", words: ["The", "goalkeeper", "catches", "the", "ball"] },
  { english: "We play soccer after school", hebrew: "אנחנו משחקים כדורגל אחרי בית הספר", words: ["We", "play", "soccer", "after", "school"] },
  { english: "The moon is in the sky", hebrew: "הירח בשמיים", words: ["The", "moon", "is", "in", "the", "sky"] },
  { english: "I wash my hands now", hebrew: "אני שוטף את הידיים עכשיו", words: ["I", "wash", "my", "hands", "now"] },
  { english: "The baby is sleeping now", hebrew: "התינוק ישן עכשיו", words: ["The", "baby", "is", "sleeping", "now"] },
  { english: "My teacher is very nice", hebrew: "המורה שלי נחמד מאוד", words: ["My", "teacher", "is", "very", "nice"] },
  { english: "I see a big tree", hebrew: "אני רואה עץ גדול", words: ["I", "see", "a", "big", "tree"] },
  { english: "The frog jumps very high", hebrew: "הצפרדע קופצת גבוה מאוד", words: ["The", "frog", "jumps", "very", "high"] },
  { english: "We eat pizza for dinner", hebrew: "אנחנו אוכלים פיצה לארוחת ערב", words: ["We", "eat", "pizza", "for", "dinner"] },
  { english: "The bus is very big", hebrew: "האוטובוס גדול מאוד", words: ["The", "bus", "is", "very", "big"] },
  { english: "I like to draw pictures", hebrew: "אני אוהב לצייר תמונות", words: ["I", "like", "to", "draw", "pictures"] },
  { english: "My brother has a bike", hebrew: "לאח שלי יש אופניים", words: ["My", "brother", "has", "a", "bike"] },
  { english: "It is cold and rainy", hebrew: "קר וגשום", words: ["It", "is", "cold", "and", "rainy"] },
  { english: "The cow gives us milk", hebrew: "הפרה נותנת לנו חלב", words: ["The", "cow", "gives", "us", "milk"] },
  { english: "I brush my teeth today", hebrew: "אני מצחצח שיניים היום", words: ["I", "brush", "my", "teeth", "today"] },
  { english: "The player scores a goal", hebrew: "השחקן מבקיע גול", words: ["The", "player", "scores", "a", "goal"] },
  { english: "I am happy and smiling", hebrew: "אני שמח ומחייך", words: ["I", "am", "happy", "and", "smiling"] },
  // === Family ===
  { english: "I love Mom", hebrew: "אני אוהב את אמא", words: ["I", "love", "Mom"] },
  { english: "Dad helps me", hebrew: "אבא עוזר לי", words: ["Dad", "helps", "me"] },
  { english: "My sister is nice", hebrew: "האחות שלי נחמדה", words: ["My", "sister", "is", "nice"] },
  { english: "My brother plays", hebrew: "האח שלי משחק", words: ["My", "brother", "plays"] },
  { english: "Grandma bakes cake", hebrew: "סבתא אופה עוגה", words: ["Grandma", "bakes", "cake"] },
  { english: "I love my family", hebrew: "אני אוהב את המשפחה שלי", words: ["I", "love", "my", "family"] },
  { english: "My baby laughs", hebrew: "התינוק שלי צוחק", words: ["My", "baby", "laughs"] },
  { english: "Grandpa reads books", hebrew: "סבא קורא ספרים", words: ["Grandpa", "reads", "books"] },
  { english: "My uncle is funny", hebrew: "הדוד שלי מצחיק", words: ["My", "uncle", "is", "funny"] },
  { english: "My aunt sings well", hebrew: "הדודה שלי שרה יפה", words: ["My", "aunt", "sings", "well"] },

  // === Daily Life ===
  { english: "I am happy", hebrew: "אני שמח", words: ["I", "am", "happy"] },
  { english: "This is fun", hebrew: "זה כיף", words: ["This", "is", "fun"] },
  { english: "I love to play", hebrew: "אני אוהב לשחק", words: ["I", "love", "to", "play"] },
  { english: "You are awesome", hebrew: "אתה מדהים", words: ["You", "are", "awesome"] },
  { english: "I like to read", hebrew: "אני אוהב לקרוא", words: ["I", "like", "to", "read"] },
  { english: "Good morning", hebrew: "בוקר טוב", words: ["Good", "morning"] },
  { english: "Good night", hebrew: "לילה טוב", words: ["Good", "night"] },
  { english: "I go to school", hebrew: "אני הולך לבית ספר", words: ["I", "go", "to", "school"] },
  { english: "I drink water", hebrew: "אני שותה מים", words: ["I", "drink", "water"] },
  { english: "I eat breakfast", hebrew: "אני אוכל ארוחת בוקר", words: ["I", "eat", "breakfast"] },
  { english: "We play outside", hebrew: "אנחנו משחקים בחוץ", words: ["We", "play", "outside"] },
  { english: "I brush my teeth", hebrew: "אני מצחצח שיניים", words: ["I", "brush", "my", "teeth"] },
  { english: "Time to sleep", hebrew: "הגיע זמן לישון", words: ["Time", "to", "sleep"] },
  { english: "I take a bath", hebrew: "אני מתרחץ", words: ["I", "take", "a", "bath"] },
  { english: "Let us go home", hebrew: "בואו נלך הביתה", words: ["Let", "us", "go", "home"] },

  // === Animals ===
  { english: "The dog runs", hebrew: "הכלב רץ", words: ["The", "dog", "runs"] },
  { english: "The cat sleeps", hebrew: "החתול ישן", words: ["The", "cat", "sleeps"] },
  { english: "Birds can fly", hebrew: "ציפורים יכולות לעוף", words: ["Birds", "can", "fly"] },
  { english: "The fish swims fast", hebrew: "הדג שוחה מהר", words: ["The", "fish", "swims", "fast"] },
  { english: "The horse runs fast", hebrew: "הסוס רץ מהר", words: ["The", "horse", "runs", "fast"] },
  { english: "The rabbit hops", hebrew: "הארנב קופץ", words: ["The", "rabbit", "hops"] },
  { english: "The frog jumps high", hebrew: "הצפרדע קופצת גבוה", words: ["The", "frog", "jumps", "high"] },
  { english: "The lion roars loud", hebrew: "האריה שואג בקול", words: ["The", "lion", "roars", "loud"] },
  { english: "The monkey climbs trees", hebrew: "הקוף מטפס על עצים", words: ["The", "monkey", "climbs", "trees"] },
  { english: "The snake is long", hebrew: "הנחש ארוך", words: ["The", "snake", "is", "long"] },
  { english: "The bear is big", hebrew: "הדוב גדול", words: ["The", "bear", "is", "big"] },
  { english: "The duck swims", hebrew: "הברווז שוחה", words: ["The", "duck", "swims"] },
  { english: "The cow gives milk", hebrew: "הפרה נותנת חלב", words: ["The", "cow", "gives", "milk"] },
  { english: "The pig is pink", hebrew: "החזיר ורוד", words: ["The", "pig", "is", "pink"] },
  { english: "The turtle is slow", hebrew: "הצב איטי", words: ["The", "turtle", "is", "slow"] },
  { english: "The elephant is huge", hebrew: "הפיל ענק", words: ["The", "elephant", "is", "huge"] },
  { english: "The penguin is cute", hebrew: "הפינגווין חמוד", words: ["The", "penguin", "is", "cute"] },
  { english: "The parrot talks", hebrew: "התוכי מדבר", words: ["The", "parrot", "talks"] },
  { english: "The owl sees well", hebrew: "הינשוף רואה טוב", words: ["The", "owl", "sees", "well"] },

  // === Food ===
  { english: "I like pizza", hebrew: "אני אוהב פיצה", words: ["I", "like", "pizza"] },
  { english: "The apple is red", hebrew: "התפוח אדום", words: ["The", "apple", "is", "red"] },
  { english: "I eat rice", hebrew: "אני אוכל אורז", words: ["I", "eat", "rice"] },
  { english: "The cake is sweet", hebrew: "העוגה מתוקה", words: ["The", "cake", "is", "sweet"] },
  { english: "I drink milk", hebrew: "אני שותה חלב", words: ["I", "drink", "milk"] },
  { english: "The banana is yellow", hebrew: "הבננה צהובה", words: ["The", "banana", "is", "yellow"] },
  { english: "I want ice cream", hebrew: "אני רוצה גלידה", words: ["I", "want", "ice", "cream"] },
  { english: "The soup is hot", hebrew: "המרק חם", words: ["The", "soup", "is", "hot"] },
  { english: "I like cheese", hebrew: "אני אוהב גבינה", words: ["I", "like", "cheese"] },
  { english: "The bread is fresh", hebrew: "הלחם טרי", words: ["The", "bread", "is", "fresh"] },
  { english: "I eat a sandwich", hebrew: "אני אוכל כריך", words: ["I", "eat", "a", "sandwich"] },
  { english: "The grapes are purple", hebrew: "הענבים סגולים", words: ["The", "grapes", "are", "purple"] },
  { english: "I like cookies", hebrew: "אני אוהב עוגיות", words: ["I", "like", "cookies"] },

  // === Colors ===
  { english: "The sky is blue", hebrew: "השמיים כחולים", words: ["The", "sky", "is", "blue"] },
  { english: "The sun is yellow", hebrew: "השמש צהובה", words: ["The", "sun", "is", "yellow"] },
  { english: "The grass is green", hebrew: "הדשא ירוק", words: ["The", "grass", "is", "green"] },
  { english: "Roses are red", hebrew: "ורדים אדומים", words: ["Roses", "are", "red"] },
  { english: "Snow is white", hebrew: "שלג לבן", words: ["Snow", "is", "white"] },
  { english: "The night is dark", hebrew: "הלילה חשוך", words: ["The", "night", "is", "dark"] },
  { english: "I see a rainbow", hebrew: "אני רואה קשת", words: ["I", "see", "a", "rainbow"] },
  { english: "My shirt is orange", hebrew: "החולצה שלי כתומה", words: ["My", "shirt", "is", "orange"] },

  // === Weather ===
  { english: "The sun is hot", hebrew: "השמש חמה", words: ["The", "sun", "is", "hot"] },
  { english: "It is raining", hebrew: "יורד גשם", words: ["It", "is", "raining"] },
  { english: "The wind blows hard", hebrew: "הרוח נושבת חזק", words: ["The", "wind", "blows", "hard"] },
  { english: "I see snow", hebrew: "אני רואה שלג", words: ["I", "see", "snow"] },
  { english: "The clouds are gray", hebrew: "העננים אפורים", words: ["The", "clouds", "are", "gray"] },
  { english: "It is very cold", hebrew: "מאוד קר", words: ["It", "is", "very", "cold"] },
  { english: "It is warm today", hebrew: "חם היום", words: ["It", "is", "warm", "today"] },
  { english: "I like sunny days", hebrew: "אני אוהב ימים שמשיים", words: ["I", "like", "sunny", "days"] },
  { english: "Thunder is loud", hebrew: "רעם חזק", words: ["Thunder", "is", "loud"] },

  // === School ===
  { english: "I read a book", hebrew: "אני קורא ספר", words: ["I", "read", "a", "book"] },
  { english: "I write my name", hebrew: "אני כותב את שמי", words: ["I", "write", "my", "name"] },
  { english: "The teacher is kind", hebrew: "המורה נחמדה", words: ["The", "teacher", "is", "kind"] },
  { english: "I count to ten", hebrew: "אני סופר עד עשר", words: ["I", "count", "to", "ten"] },
  { english: "I draw a picture", hebrew: "אני מצייר תמונה", words: ["I", "draw", "a", "picture"] },
  { english: "I like math", hebrew: "אני אוהב חשבון", words: ["I", "like", "math"] },
  { english: "We learn at school", hebrew: "אנחנו לומדים בבית ספר", words: ["We", "learn", "at", "school"] },
  { english: "I use a pencil", hebrew: "אני משתמש בעיפרון", words: ["I", "use", "a", "pencil"] },
  { english: "I open my backpack", hebrew: "אני פותח את התרמיל", words: ["I", "open", "my", "backpack"] },
  { english: "I sit at desk", hebrew: "אני יושב ליד השולחן", words: ["I", "sit", "at", "desk"] },

  // === Body ===
  { english: "I clap my hands", hebrew: "אני מוחא כפיים", words: ["I", "clap", "my", "hands"] },
  { english: "I see with eyes", hebrew: "אני רואה בעיניים", words: ["I", "see", "with", "eyes"] },
  { english: "I hear a sound", hebrew: "אני שומע צליל", words: ["I", "hear", "a", "sound"] },
  { english: "My nose smells food", hebrew: "האף שלי מריח אוכל", words: ["My", "nose", "smells", "food"] },
  { english: "I kick with legs", hebrew: "אני בועט ברגליים", words: ["I", "kick", "with", "legs"] },
  { english: "My head is round", hebrew: "הראש שלי עגול", words: ["My", "head", "is", "round"] },

  // === Clothes ===
  { english: "I wear my shoes", hebrew: "אני נועל נעליים", words: ["I", "wear", "my", "shoes"] },
  { english: "My hat is blue", hebrew: "הכובע שלי כחול", words: ["My", "hat", "is", "blue"] },
  { english: "I put on socks", hebrew: "אני שם גרביים", words: ["I", "put", "on", "socks"] },
  { english: "The jacket is warm", hebrew: "המעיל חם", words: ["The", "jacket", "is", "warm"] },
  { english: "I like my dress", hebrew: "אני אוהבת את השמלה", words: ["I", "like", "my", "dress"] },
  { english: "My gloves are red", hebrew: "הכפפות שלי אדומות", words: ["My", "gloves", "are", "red"] },
  { english: "I zip my coat", hebrew: "אני סוגר את המעיל", words: ["I", "zip", "my", "coat"] },

  // === Sports ===
  { english: "I like soccer", hebrew: "אני אוהב כדורגל", words: ["I", "like", "soccer"] },
  { english: "Kick the ball", hebrew: "בעט בכדור", words: ["Kick", "the", "ball"] },
  { english: "We win the game", hebrew: "אנחנו מנצחים במשחק", words: ["We", "win", "the", "game"] },
  { english: "I play soccer", hebrew: "אני משחק כדורגל", words: ["I", "play", "soccer"] },
  { english: "Pass the ball", hebrew: "העבר את הכדור", words: ["Pass", "the", "ball"] },
  { english: "The team plays well", hebrew: "הקבוצה משחקת טוב", words: ["The", "team", "plays", "well"] },
  { english: "I can swim fast", hebrew: "אני יכול לשחות מהר", words: ["I", "can", "swim", "fast"] },
  { english: "I ride my bike", hebrew: "אני רוכב על אופניים", words: ["I", "ride", "my", "bike"] },
  { english: "I throw the ball", hebrew: "אני זורק את הכדור", words: ["I", "throw", "the", "ball"] },
  { english: "I catch the ball", hebrew: "אני תופס את הכדור", words: ["I", "catch", "the", "ball"] },
  { english: "I run very fast", hebrew: "אני רץ מאוד מהר", words: ["I", "run", "very", "fast"] },
  { english: "I jump so high", hebrew: "אני קופץ כל כך גבוה", words: ["I", "jump", "so", "high"] },

  // === Nature ===
  { english: "The flower is pretty", hebrew: "הפרח יפה", words: ["The", "flower", "is", "pretty"] },
  { english: "The tree is tall", hebrew: "העץ גבוה", words: ["The", "tree", "is", "tall"] },
  { english: "The river is long", hebrew: "הנהר ארוך", words: ["The", "river", "is", "long"] },
  { english: "The mountain is big", hebrew: "ההר גדול", words: ["The", "mountain", "is", "big"] },
  { english: "I plant a seed", hebrew: "אני שותל זרע", words: ["I", "plant", "a", "seed"] },
  { english: "The leaf is green", hebrew: "העלה ירוק", words: ["The", "leaf", "is", "green"] },
  { english: "I see the moon", hebrew: "אני רואה את הירח", words: ["I", "see", "the", "moon"] },
  { english: "Stars shine at night", hebrew: "כוכבים זורחים בלילה", words: ["Stars", "shine", "at", "night"] },
  { english: "The lake is calm", hebrew: "האגם שקט", words: ["The", "lake", "is", "calm"] },
  { english: "The forest is big", hebrew: "היער גדול", words: ["The", "forest", "is", "big"] },

  // === Vehicles ===
  { english: "The car is fast", hebrew: "המכונית מהירה", words: ["The", "car", "is", "fast"] },
  { english: "The bus is big", hebrew: "האוטובוס גדול", words: ["The", "bus", "is", "big"] },
  { english: "The train goes far", hebrew: "הרכבת נוסעת רחוק", words: ["The", "train", "goes", "far"] },
  { english: "I ride the bike", hebrew: "אני רוכב על אופניים", words: ["I", "ride", "the", "bike"] },
  { english: "The plane flies high", hebrew: "המטוס עף גבוה", words: ["The", "plane", "flies", "high"] },
  { english: "The boat sails away", hebrew: "הסירה מפליגה", words: ["The", "boat", "sails", "away"] },
  { english: "The truck is heavy", hebrew: "המשאית כבדה", words: ["The", "truck", "is", "heavy"] },

  // === Home & Objects ===
  { english: "I open the door", hebrew: "אני פותח את הדלת", words: ["I", "open", "the", "door"] },
  { english: "The lamp is bright", hebrew: "המנורה בהירה", words: ["The", "lamp", "is", "bright"] },
  { english: "I sit on chair", hebrew: "אני יושב על כיסא", words: ["I", "sit", "on", "chair"] },
  { english: "The table is big", hebrew: "השולחן גדול", words: ["The", "table", "is", "big"] },
  { english: "I watch the clock", hebrew: "אני מסתכל על השעון", words: ["I", "watch", "the", "clock"] },
  { english: "The window is open", hebrew: "החלון פתוח", words: ["The", "window", "is", "open"] },
  { english: "I close the door", hebrew: "אני סוגר את הדלת", words: ["I", "close", "the", "door"] },
  { english: "The bed is soft", hebrew: "המיטה רכה", words: ["The", "bed", "is", "soft"] },
  { english: "I look at mirror", hebrew: "אני מסתכל במראה", words: ["I", "look", "at", "mirror"] },

  // === Places ===
  { english: "I go to park", hebrew: "אני הולך לפארק", words: ["I", "go", "to", "park"] },
  { english: "The beach is fun", hebrew: "חוף הים כיף", words: ["The", "beach", "is", "fun"] },
  { english: "I visit the zoo", hebrew: "אני מבקר בגן חיות", words: ["I", "visit", "the", "zoo"] },
  { english: "The library is quiet", hebrew: "הספרייה שקטה", words: ["The", "library", "is", "quiet"] },
  { english: "I swim at pool", hebrew: "אני שוחה בבריכה", words: ["I", "swim", "at", "pool"] },
  { english: "The garden is green", hebrew: "הגינה ירוקה", words: ["The", "garden", "is", "green"] },
  { english: "I play at park", hebrew: "אני משחק בפארק", words: ["I", "play", "at", "park"] },

  // === Actions ===
  { english: "I sing a song", hebrew: "אני שר שיר", words: ["I", "sing", "a", "song"] },
  { english: "I dance with friends", hebrew: "אני רוקד עם חברים", words: ["I", "dance", "with", "friends"] },
  { english: "I paint a picture", hebrew: "אני מצייר תמונה", words: ["I", "paint", "a", "picture"] },
  { english: "I climb the tree", hebrew: "אני מטפס על העץ", words: ["I", "climb", "the", "tree"] },
  { english: "I cook with Mom", hebrew: "אני מבשל עם אמא", words: ["I", "cook", "with", "Mom"] },
  { english: "I wash my hands", hebrew: "אני שוטף ידיים", words: ["I", "wash", "my", "hands"] },
  { english: "I build a tower", hebrew: "אני בונה מגדל", words: ["I", "build", "a", "tower"] },
  { english: "I share my toys", hebrew: "אני משתף את הצעצועים", words: ["I", "share", "my", "toys"] },
  { english: "I help my friend", hebrew: "אני עוזר לחבר שלי", words: ["I", "help", "my", "friend"] },
  { english: "I push the swing", hebrew: "אני דוחף את הנדנדה", words: ["I", "push", "the", "swing"] },
  { english: "I pull the rope", hebrew: "אני מושך את החבל", words: ["I", "pull", "the", "rope"] },
  { english: "I laugh out loud", hebrew: "אני צוחק בקול", words: ["I", "laugh", "out", "loud"] },
  { english: "I hug my mom", hebrew: "אני מחבק את אמא", words: ["I", "hug", "my", "mom"] },
  { english: "I wave goodbye", hebrew: "אני מנופף לשלום", words: ["I", "wave", "goodbye"] },

  // === Numbers & Math ===
  { english: "I count the stars", hebrew: "אני סופר כוכבים", words: ["I", "count", "the", "stars"] },
  { english: "Two plus two", hebrew: "שתיים ועוד שתיים", words: ["Two", "plus", "two"] },
  { english: "I have five fingers", hebrew: "יש לי חמש אצבעות", words: ["I", "have", "five", "fingers"] },
  { english: "There are three cats", hebrew: "יש שלוש חתולים", words: ["There", "are", "three", "cats"] },

  // === Emotions & Adjectives ===
  { english: "I feel happy today", hebrew: "אני מרגיש שמח היום", words: ["I", "feel", "happy", "today"] },
  { english: "She is very brave", hebrew: "היא מאוד אמיצה", words: ["She", "is", "very", "brave"] },
  { english: "He is so strong", hebrew: "הוא כל כך חזק", words: ["He", "is", "so", "strong"] },
  { english: "The baby is cute", hebrew: "התינוק חמוד", words: ["The", "baby", "is", "cute"] },
  { english: "I am very tired", hebrew: "אני מאוד עייף", words: ["I", "am", "very", "tired"] },
  { english: "This is so funny", hebrew: "זה כל כך מצחיק", words: ["This", "is", "so", "funny"] },
  { english: "I am not scared", hebrew: "אני לא פוחד", words: ["I", "am", "not", "scared"] },
  { english: "I feel very proud", hebrew: "אני מרגיש גאה מאוד", words: ["I", "feel", "very", "proud"] },
  { english: "The room is quiet", hebrew: "החדר שקט", words: ["The", "room", "is", "quiet"] },
  { english: "I am so excited", hebrew: "אני כל כך נרגש", words: ["I", "am", "so", "excited"] },

  // === Time ===
  { english: "Today is Monday", hebrew: "היום יום שני", words: ["Today", "is", "Monday"] },
  { english: "It is morning now", hebrew: "עכשיו בוקר", words: ["It", "is", "morning", "now"] },
  { english: "Tomorrow is sunny", hebrew: "מחר יהיה שמשי", words: ["Tomorrow", "is", "sunny"] },
  { english: "Yesterday was fun", hebrew: "אתמול היה כיף", words: ["Yesterday", "was", "fun"] },
  { english: "It is lunch time", hebrew: "זה זמן צהריים", words: ["It", "is", "lunch", "time"] },

  // === Music ===
  { english: "I play the piano", hebrew: "אני מנגן פסנתר", words: ["I", "play", "the", "piano"] },
  { english: "I bang the drum", hebrew: "אני מתופף", words: ["I", "bang", "the", "drum"] },
  { english: "The music is loud", hebrew: "המוזיקה חזקה", words: ["The", "music", "is", "loud"] },
  { english: "I love to sing", hebrew: "אני אוהב לשיר", words: ["I", "love", "to", "sing"] },

  // === Insects & Bugs ===
  { english: "The bee makes honey", hebrew: "הדבורה מייצרת דבש", words: ["The", "bee", "makes", "honey"] },
  { english: "The butterfly is pretty", hebrew: "הפרפר יפה", words: ["The", "butterfly", "is", "pretty"] },
  { english: "The ant is small", hebrew: "הנמלה קטנה", words: ["The", "ant", "is", "small"] },
  { english: "The spider spins webs", hebrew: "העכביש טווה רשתות", words: ["The", "spider", "spins", "webs"] },

  // === Sea Animals ===
  { english: "The whale is huge", hebrew: "הלווייתן ענק", words: ["The", "whale", "is", "huge"] },
  { english: "The dolphin jumps", hebrew: "הדולפין קופץ", words: ["The", "dolphin", "jumps"] },
  { english: "The shark swims fast", hebrew: "הכריש שוחה מהר", words: ["The", "shark", "swims", "fast"] },
  { english: "The crab walks sideways", hebrew: "הסרטן הולך הצידה", words: ["The", "crab", "walks", "sideways"] },

  // === Shapes ===
  { english: "The ball is round", hebrew: "הכדור עגול", words: ["The", "ball", "is", "round"] },
  { english: "The box is square", hebrew: "הקופסה מרובעת", words: ["The", "box", "is", "square"] },
  { english: "I draw a circle", hebrew: "אני מצייר עיגול", words: ["I", "draw", "a", "circle"] },
  { english: "Stars have five points", hebrew: "לכוכבים חמש קודקודים", words: ["Stars", "have", "five", "points"] },

  // === Garden ===
  { english: "I water the plants", hebrew: "אני משקה צמחים", words: ["I", "water", "the", "plants"] },
  { english: "The roses smell nice", hebrew: "הורדים מריחים יפה", words: ["The", "roses", "smell", "nice"] },
  { english: "I dig the soil", hebrew: "אני חופר באדמה", words: ["I", "dig", "the", "soil"] },
  { english: "The grass is soft", hebrew: "הדשא רך", words: ["The", "grass", "is", "soft"] },

  // === Technology ===
  { english: "I use a computer", hebrew: "אני משתמש במחשב", words: ["I", "use", "a", "computer"] },
  { english: "The screen is bright", hebrew: "המסך בהיר", words: ["The", "screen", "is", "bright"] },
  { english: "I take a photo", hebrew: "אני מצלם תמונה", words: ["I", "take", "a", "photo"] },

  // === Countries & World ===
  { english: "The world is big", hebrew: "העולם גדול", words: ["The", "world", "is", "big"] },
  { english: "I love Israel", hebrew: "אני אוהב את ישראל", words: ["I", "love", "Israel"] },
  { english: "The map shows countries", hebrew: "המפה מראה מדינות", words: ["The", "map", "shows", "countries"] },

  // === Mixed / Fun ===
  { english: "I blow a bubble", hebrew: "אני מנפח בועה", words: ["I", "blow", "a", "bubble"] },
  { english: "The kite flies high", hebrew: "העפיפון עף גבוה", words: ["The", "kite", "flies", "high"] },
  { english: "I slide down fast", hebrew: "אני מחליק מהר", words: ["I", "slide", "down", "fast"] },
  { english: "I hide behind tree", hebrew: "אני מתחבא מאחורי עץ", words: ["I", "hide", "behind", "tree"] },
  { english: "We play tag", hebrew: "אנחנו משחקים תופסת", words: ["We", "play", "tag"] },
  { english: "I build with blocks", hebrew: "אני בונה עם קוביות", words: ["I", "build", "with", "blocks"] },
  { english: "I fly a kite", hebrew: "אני מעיף עפיפון", words: ["I", "fly", "a", "kite"] },
  { english: "The puzzle is hard", hebrew: "הפאזל קשה", words: ["The", "puzzle", "is", "hard"] },
  { english: "I love my pet", hebrew: "אני אוהב את חיית המחמד", words: ["I", "love", "my", "pet"] },
  { english: "My toy is new", hebrew: "הצעצוע שלי חדש", words: ["My", "toy", "is", "new"] },
  { english: "I make a wish", hebrew: "אני מבקש משאלה", words: ["I", "make", "a", "wish"] },
  { english: "I found a shell", hebrew: "מצאתי צדף", words: ["I", "found", "a", "shell"] },
  { english: "The balloon is big", hebrew: "הבלון גדול", words: ["The", "balloon", "is", "big"] },
  { english: "I play in sand", hebrew: "אני משחק בחול", words: ["I", "play", "in", "sand"] },
  { english: "I skip with joy", hebrew: "אני מדלג בשמחה", words: ["I", "skip", "with", "joy"] },
];

// ===== STORAGE KEYS =====
const VOCABULARY_STORAGE_KEY = 'unified_vocabulary';
const SENTENCES_STORAGE_KEY = 'unified_sentences';

// ===== VOCABULARY MANAGER =====
class VocabularyManager {
  private vocabulary: UnifiedWord[] = [];
  private sentences: SentenceData[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const storedVocab = localStorage.getItem(VOCABULARY_STORAGE_KEY);
      const storedSentences = localStorage.getItem(SENTENCES_STORAGE_KEY);
      
      if (storedVocab) {
        const existingVocab: UnifiedWord[] = JSON.parse(storedVocab);
        
        // Check if we have new default words to add
        const existingEnglishWords = new Set(existingVocab.map(w => w.english.toLowerCase()));
        const newWords = defaultVocabulary.filter(w => !existingEnglishWords.has(w.english.toLowerCase()));
        
        if (newWords.length > 0) {
          // Add new default words to existing vocabulary
          const newWordsWithIds = newWords.map(word => ({
            ...word,
            enabledForSorting: word.enabledForMatching,
            enabledForListening: word.enabledForMatching,
            id: generateId(),
          }));
          // Migrate existing words that lack enabledForSorting
          const migratedExisting = existingVocab.map(w => ({
            ...w,
            enabledForSorting: w.enabledForSorting ?? w.enabledForMatching ?? true,
            enabledForListening: w.enabledForListening ?? w.enabledForMatching ?? true,
          }));
          this.vocabulary = [...migratedExisting, ...newWordsWithIds];
          this.saveVocabulary();
          console.log(`Added ${newWords.length} new words to vocabulary`);
        } else {
          // Migrate existing words that lack enabledForSorting
          this.vocabulary = existingVocab.map(w => ({
            ...w,
            enabledForSorting: w.enabledForSorting ?? w.enabledForMatching ?? true,
            enabledForListening: w.enabledForListening ?? w.enabledForMatching ?? true,
          }));
        }
      } else {
        // Initialize with default vocabulary
        this.vocabulary = defaultVocabulary.map(word => ({
          ...word,
          enabledForSorting: word.enabledForMatching,
            enabledForListening: word.enabledForMatching,
          id: generateId(),
        }));
        this.saveVocabulary();
      }

      if (storedSentences) {
        const existingSentences: SentenceData[] = JSON.parse(storedSentences);
        // Auto-merge new default sentences
        const existingEnglish = new Set(existingSentences.map(s => s.english.toLowerCase()));
        const newSentences = defaultSentences.filter(s => !existingEnglish.has(s.english.toLowerCase()));
        if (newSentences.length > 0) {
          const newWithIds = newSentences.map(s => ({ ...s, id: generateId() }));
          this.sentences = [...existingSentences, ...newWithIds];
          this.saveSentences();
          console.log(`Added ${newSentences.length} new sentences`);
        } else {
          this.sentences = existingSentences;
        }
      } else {
        // Initialize with default sentences
        this.sentences = defaultSentences.map(sentence => ({
          ...sentence,
          id: generateId(),
        }));
        this.saveSentences();
      }
    } catch (error) {
      console.error('Error loading vocabulary from storage:', error);
      this.vocabulary = defaultVocabulary.map(word => ({
        ...word,
        enabledForSorting: word.enabledForMatching,
            enabledForListening: word.enabledForMatching,
        id: generateId(),
      }));
      this.sentences = defaultSentences.map(sentence => ({
        ...sentence,
        id: generateId(),
      }));
    }
  }

  private saveVocabulary(): void {
    try {
      localStorage.setItem(VOCABULARY_STORAGE_KEY, JSON.stringify(this.vocabulary));
    } catch (error) {
      console.error('Error saving vocabulary to storage:', error);
    }
  }

  private saveSentences(): void {
    try {
      localStorage.setItem(SENTENCES_STORAGE_KEY, JSON.stringify(this.sentences));
    } catch (error) {
      console.error('Error saving sentences to storage:', error);
    }
  }

  // Get all vocabulary
  getAllWords(): UnifiedWord[] {
    return [...this.vocabulary];
  }

  // Get all sentences
  getAllSentences(): SentenceData[] {
    return [...this.sentences];
  }

  // Get all unique categories
  getCategories(): string[] {
    const categories = new Set(this.vocabulary.map(w => w.category));
    return Array.from(categories).sort();
  }

  // Add a new word
  addWord(word: Omit<UnifiedWord, 'id'>): UnifiedWord {
    const newWord: UnifiedWord = {
      ...word,
      id: generateId(),
    };
    this.vocabulary.push(newWord);
    this.saveVocabulary();
    return newWord;
  }

  // Update a word
  updateWord(id: string, updates: Partial<Omit<UnifiedWord, 'id'>>): boolean {
    const index = this.vocabulary.findIndex(w => w.id === id);
    if (index === -1) return false;
    
    this.vocabulary[index] = { ...this.vocabulary[index], ...updates };
    this.saveVocabulary();
    return true;
  }

  // Delete a word
  deleteWord(id: string): boolean {
    const index = this.vocabulary.findIndex(w => w.id === id);
    if (index === -1) return false;
    
    this.vocabulary.splice(index, 1);
    this.saveVocabulary();
    return true;
  }

  // Add a sentence
  addSentence(sentence: Omit<SentenceData, 'id'>): SentenceData {
    const newSentence: SentenceData = {
      ...sentence,
      id: generateId(),
    };
    this.sentences.push(newSentence);
    this.saveSentences();
    return newSentence;
  }

  // Update a sentence
  updateSentence(id: string, updates: Partial<Omit<SentenceData, 'id'>>): boolean {
    const index = this.sentences.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.sentences[index] = { ...this.sentences[index], ...updates };
    this.saveSentences();
    return true;
  }

  // Delete a sentence
  deleteSentence(id: string): boolean {
    const index = this.sentences.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.sentences.splice(index, 1);
    this.saveSentences();
    return true;
  }

  // Reset to defaults
  resetToDefaults(): void {
    this.vocabulary = defaultVocabulary.map(word => ({
      ...word,
      enabledForSorting: word.enabledForMatching,
            enabledForListening: word.enabledForMatching,
      id: generateId(),
    }));
    this.sentences = defaultSentences.map(sentence => ({
      ...sentence,
      id: generateId(),
    }));
    this.saveVocabulary();
    this.saveSentences();
  }

  // === HELPER FUNCTIONS FOR SCREENS ===

  // For ABC screen - get words containing a letter
  getWordsForLetter(letter: string, count: number = 10): UnifiedWord[] {
    const filtered = this.vocabulary.filter(w => 
      w.enabledForABC && 
      w.english.toLowerCase().includes(letter.toLowerCase())
    );
    return shuffleArray(filtered).slice(0, count);
  }

  // For Words screen - get words by category
  getWordsForWordsScreen(category?: string, count: number = 10): UnifiedWord[] {
    let filtered = this.vocabulary.filter(w => w.enabledForWords);
    if (category && category !== 'All') {
      filtered = filtered.filter(w => w.category === category);
    }
    return shuffleArray(filtered).slice(0, count);
  }

  // For Matching screen - get random pairs
  getWordsForMatching(count: number = 6): UnifiedWord[] {
    const filtered = this.vocabulary.filter(w => w.enabledForMatching);
    return shuffleArray(filtered).slice(0, count);
  }

  // For Sorting screen - get words enabled for sorting
  getWordsForSorting(): UnifiedWord[] {
    return this.vocabulary.filter(w => w.enabledForSorting);
  }

  // For Spelling screen - get words by difficulty
  getWordsForSpelling(difficulty: number, count: number = 10): UnifiedWord[] {
    // Define word length ranges for each difficulty
    const lengthConfig: Record<number, { min: number; max: number }> = {
      1: { min: 2, max: 4 },  // Easy: 2-4 letters
      2: { min: 4, max: 5 },  // Medium: 4-5 letters
      3: { min: 4, max: 5 },  // Hard: 4-5 letters (2 missing)
      4: { min: 5, max: 6 },  // Expert: 5-6 letters
      5: { min: 7, max: 20 }, // Master: 7+ letters
    };
    
    const config = lengthConfig[difficulty] || lengthConfig[1];
    
    const filtered = this.vocabulary.filter(w => {
      if (!w.enabledForSpelling) return false;
      const len = w.english.replace(/\s/g, '').length;
      return len >= config.min && len <= config.max;
    });
    
    return shuffleArray(filtered).slice(0, count);
  }

  // For Listen & Pick - words enabled for listening that have a picture
  getWordsForListening(): UnifiedWord[] {
    return this.vocabulary.filter(w => w.enabledForListening && !!w.emoji);
  }

  // Wrong-answer options for a target word (never the target, unique emoji)
  getDistractors(target: UnifiedWord, count: number, sameCategory: boolean | null, pool?: UnifiedWord[]): UnifiedWord[] {
    return pickDistractors(target, pool ?? this.getWordsForListening(), count, sameCategory);
  }

  // Sentences of an exact word length, enabled for the Sentence Builder
  getSentencesByLength(n: number, count: number = 5): SentenceData[] {
    return shuffleArray(
      this.sentences.filter(s => s.enabledForBuilder !== false && s.words.length === n)
    ).slice(0, count);
  }

  // Find a vocabulary word ignoring case and punctuation
  findWord(english: string): UnifiedWord | undefined {
    const key = normalizeToken(english);
    if (!key) return undefined;
    return this.vocabulary.find(w => w.english.toLowerCase() === key);
  }

  // For Sentences screen - get random sentences
  getRandomSentences(count: number = 3): SentenceData[] {
    return shuffleArray(this.sentences).slice(0, count);
  }
}

// ===== SINGLETON INSTANCE =====
export const vocabularyManager = new VocabularyManager();

// ===== LETTER DATA FOR ABC SCREEN =====
export interface LetterData {
  letter: string;
  lowercase: string;
}

export const letters: LetterData[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => ({
  letter,
  lowercase: letter.toLowerCase(),
}));

// Letter sounds for phonics
export const letterSounds: Record<string, { sound: string; example: string; type: "short" | "long" | "consonant" }[]> = {
  A: [
    { sound: "/æ/", example: "apple", type: "short" },
    { sound: "/eɪ/", example: "cake", type: "long" },
  ],
  E: [
    { sound: "/ɛ/", example: "egg", type: "short" },
    { sound: "/iː/", example: "tree", type: "long" },
  ],
  I: [
    { sound: "/ɪ/", example: "fish", type: "short" },
    { sound: "/aɪ/", example: "bike", type: "long" },
  ],
  O: [
    { sound: "/ɒ/", example: "dog", type: "short" },
    { sound: "/oʊ/", example: "bone", type: "long" },
  ],
  U: [
    { sound: "/ʌ/", example: "cup", type: "short" },
    { sound: "/juː/", example: "cute", type: "long" },
  ],
};

// ===== ENCOURAGEMENTS =====
export const encouragements = [
  "Great job! 🌟",
  "Awesome! ⭐",
  "You did it! 🎉",
  "Super! 🚀",
  "Amazing! 💫",
  "Wonderful! 🎊",
  "Perfect! ✨",
  "Excellent! 🏆",
  "Fantastic! 🌈",
  "You rock! 🎸",
  "Way to go! 👏",
  "Brilliant! 💡",
];

export const getRandomEncouragement = (): string => {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};
