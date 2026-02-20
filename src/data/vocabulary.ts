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
  enabledForSpelling: boolean;
}

export interface SentenceData {
  id: string;
  english: string;
  hebrew: string;
  words: string[];
}

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
const defaultVocabulary: Omit<UnifiedWord, 'id' | 'enabledForSorting'>[] = [
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
  { english: "Is", hebrew: "הוא", category: "Basic", emoji: "=", difficulty: 1, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: false, enabledForSpelling: true },
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
  { english: "Rectangle", hebrew: "מלבן", category: "Shapes", emoji: "▬", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Diamond", hebrew: "יהלום", category: "Shapes", emoji: "💎", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Oval", hebrew: "אליפסה", category: "Shapes", emoji: "🥚", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cube", hebrew: "קוביה", category: "Shapes", emoji: "🧊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Sphere", hebrew: "כדור", category: "Shapes", emoji: "🔮", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cone", hebrew: "חרוט", category: "Shapes", emoji: "📐", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Cylinder", hebrew: "גליל", category: "Shapes", emoji: "🧪", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Pentagon", hebrew: "מחומש", category: "Shapes", emoji: "⬠", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Hexagon", hebrew: "משושה", category: "Shapes", emoji: "⬡", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

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
  // Mario sentences
  { english: "Mario jumps high", hebrew: "מריו קופץ גבוה", words: ["Mario", "jumps", "high"] },
  { english: "Luigi is tall", hebrew: "לואיג'י גבוה", words: ["Luigi", "is", "tall"] },
  { english: "Peach is a princess", hebrew: "פיץ' היא נסיכה", words: ["Peach", "is", "a", "princess"] },
  { english: "Yoshi is green", hebrew: "יושי ירוק", words: ["Yoshi", "is", "green"] },
  { english: "Mario saves Peach", hebrew: "מריו מציל את פיץ'", words: ["Mario", "saves", "Peach"] },
  { english: "Bowser is big", hebrew: "באוזר גדול", words: ["Bowser", "is", "big"] },
  { english: "I love Mario", hebrew: "אני אוהב את מריו", words: ["I", "love", "Mario"] },
  
  // Sonic sentences
  { english: "Sonic runs fast", hebrew: "סוניק רץ מהר", words: ["Sonic", "runs", "fast"] },
  { english: "Sonic is blue", hebrew: "סוניק כחול", words: ["Sonic", "is", "blue"] },
  { english: "Sonic gets rings", hebrew: "סוניק אוסף טבעות", words: ["Sonic", "gets", "rings"] },
  { english: "Eggman is bad", hebrew: "אגמן רע", words: ["Eggman", "is", "bad"] },
  { english: "Tails is smart", hebrew: "טיילס חכם", words: ["Tails", "is", "smart"] },
  { english: "I like Sonic", hebrew: "אני אוהב סוניק", words: ["I", "like", "Sonic"] },
  
  // Paw Patrol sentences
  { english: "Chase helps pups", hebrew: "צ'ייס עוזר לגורים", words: ["Chase", "helps", "pups"] },
  { english: "Marshall is a dog", hebrew: "מרשל הוא כלב", words: ["Marshall", "is", "a", "dog"] },
  { english: "Skye can fly", hebrew: "סקיי יכולה לעוף", words: ["Skye", "can", "fly"] },
  { english: "Paw Patrol helps", hebrew: "מפרץ ההרפתקאות עוזר", words: ["Paw", "Patrol", "helps"] },
  { english: "Rubble digs fast", hebrew: "ראבל חופר מהר", words: ["Rubble", "digs", "fast"] },
  { english: "Rocky recycles", hebrew: "רוקי ממחזר", words: ["Rocky", "recycles"] },
  { english: "Zuma loves water", hebrew: "זומה אוהב מים", words: ["Zuma", "loves", "water"] },
  
  // Soccer sentences
  { english: "I like soccer", hebrew: "אני אוהב כדורגל", words: ["I", "like", "soccer"] },
  { english: "Kick the ball", hebrew: "בעט בכדור", words: ["Kick", "the", "ball"] },
  { english: "We win the game", hebrew: "אנחנו מנצחים במשחק", words: ["We", "win", "the", "game"] },
  { english: "I play soccer", hebrew: "אני משחק כדורגל", words: ["I", "play", "soccer"] },
  { english: "Goal! We win!", hebrew: "גול! ניצחנו!", words: ["Goal!", "We", "win!"] },
  { english: "Pass the ball", hebrew: "העבר את הכדור", words: ["Pass", "the", "ball"] },
  { english: "The team plays well", hebrew: "הקבוצה משחקת טוב", words: ["The", "team", "plays", "well"] },
  
  // Family sentences
  { english: "I love Mom", hebrew: "אני אוהב את אמא", words: ["I", "love", "Mom"] },
  { english: "Dad helps me", hebrew: "אבא עוזר לי", words: ["Dad", "helps", "me"] },
  { english: "My sister is nice", hebrew: "האחות שלי נחמדה", words: ["My", "sister", "is", "nice"] },
  { english: "My brother plays", hebrew: "האח שלי משחק", words: ["My", "brother", "plays"] },
  { english: "Grandma bakes cake", hebrew: "סבתא אופה עוגה", words: ["Grandma", "bakes", "cake"] },
  { english: "I love my family", hebrew: "אני אוהב את המשפחה שלי", words: ["I", "love", "my", "family"] },
  
  // Daily life sentences
  { english: "I am happy", hebrew: "אני שמח", words: ["I", "am", "happy"] },
  { english: "This is fun", hebrew: "זה כיף", words: ["This", "is", "fun"] },
  { english: "I love to play", hebrew: "אני אוהב לשחק", words: ["I", "love", "to", "play"] },
  { english: "You are awesome", hebrew: "אתה מדהים", words: ["You", "are", "awesome"] },
  { english: "I like to read", hebrew: "אני אוהב לקרוא", words: ["I", "like", "to", "read"] },
  { english: "The sun is hot", hebrew: "השמש חמה", words: ["The", "sun", "is", "hot"] },
  { english: "Good morning", hebrew: "בוקר טוב", words: ["Good", "morning"] },
  { english: "Good night", hebrew: "לילה טוב", words: ["Good", "night"] },
  { english: "I go to school", hebrew: "אני הולך לבית ספר", words: ["I", "go", "to", "school"] },
  { english: "The dog runs", hebrew: "הכלב רץ", words: ["The", "dog", "runs"] },
  { english: "The cat sleeps", hebrew: "החתול ישן", words: ["The", "cat", "sleeps"] },
  { english: "Birds can fly", hebrew: "ציפורים יכולות לעוף", words: ["Birds", "can", "fly"] },
  { english: "I drink water", hebrew: "אני שותה מים", words: ["I", "drink", "water"] },
  { english: "The sky is blue", hebrew: "השמיים כחולים", words: ["The", "sky", "is", "blue"] },
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
            id: generateId(),
          }));
          // Migrate existing words that lack enabledForSorting
          const migratedExisting = existingVocab.map(w => ({
            ...w,
            enabledForSorting: w.enabledForSorting ?? w.enabledForMatching ?? true,
          }));
          this.vocabulary = [...migratedExisting, ...newWordsWithIds];
          this.saveVocabulary();
          console.log(`Added ${newWords.length} new words to vocabulary`);
        } else {
          // Migrate existing words that lack enabledForSorting
          this.vocabulary = existingVocab.map(w => ({
            ...w,
            enabledForSorting: w.enabledForSorting ?? w.enabledForMatching ?? true,
          }));
        }
      } else {
        // Initialize with default vocabulary
        this.vocabulary = defaultVocabulary.map(word => ({
          ...word,
          enabledForSorting: word.enabledForMatching,
          id: generateId(),
        }));
        this.saveVocabulary();
      }

      if (storedSentences) {
        this.sentences = JSON.parse(storedSentences);
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
