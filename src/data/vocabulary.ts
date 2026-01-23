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

// ===== DEFAULT VOCABULARY DATA =====
// This is the initial word bank - can be extended via admin panel

const defaultVocabulary: Omit<UnifiedWord, 'id'>[] = [
  // ===== MARIO CHARACTERS =====
  { english: "Mario", hebrew: "מריו", category: "Mario", emoji: "🍄", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Luigi", hebrew: "לואיג'י", category: "Mario", emoji: "💚", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Peach", hebrew: "פיץ'", category: "Mario", emoji: "👸", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Bowser", hebrew: "באוזר", category: "Mario", emoji: "🐢", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Yoshi", hebrew: "יושי", category: "Mario", emoji: "🦎", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Toad", hebrew: "טואד", category: "Mario", emoji: "🍄", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Goomba", hebrew: "גומבה", category: "Mario", emoji: "🟤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Koopa", hebrew: "קופה", category: "Mario", emoji: "🐢", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rosalina", hebrew: "רוזלינה", category: "Mario", emoji: "⭐", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Daisy", hebrew: "דייזי", category: "Mario", emoji: "🌼", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== SONIC CHARACTERS =====
  { english: "Sonic", hebrew: "סוניק", category: "Sonic", emoji: "🦔", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tails", hebrew: "טיילס", category: "Sonic", emoji: "🦊", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Knuckles", hebrew: "נאקלס", category: "Sonic", emoji: "👊", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Shadow", hebrew: "שאדו", category: "Sonic", emoji: "🖤", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Eggman", hebrew: "אגמן", category: "Sonic", emoji: "🥚", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Amy", hebrew: "איימי", category: "Sonic", emoji: "🩷", difficulty: 2, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rouge", hebrew: "רוז'", category: "Sonic", emoji: "🦇", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Silver", hebrew: "סילבר", category: "Sonic", emoji: "🤍", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

  // ===== PAW PATROL =====
  { english: "Chase", hebrew: "צ'ייס", category: "Paw Patrol", emoji: "🐕", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Marshall", hebrew: "מרשל", category: "Paw Patrol", emoji: "🚒", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Skye", hebrew: "סקיי", category: "Paw Patrol", emoji: "🚁", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rubble", hebrew: "ראבל", category: "Paw Patrol", emoji: "🚜", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Rocky", hebrew: "רוקי", category: "Paw Patrol", emoji: "♻️", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Zuma", hebrew: "זומה", category: "Paw Patrol", emoji: "🌊", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Everest", hebrew: "אוורסט", category: "Paw Patrol", emoji: "❄️", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Tracker", hebrew: "טראקר", category: "Paw Patrol", emoji: "🌴", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Ryder", hebrew: "ריידר", category: "Paw Patrol", emoji: "👦", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

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
  { english: "Jedi", hebrew: "ג'דיי", category: "Star Wars", emoji: "⚔️", difficulty: 3, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Yoda", hebrew: "יודה", category: "Star Wars", emoji: "🧙", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Luke", hebrew: "לוק", category: "Star Wars", emoji: "👨", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Vader", hebrew: "ויידר", category: "Star Wars", emoji: "🖤", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Leia", hebrew: "ליאה", category: "Star Wars", emoji: "👸", difficulty: 3, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Force", hebrew: "הכוח", category: "Star Wars", emoji: "✨", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Lightsaber", hebrew: "חרב אור", category: "Star Wars", emoji: "⚔️", difficulty: 5, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Droid", hebrew: "דרואיד", category: "Star Wars", emoji: "🤖", difficulty: 4, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Grogu", hebrew: "גרוגו", category: "Star Wars", emoji: "👶", difficulty: 4, vowelType: "long", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },
  { english: "Mandalorian", hebrew: "מנדלוריאן", category: "Star Wars", emoji: "🪖", difficulty: 5, vowelType: "short", enabledForABC: true, enabledForWords: true, enabledForMatching: true, enabledForSpelling: true },

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
        this.vocabulary = JSON.parse(storedVocab);
      } else {
        // Initialize with default vocabulary
        this.vocabulary = defaultVocabulary.map(word => ({
          ...word,
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
