export interface LetterData {
  letter: string;
  lowercase: string;
  words: { english: string; hebrew: string }[];
}

export interface WordData {
  english: string;
  hebrew: string;
  category: string;
  emoji?: string;
  vowelType?: "short" | "long" | "none";
}

export interface SentenceData {
  english: string;
  hebrew: string;
  words: string[];
}

// Helper to check if word contains letter (case insensitive)
export const wordContainsLetter = (word: string, letter: string): boolean => {
  return word.toLowerCase().includes(letter.toLowerCase());
};

// Master word bank - 500+ words with categories, emojis, and vowel info
export const masterWordBank: WordData[] = [
  // ===== MARIO CHARACTERS =====
  { english: "Mario", hebrew: "מריו", category: "Mario", emoji: "🍄", vowelType: "long" },
  { english: "Luigi", hebrew: "לואיג'י", category: "Mario", emoji: "💚", vowelType: "long" },
  { english: "Peach", hebrew: "פיץ'", category: "Mario", emoji: "👸", vowelType: "long" },
  { english: "Bowser", hebrew: "באוזר", category: "Mario", emoji: "🐢", vowelType: "short" },
  { english: "Yoshi", hebrew: "יושי", category: "Mario", emoji: "🦎", vowelType: "short" },
  { english: "Toad", hebrew: "טואד", category: "Mario", emoji: "🍄", vowelType: "long" },
  { english: "Goomba", hebrew: "גומבה", category: "Mario", emoji: "🟤", vowelType: "short" },
  { english: "Koopa", hebrew: "קופה", category: "Mario", emoji: "🐢", vowelType: "long" },
  { english: "Rosalina", hebrew: "רוזלינה", category: "Mario", emoji: "⭐", vowelType: "long" },
  { english: "Daisy", hebrew: "דייזי", category: "Mario", emoji: "🌼", vowelType: "long" },
  { english: "Donkey Kong", hebrew: "דונקי קונג", category: "Mario", emoji: "🦍", vowelType: "short" },
  { english: "Shy Guy", hebrew: "שאי גאי", category: "Mario", emoji: "😶", vowelType: "long" },
  
  // ===== SONIC CHARACTERS =====
  { english: "Sonic", hebrew: "סוניק", category: "Sonic", emoji: "🦔", vowelType: "short" },
  { english: "Tails", hebrew: "טיילס", category: "Sonic", emoji: "🦊", vowelType: "long" },
  { english: "Knuckles", hebrew: "נאקלס", category: "Sonic", emoji: "👊", vowelType: "short" },
  { english: "Shadow", hebrew: "שאדו", category: "Sonic", emoji: "🖤", vowelType: "short" },
  { english: "Eggman", hebrew: "אגמן", category: "Sonic", emoji: "🥚", vowelType: "short" },
  { english: "Amy", hebrew: "איימי", category: "Sonic", emoji: "🩷", vowelType: "long" },
  { english: "Rouge", hebrew: "רוז'", category: "Sonic", emoji: "🦇", vowelType: "long" },
  { english: "Silver", hebrew: "סילבר", category: "Sonic", emoji: "🤍", vowelType: "short" },
  
  // ===== PAW PATROL =====
  { english: "Chase", hebrew: "צ'ייס", category: "Paw Patrol", emoji: "🐕", vowelType: "long" },
  { english: "Marshall", hebrew: "מרשל", category: "Paw Patrol", emoji: "🚒", vowelType: "short" },
  { english: "Skye", hebrew: "סקיי", category: "Paw Patrol", emoji: "🚁", vowelType: "long" },
  { english: "Rubble", hebrew: "ראבל", category: "Paw Patrol", emoji: "🚜", vowelType: "short" },
  { english: "Rocky", hebrew: "רוקי", category: "Paw Patrol", emoji: "♻️", vowelType: "short" },
  { english: "Zuma", hebrew: "זומה", category: "Paw Patrol", emoji: "🌊", vowelType: "long" },
  { english: "Everest", hebrew: "אוורסט", category: "Paw Patrol", emoji: "❄️", vowelType: "short" },
  { english: "Tracker", hebrew: "טראקר", category: "Paw Patrol", emoji: "🌴", vowelType: "short" },
  { english: "Ryder", hebrew: "ריידר", category: "Paw Patrol", emoji: "👦", vowelType: "long" },
  
  // ===== SOCCER/FOOTBALL TERMS =====
  { english: "Ball", hebrew: "כדור", category: "Soccer", emoji: "⚽", vowelType: "short" },
  { english: "Goal", hebrew: "שער", category: "Soccer", emoji: "🥅", vowelType: "long" },
  { english: "Kick", hebrew: "בעיטה", category: "Soccer", emoji: "🦵", vowelType: "short" },
  { english: "Team", hebrew: "קבוצה", category: "Soccer", emoji: "👥", vowelType: "long" },
  { english: "Win", hebrew: "לנצח", category: "Soccer", emoji: "🏆", vowelType: "short" },
  { english: "Play", hebrew: "לשחק", category: "Soccer", emoji: "🎮", vowelType: "long" },
  { english: "Score", hebrew: "ניקוד", category: "Soccer", emoji: "🔢", vowelType: "long" },
  { english: "Pass", hebrew: "מסירה", category: "Soccer", emoji: "➡️", vowelType: "short" },
  { english: "Shoot", hebrew: "לבעוט", category: "Soccer", emoji: "💨", vowelType: "long" },
  { english: "Run", hebrew: "לרוץ", category: "Soccer", emoji: "🏃", vowelType: "short" },
  { english: "Fast", hebrew: "מהיר", category: "Soccer", emoji: "💨", vowelType: "short" },
  { english: "Referee", hebrew: "שופט", category: "Soccer", emoji: "👨‍⚖️", vowelType: "long" },
  { english: "Player", hebrew: "שחקן", category: "Soccer", emoji: "⚽", vowelType: "long" },
  { english: "Offside", hebrew: "נבדל", category: "Soccer", emoji: "🚩", vowelType: "long" },
  { english: "Penalty", hebrew: "פנדל", category: "Soccer", emoji: "⚽", vowelType: "short" },
  { english: "Game", hebrew: "משחק", category: "Soccer", emoji: "🎯", vowelType: "long" },
  { english: "Match", hebrew: "משחק", category: "Soccer", emoji: "🏟️", vowelType: "short" },
  { english: "Stadium", hebrew: "אצטדיון", category: "Soccer", emoji: "🏟️", vowelType: "long" },
  { english: "Coach", hebrew: "מאמן", category: "Soccer", emoji: "📋", vowelType: "long" },
  { english: "Trophy", hebrew: "גביע", category: "Soccer", emoji: "🏆", vowelType: "long" },
  { english: "Champion", hebrew: "אלוף", category: "Soccer", emoji: "🥇", vowelType: "short" },
  { english: "Corner", hebrew: "פינה", category: "Soccer", emoji: "📐", vowelType: "short" },
  { english: "Header", hebrew: "נגיחה", category: "Soccer", emoji: "🤕", vowelType: "short" },
  { english: "Dribble", hebrew: "כדרור", category: "Soccer", emoji: "⚽", vowelType: "short" },
  { english: "Tackle", hebrew: "נסיון חטיפה", category: "Soccer", emoji: "🦵", vowelType: "short" },
  { english: "Goalie", hebrew: "שוער", category: "Soccer", emoji: "🧤", vowelType: "long" },
  { english: "Net", hebrew: "רשת", category: "Soccer", emoji: "🥅", vowelType: "short" },
  { english: "Field", hebrew: "מגרש", category: "Soccer", emoji: "🏟️", vowelType: "long" },
  { english: "Jersey", hebrew: "חולצה", category: "Soccer", emoji: "👕", vowelType: "short" },
  { english: "Cleats", hebrew: "סוליות", category: "Soccer", emoji: "👟", vowelType: "long" },
  { english: "World Cup", hebrew: "גביע העולם", category: "Soccer", emoji: "🏆", vowelType: "short" },
  { english: "League", hebrew: "ליגה", category: "Soccer", emoji: "🏅", vowelType: "long" },
  { english: "Draw", hebrew: "תיקו", category: "Soccer", emoji: "🤝", vowelType: "short" },
  { english: "Foul", hebrew: "עבירה", category: "Soccer", emoji: "🟨", vowelType: "short" },
  { english: "Card", hebrew: "כרטיס", category: "Soccer", emoji: "🟥", vowelType: "short" },
  { english: "Whistle", hebrew: "משרוקית", category: "Soccer", emoji: "📣", vowelType: "short" },
  { english: "Halftime", hebrew: "הפסקה", category: "Soccer", emoji: "⏸️", vowelType: "short" },
  
  // ===== STAR WARS =====
  { english: "Jedi", hebrew: "ג'דיי", category: "Star Wars", emoji: "⚔️", vowelType: "short" },
  { english: "Sith", hebrew: "סית'", category: "Star Wars", emoji: "🔴", vowelType: "short" },
  { english: "Force", hebrew: "הכוח", category: "Star Wars", emoji: "✨", vowelType: "long" },
  { english: "Lightsaber", hebrew: "חרב אור", category: "Star Wars", emoji: "⚔️", vowelType: "long" },
  { english: "Yoda", hebrew: "יודה", category: "Star Wars", emoji: "🧙", vowelType: "long" },
  { english: "Luke", hebrew: "לוק", category: "Star Wars", emoji: "👨", vowelType: "long" },
  { english: "Vader", hebrew: "ויידר", category: "Star Wars", emoji: "🖤", vowelType: "long" },
  { english: "Leia", hebrew: "ליאה", category: "Star Wars", emoji: "👸", vowelType: "long" },
  { english: "Han Solo", hebrew: "האן סולו", category: "Star Wars", emoji: "🔫", vowelType: "short" },
  { english: "Chewie", hebrew: "צ'ובקה", category: "Star Wars", emoji: "🦍", vowelType: "long" },
  { english: "Droid", hebrew: "דרואיד", category: "Star Wars", emoji: "🤖", vowelType: "short" },
  { english: "R2D2", hebrew: "אר-טו", category: "Star Wars", emoji: "🤖", vowelType: "short" },
  { english: "C3PO", hebrew: "סי-תרי-פי-או", category: "Star Wars", emoji: "🤖", vowelType: "long" },
  { english: "Stormtrooper", hebrew: "סטורמטרופר", category: "Star Wars", emoji: "👤", vowelType: "short" },
  { english: "Empire", hebrew: "האימפריה", category: "Star Wars", emoji: "🏰", vowelType: "long" },
  { english: "Rebel", hebrew: "מורד", category: "Star Wars", emoji: "💪", vowelType: "short" },
  { english: "Starship", hebrew: "ספינת חלל", category: "Star Wars", emoji: "🚀", vowelType: "short" },
  { english: "X-Wing", hebrew: "אקס-ווינג", category: "Star Wars", emoji: "✈️", vowelType: "short" },
  { english: "TIE Fighter", hebrew: "טאי פייטר", category: "Star Wars", emoji: "🛸", vowelType: "long" },
  { english: "Death Star", hebrew: "כוכב המוות", category: "Star Wars", emoji: "🌑", vowelType: "long" },
  { english: "Millennium Falcon", hebrew: "מילניום פלקון", category: "Star Wars", emoji: "🚀", vowelType: "short" },
  { english: "Obi-Wan", hebrew: "אובי-ואן", category: "Star Wars", emoji: "🧔", vowelType: "long" },
  { english: "Anakin", hebrew: "אנאקין", category: "Star Wars", emoji: "👦", vowelType: "short" },
  { english: "Padme", hebrew: "פדמה", category: "Star Wars", emoji: "👸", vowelType: "long" },
  { english: "Palpatine", hebrew: "פלפטין", category: "Star Wars", emoji: "👴", vowelType: "short" },
  { english: "Mace Windu", hebrew: "מייס ווינדו", category: "Star Wars", emoji: "💜", vowelType: "long" },
  { english: "Kylo Ren", hebrew: "קיילו רן", category: "Star Wars", emoji: "⚫", vowelType: "long" },
  { english: "Rey", hebrew: "ריי", category: "Star Wars", emoji: "👩", vowelType: "long" },
  { english: "Finn", hebrew: "פין", category: "Star Wars", emoji: "👨", vowelType: "short" },
  { english: "Poe", hebrew: "פו", category: "Star Wars", emoji: "✈️", vowelType: "long" },
  { english: "BB8", hebrew: "בי-בי-אייט", category: "Star Wars", emoji: "🤖", vowelType: "long" },
  { english: "Mandalorian", hebrew: "מנדלוריאן", category: "Star Wars", emoji: "🪖", vowelType: "short" },
  { english: "Grogu", hebrew: "גרוגו", category: "Star Wars", emoji: "👶", vowelType: "long" },
  { english: "Boba Fett", hebrew: "בובה פט", category: "Star Wars", emoji: "🪖", vowelType: "short" },
  { english: "Blaster", hebrew: "בלאסטר", category: "Star Wars", emoji: "🔫", vowelType: "short" },
  { english: "Clone", hebrew: "שיבוט", category: "Star Wars", emoji: "👥", vowelType: "long" },
  { english: "Wookie", hebrew: "ווקי", category: "Star Wars", emoji: "🦍", vowelType: "long" },
  { english: "Ewok", hebrew: "אווק", category: "Star Wars", emoji: "🧸", vowelType: "long" },
  { english: "Tatooine", hebrew: "טאטואין", category: "Star Wars", emoji: "🏜️", vowelType: "long" },
  { english: "Hoth", hebrew: "הות'", category: "Star Wars", emoji: "❄️", vowelType: "short" },
  { english: "Endor", hebrew: "אנדור", category: "Star Wars", emoji: "🌲", vowelType: "short" },
  { english: "Galaxy", hebrew: "גלקסיה", category: "Star Wars", emoji: "🌌", vowelType: "short" },
  { english: "Striker", hebrew: "חלוץ", category: "Soccer", emoji: "⚡", vowelType: "long" },
  { english: "Defender", hebrew: "בלם", category: "Soccer", emoji: "🛡️", vowelType: "short" },
  { english: "Captain", hebrew: "קפטן", category: "Soccer", emoji: "©️", vowelType: "short" },
  
  // ===== FAMILY =====
  { english: "Mom", hebrew: "אמא", category: "Family", emoji: "👩", vowelType: "short" },
  { english: "Dad", hebrew: "אבא", category: "Family", emoji: "👨", vowelType: "short" },
  { english: "Mother", hebrew: "אמא", category: "Family", emoji: "👩", vowelType: "short" },
  { english: "Father", hebrew: "אבא", category: "Family", emoji: "👨", vowelType: "short" },
  { english: "Sister", hebrew: "אחות", category: "Family", emoji: "👧", vowelType: "short" },
  { english: "Brother", hebrew: "אח", category: "Family", emoji: "👦", vowelType: "short" },
  { english: "Baby", hebrew: "תינוק", category: "Family", emoji: "👶", vowelType: "long" },
  { english: "Grandma", hebrew: "סבתא", category: "Family", emoji: "👵", vowelType: "short" },
  { english: "Grandpa", hebrew: "סבא", category: "Family", emoji: "👴", vowelType: "short" },
  { english: "Uncle", hebrew: "דוד", category: "Family", emoji: "👨", vowelType: "short" },
  { english: "Aunt", hebrew: "דודה", category: "Family", emoji: "👩", vowelType: "short" },
  { english: "Cousin", hebrew: "בן דוד", category: "Family", emoji: "🧒", vowelType: "short" },
  { english: "Family", hebrew: "משפחה", category: "Family", emoji: "👨‍👩‍👧‍👦", vowelType: "short" },
  { english: "Parent", hebrew: "הורה", category: "Family", emoji: "👫", vowelType: "short" },
  { english: "Child", hebrew: "ילד", category: "Family", emoji: "🧒", vowelType: "long" },
  { english: "Son", hebrew: "בן", category: "Family", emoji: "👦", vowelType: "short" },
  { english: "Daughter", hebrew: "בת", category: "Family", emoji: "👧", vowelType: "short" },
  { english: "Pet", hebrew: "חיית מחמד", category: "Family", emoji: "🐕", vowelType: "short" },
  
  // ===== BODY PARTS =====
  { english: "Head", hebrew: "ראש", category: "Body", emoji: "🗣️", vowelType: "short" },
  { english: "Eye", hebrew: "עין", category: "Body", emoji: "👁️", vowelType: "long" },
  { english: "Eyes", hebrew: "עיניים", category: "Body", emoji: "👀", vowelType: "long" },
  { english: "Nose", hebrew: "אף", category: "Body", emoji: "👃", vowelType: "long" },
  { english: "Mouth", hebrew: "פה", category: "Body", emoji: "👄", vowelType: "short" },
  { english: "Ear", hebrew: "אוזן", category: "Body", emoji: "👂", vowelType: "long" },
  { english: "Hair", hebrew: "שיער", category: "Body", emoji: "💇", vowelType: "long" },
  { english: "Hand", hebrew: "יד", category: "Body", emoji: "✋", vowelType: "short" },
  { english: "Arm", hebrew: "זרוע", category: "Body", emoji: "💪", vowelType: "short" },
  { english: "Leg", hebrew: "רגל", category: "Body", emoji: "🦵", vowelType: "short" },
  { english: "Foot", hebrew: "כף רגל", category: "Body", emoji: "🦶", vowelType: "short" },
  { english: "Finger", hebrew: "אצבע", category: "Body", emoji: "👆", vowelType: "short" },
  { english: "Toe", hebrew: "אצבע רגל", category: "Body", emoji: "🦶", vowelType: "long" },
  { english: "Teeth", hebrew: "שיניים", category: "Body", emoji: "🦷", vowelType: "long" },
  { english: "Tongue", hebrew: "לשון", category: "Body", emoji: "👅", vowelType: "short" },
  { english: "Face", hebrew: "פנים", category: "Body", emoji: "😊", vowelType: "long" },
  { english: "Neck", hebrew: "צוואר", category: "Body", emoji: "🦒", vowelType: "short" },
  { english: "Back", hebrew: "גב", category: "Body", emoji: "🔙", vowelType: "short" },
  { english: "Belly", hebrew: "בטן", category: "Body", emoji: "🤰", vowelType: "short" },
  { english: "Knee", hebrew: "ברך", category: "Body", emoji: "🦵", vowelType: "long" },
  { english: "Elbow", hebrew: "מרפק", category: "Body", emoji: "💪", vowelType: "short" },
  { english: "Heart", hebrew: "לב", category: "Body", emoji: "❤️", vowelType: "short" },
  { english: "Brain", hebrew: "מוח", category: "Body", emoji: "🧠", vowelType: "long" },
  
  // ===== HOME OBJECTS =====
  { english: "House", hebrew: "בית", category: "Home", emoji: "🏠", vowelType: "short" },
  { english: "Door", hebrew: "דלת", category: "Home", emoji: "🚪", vowelType: "long" },
  { english: "Window", hebrew: "חלון", category: "Home", emoji: "🪟", vowelType: "short" },
  { english: "Bed", hebrew: "מיטה", category: "Home", emoji: "🛏️", vowelType: "short" },
  { english: "Chair", hebrew: "כיסא", category: "Home", emoji: "🪑", vowelType: "long" },
  { english: "Table", hebrew: "שולחן", category: "Home", emoji: "🪑", vowelType: "long" },
  { english: "Lamp", hebrew: "מנורה", category: "Home", emoji: "💡", vowelType: "short" },
  { english: "Light", hebrew: "אור", category: "Home", emoji: "💡", vowelType: "long" },
  { english: "TV", hebrew: "טלוויזיה", category: "Home", emoji: "📺", vowelType: "long" },
  { english: "Couch", hebrew: "ספה", category: "Home", emoji: "🛋️", vowelType: "short" },
  { english: "Sofa", hebrew: "ספה", category: "Home", emoji: "🛋️", vowelType: "long" },
  { english: "Floor", hebrew: "רצפה", category: "Home", emoji: "⬛", vowelType: "long" },
  { english: "Wall", hebrew: "קיר", category: "Home", emoji: "🧱", vowelType: "short" },
  { english: "Roof", hebrew: "גג", category: "Home", emoji: "🏠", vowelType: "long" },
  { english: "Room", hebrew: "חדר", category: "Home", emoji: "🚪", vowelType: "long" },
  { english: "Kitchen", hebrew: "מטבח", category: "Home", emoji: "🍳", vowelType: "short" },
  { english: "Bathroom", hebrew: "אמבטיה", category: "Home", emoji: "🛁", vowelType: "short" },
  { english: "Bedroom", hebrew: "חדר שינה", category: "Home", emoji: "🛏️", vowelType: "long" },
  { english: "Garden", hebrew: "גינה", category: "Home", emoji: "🌷", vowelType: "short" },
  { english: "Key", hebrew: "מפתח", category: "Home", emoji: "🔑", vowelType: "long" },
  { english: "Clock", hebrew: "שעון", category: "Home", emoji: "🕐", vowelType: "short" },
  { english: "Mirror", hebrew: "מראה", category: "Home", emoji: "🪞", vowelType: "short" },
  { english: "Pillow", hebrew: "כרית", category: "Home", emoji: "🛏️", vowelType: "short" },
  { english: "Blanket", hebrew: "שמיכה", category: "Home", emoji: "🧣", vowelType: "short" },
  { english: "Towel", hebrew: "מגבת", category: "Home", emoji: "🧴", vowelType: "short" },
  { english: "Soap", hebrew: "סבון", category: "Home", emoji: "🧼", vowelType: "long" },
  { english: "Brush", hebrew: "מברשת", category: "Home", emoji: "🪥", vowelType: "short" },
  { english: "Stairs", hebrew: "מדרגות", category: "Home", emoji: "🪜", vowelType: "long" },
  { english: "Carpet", hebrew: "שטיח", category: "Home", emoji: "🟫", vowelType: "short" },
  { english: "Curtain", hebrew: "וילון", category: "Home", emoji: "🎭", vowelType: "short" },
  
  // ===== FOOD =====
  { english: "Apple", hebrew: "תפוח", category: "Food", emoji: "🍎", vowelType: "short" },
  { english: "Banana", hebrew: "בננה", category: "Food", emoji: "🍌", vowelType: "short" },
  { english: "Orange", hebrew: "תפוז", category: "Food", emoji: "🍊", vowelType: "short" },
  { english: "Bread", hebrew: "לחם", category: "Food", emoji: "🍞", vowelType: "short" },
  { english: "Milk", hebrew: "חלב", category: "Food", emoji: "🥛", vowelType: "short" },
  { english: "Water", hebrew: "מים", category: "Food", emoji: "💧", vowelType: "short" },
  { english: "Juice", hebrew: "מיץ", category: "Food", emoji: "🧃", vowelType: "long" },
  { english: "Cake", hebrew: "עוגה", category: "Food", emoji: "🎂", vowelType: "long" },
  { english: "Cookie", hebrew: "עוגיה", category: "Food", emoji: "🍪", vowelType: "long" },
  { english: "Pizza", hebrew: "פיצה", category: "Food", emoji: "🍕", vowelType: "long" },
  { english: "Ice cream", hebrew: "גלידה", category: "Food", emoji: "🍦", vowelType: "long" },
  { english: "Candy", hebrew: "ממתק", category: "Food", emoji: "🍬", vowelType: "short" },
  { english: "Cheese", hebrew: "גבינה", category: "Food", emoji: "🧀", vowelType: "long" },
  { english: "Egg", hebrew: "ביצה", category: "Food", emoji: "🥚", vowelType: "short" },
  { english: "Rice", hebrew: "אורז", category: "Food", emoji: "🍚", vowelType: "long" },
  { english: "Pasta", hebrew: "פסטה", category: "Food", emoji: "🍝", vowelType: "short" },
  { english: "Soup", hebrew: "מרק", category: "Food", emoji: "🍲", vowelType: "long" },
  { english: "Salad", hebrew: "סלט", category: "Food", emoji: "🥗", vowelType: "short" },
  { english: "Sandwich", hebrew: "כריך", category: "Food", emoji: "🥪", vowelType: "short" },
  { english: "Chicken", hebrew: "עוף", category: "Food", emoji: "🍗", vowelType: "short" },
  { english: "Fish", hebrew: "דג", category: "Food", emoji: "🐟", vowelType: "short" },
  { english: "Fruit", hebrew: "פרי", category: "Food", emoji: "🍇", vowelType: "long" },
  { english: "Vegetable", hebrew: "ירק", category: "Food", emoji: "🥕", vowelType: "short" },
  { english: "Carrot", hebrew: "גזר", category: "Food", emoji: "🥕", vowelType: "short" },
  { english: "Tomato", hebrew: "עגבניה", category: "Food", emoji: "🍅", vowelType: "long" },
  { english: "Potato", hebrew: "תפוח אדמה", category: "Food", emoji: "🥔", vowelType: "long" },
  { english: "Corn", hebrew: "תירס", category: "Food", emoji: "🌽", vowelType: "short" },
  { english: "Grape", hebrew: "ענב", category: "Food", emoji: "🍇", vowelType: "long" },
  { english: "Strawberry", hebrew: "תות", category: "Food", emoji: "🍓", vowelType: "short" },
  { english: "Watermelon", hebrew: "אבטיח", category: "Food", emoji: "🍉", vowelType: "short" },
  { english: "Lemon", hebrew: "לימון", category: "Food", emoji: "🍋", vowelType: "short" },
  { english: "Honey", hebrew: "דבש", category: "Food", emoji: "🍯", vowelType: "short" },
  { english: "Butter", hebrew: "חמאה", category: "Food", emoji: "🧈", vowelType: "short" },
  
  // ===== ANIMALS =====
  { english: "Dog", hebrew: "כלב", category: "Animals", emoji: "🐕", vowelType: "short" },
  { english: "Cat", hebrew: "חתול", category: "Animals", emoji: "🐱", vowelType: "short" },
  { english: "Bird", hebrew: "ציפור", category: "Animals", emoji: "🐦", vowelType: "short" },
  { english: "Fish", hebrew: "דג", category: "Animals", emoji: "🐟", vowelType: "short" },
  { english: "Horse", hebrew: "סוס", category: "Animals", emoji: "🐴", vowelType: "long" },
  { english: "Cow", hebrew: "פרה", category: "Animals", emoji: "🐄", vowelType: "short" },
  { english: "Pig", hebrew: "חזיר", category: "Animals", emoji: "🐷", vowelType: "short" },
  { english: "Sheep", hebrew: "כבש", category: "Animals", emoji: "🐑", vowelType: "long" },
  { english: "Rabbit", hebrew: "ארנב", category: "Animals", emoji: "🐰", vowelType: "short" },
  { english: "Duck", hebrew: "ברווז", category: "Animals", emoji: "🦆", vowelType: "short" },
  { english: "Chicken", hebrew: "תרנגולת", category: "Animals", emoji: "🐔", vowelType: "short" },
  { english: "Lion", hebrew: "אריה", category: "Animals", emoji: "🦁", vowelType: "long" },
  { english: "Tiger", hebrew: "נמר", category: "Animals", emoji: "🐯", vowelType: "long" },
  { english: "Bear", hebrew: "דוב", category: "Animals", emoji: "🐻", vowelType: "long" },
  { english: "Elephant", hebrew: "פיל", category: "Animals", emoji: "🐘", vowelType: "short" },
  { english: "Monkey", hebrew: "קוף", category: "Animals", emoji: "🐒", vowelType: "short" },
  { english: "Giraffe", hebrew: "ג'ירפה", category: "Animals", emoji: "🦒", vowelType: "short" },
  { english: "Zebra", hebrew: "זברה", category: "Animals", emoji: "🦓", vowelType: "long" },
  { english: "Snake", hebrew: "נחש", category: "Animals", emoji: "🐍", vowelType: "long" },
  { english: "Frog", hebrew: "צפרדע", category: "Animals", emoji: "🐸", vowelType: "short" },
  { english: "Turtle", hebrew: "צב", category: "Animals", emoji: "🐢", vowelType: "short" },
  { english: "Butterfly", hebrew: "פרפר", category: "Animals", emoji: "🦋", vowelType: "short" },
  { english: "Bee", hebrew: "דבורה", category: "Animals", emoji: "🐝", vowelType: "long" },
  { english: "Ant", hebrew: "נמלה", category: "Animals", emoji: "🐜", vowelType: "short" },
  { english: "Spider", hebrew: "עכביש", category: "Animals", emoji: "🕷️", vowelType: "long" },
  { english: "Wolf", hebrew: "זאב", category: "Animals", emoji: "🐺", vowelType: "short" },
  { english: "Fox", hebrew: "שועל", category: "Animals", emoji: "🦊", vowelType: "short" },
  { english: "Deer", hebrew: "צבי", category: "Animals", emoji: "🦌", vowelType: "long" },
  { english: "Owl", hebrew: "ינשוף", category: "Animals", emoji: "🦉", vowelType: "short" },
  { english: "Eagle", hebrew: "נשר", category: "Animals", emoji: "🦅", vowelType: "long" },
  { english: "Penguin", hebrew: "פינגווין", category: "Animals", emoji: "🐧", vowelType: "short" },
  { english: "Dolphin", hebrew: "דולפין", category: "Animals", emoji: "🐬", vowelType: "short" },
  { english: "Whale", hebrew: "לווייתן", category: "Animals", emoji: "🐋", vowelType: "long" },
  { english: "Shark", hebrew: "כריש", category: "Animals", emoji: "🦈", vowelType: "short" },
  { english: "Crab", hebrew: "סרטן", category: "Animals", emoji: "🦀", vowelType: "short" },
  { english: "Octopus", hebrew: "תמנון", category: "Animals", emoji: "🐙", vowelType: "short" },
  { english: "Dinosaur", hebrew: "דינוזאור", category: "Animals", emoji: "🦕", vowelType: "long" },
  { english: "Dragon", hebrew: "דרקון", category: "Animals", emoji: "🐉", vowelType: "short" },
  { english: "Unicorn", hebrew: "חד קרן", category: "Animals", emoji: "🦄", vowelType: "long" },
  
  // ===== COLORS =====
  { english: "Red", hebrew: "אדום", category: "Colors", emoji: "🔴", vowelType: "short" },
  { english: "Blue", hebrew: "כחול", category: "Colors", emoji: "🔵", vowelType: "long" },
  { english: "Green", hebrew: "ירוק", category: "Colors", emoji: "🟢", vowelType: "long" },
  { english: "Yellow", hebrew: "צהוב", category: "Colors", emoji: "🟡", vowelType: "short" },
  { english: "Orange", hebrew: "כתום", category: "Colors", emoji: "🟠", vowelType: "short" },
  { english: "Purple", hebrew: "סגול", category: "Colors", emoji: "🟣", vowelType: "short" },
  { english: "Pink", hebrew: "ורוד", category: "Colors", emoji: "🩷", vowelType: "short" },
  { english: "Black", hebrew: "שחור", category: "Colors", emoji: "⚫", vowelType: "short" },
  { english: "White", hebrew: "לבן", category: "Colors", emoji: "⚪", vowelType: "long" },
  { english: "Brown", hebrew: "חום", category: "Colors", emoji: "🟤", vowelType: "short" },
  { english: "Gray", hebrew: "אפור", category: "Colors", emoji: "⬜", vowelType: "long" },
  { english: "Gold", hebrew: "זהב", category: "Colors", emoji: "🏅", vowelType: "long" },
  { english: "Silver", hebrew: "כסף", category: "Colors", emoji: "🥈", vowelType: "short" },
  
  // ===== NATURE =====
  { english: "Sun", hebrew: "שמש", category: "Nature", emoji: "☀️", vowelType: "short" },
  { english: "Moon", hebrew: "ירח", category: "Nature", emoji: "🌙", vowelType: "long" },
  { english: "Star", hebrew: "כוכב", category: "Nature", emoji: "⭐", vowelType: "short" },
  { english: "Sky", hebrew: "שמיים", category: "Nature", emoji: "🌤️", vowelType: "long" },
  { english: "Cloud", hebrew: "ענן", category: "Nature", emoji: "☁️", vowelType: "short" },
  { english: "Rain", hebrew: "גשם", category: "Nature", emoji: "🌧️", vowelType: "long" },
  { english: "Snow", hebrew: "שלג", category: "Nature", emoji: "❄️", vowelType: "long" },
  { english: "Wind", hebrew: "רוח", category: "Nature", emoji: "💨", vowelType: "short" },
  { english: "Tree", hebrew: "עץ", category: "Nature", emoji: "🌳", vowelType: "long" },
  { english: "Flower", hebrew: "פרח", category: "Nature", emoji: "🌸", vowelType: "short" },
  { english: "Grass", hebrew: "דשא", category: "Nature", emoji: "🌿", vowelType: "short" },
  { english: "Leaf", hebrew: "עלה", category: "Nature", emoji: "🍃", vowelType: "long" },
  { english: "Mountain", hebrew: "הר", category: "Nature", emoji: "🏔️", vowelType: "short" },
  { english: "River", hebrew: "נהר", category: "Nature", emoji: "🏞️", vowelType: "short" },
  { english: "Lake", hebrew: "אגם", category: "Nature", emoji: "🌊", vowelType: "long" },
  { english: "Ocean", hebrew: "אוקיינוס", category: "Nature", emoji: "🌊", vowelType: "long" },
  { english: "Beach", hebrew: "חוף", category: "Nature", emoji: "🏖️", vowelType: "long" },
  { english: "Forest", hebrew: "יער", category: "Nature", emoji: "🌲", vowelType: "short" },
  { english: "Rock", hebrew: "סלע", category: "Nature", emoji: "🪨", vowelType: "short" },
  { english: "Sand", hebrew: "חול", category: "Nature", emoji: "🏖️", vowelType: "short" },
  { english: "Fire", hebrew: "אש", category: "Nature", emoji: "🔥", vowelType: "long" },
  { english: "Rainbow", hebrew: "קשת", category: "Nature", emoji: "🌈", vowelType: "long" },
  { english: "Earth", hebrew: "כדור הארץ", category: "Nature", emoji: "🌍", vowelType: "short" },
  
  // ===== NUMBERS =====
  { english: "One", hebrew: "אחד", category: "Numbers", emoji: "1️⃣", vowelType: "short" },
  { english: "Two", hebrew: "שתיים", category: "Numbers", emoji: "2️⃣", vowelType: "long" },
  { english: "Three", hebrew: "שלוש", category: "Numbers", emoji: "3️⃣", vowelType: "long" },
  { english: "Four", hebrew: "ארבע", category: "Numbers", emoji: "4️⃣", vowelType: "long" },
  { english: "Five", hebrew: "חמש", category: "Numbers", emoji: "5️⃣", vowelType: "long" },
  { english: "Six", hebrew: "שש", category: "Numbers", emoji: "6️⃣", vowelType: "short" },
  { english: "Seven", hebrew: "שבע", category: "Numbers", emoji: "7️⃣", vowelType: "short" },
  { english: "Eight", hebrew: "שמונה", category: "Numbers", emoji: "8️⃣", vowelType: "long" },
  { english: "Nine", hebrew: "תשע", category: "Numbers", emoji: "9️⃣", vowelType: "long" },
  { english: "Ten", hebrew: "עשר", category: "Numbers", emoji: "🔟", vowelType: "short" },
  { english: "Zero", hebrew: "אפס", category: "Numbers", emoji: "0️⃣", vowelType: "long" },
  
  // ===== ACTIONS =====
  { english: "Run", hebrew: "לרוץ", category: "Actions", emoji: "🏃", vowelType: "short" },
  { english: "Walk", hebrew: "ללכת", category: "Actions", emoji: "🚶", vowelType: "short" },
  { english: "Jump", hebrew: "לקפוץ", category: "Actions", emoji: "⬆️", vowelType: "short" },
  { english: "Swim", hebrew: "לשחות", category: "Actions", emoji: "🏊", vowelType: "short" },
  { english: "Fly", hebrew: "לעוף", category: "Actions", emoji: "✈️", vowelType: "long" },
  { english: "Eat", hebrew: "לאכול", category: "Actions", emoji: "🍽️", vowelType: "long" },
  { english: "Drink", hebrew: "לשתות", category: "Actions", emoji: "🥤", vowelType: "short" },
  { english: "Sleep", hebrew: "לישון", category: "Actions", emoji: "😴", vowelType: "long" },
  { english: "Wake", hebrew: "להתעורר", category: "Actions", emoji: "⏰", vowelType: "long" },
  { english: "Read", hebrew: "לקרוא", category: "Actions", emoji: "📖", vowelType: "long" },
  { english: "Write", hebrew: "לכתוב", category: "Actions", emoji: "✍️", vowelType: "long" },
  { english: "Draw", hebrew: "לצייר", category: "Actions", emoji: "🎨", vowelType: "short" },
  { english: "Sing", hebrew: "לשיר", category: "Actions", emoji: "🎤", vowelType: "short" },
  { english: "Dance", hebrew: "לרקוד", category: "Actions", emoji: "💃", vowelType: "long" },
  { english: "Play", hebrew: "לשחק", category: "Actions", emoji: "🎮", vowelType: "long" },
  { english: "Talk", hebrew: "לדבר", category: "Actions", emoji: "💬", vowelType: "short" },
  { english: "Listen", hebrew: "להקשיב", category: "Actions", emoji: "👂", vowelType: "short" },
  { english: "Look", hebrew: "להסתכל", category: "Actions", emoji: "👀", vowelType: "short" },
  { english: "Think", hebrew: "לחשוב", category: "Actions", emoji: "🤔", vowelType: "short" },
  { english: "Help", hebrew: "לעזור", category: "Actions", emoji: "🤝", vowelType: "short" },
  { english: "Love", hebrew: "לאהוב", category: "Actions", emoji: "❤️", vowelType: "long" },
  { english: "Like", hebrew: "לאהוב", category: "Actions", emoji: "👍", vowelType: "long" },
  { english: "Smile", hebrew: "לחייך", category: "Actions", emoji: "😊", vowelType: "long" },
  { english: "Laugh", hebrew: "לצחוק", category: "Actions", emoji: "😂", vowelType: "short" },
  { english: "Cry", hebrew: "לבכות", category: "Actions", emoji: "😢", vowelType: "long" },
  { english: "Open", hebrew: "לפתוח", category: "Actions", emoji: "📂", vowelType: "long" },
  { english: "Close", hebrew: "לסגור", category: "Actions", emoji: "📁", vowelType: "long" },
  { english: "Give", hebrew: "לתת", category: "Actions", emoji: "🎁", vowelType: "short" },
  { english: "Take", hebrew: "לקחת", category: "Actions", emoji: "✊", vowelType: "long" },
  { english: "Stop", hebrew: "לעצור", category: "Actions", emoji: "🛑", vowelType: "short" },
  { english: "Go", hebrew: "ללכת", category: "Actions", emoji: "🚶", vowelType: "long" },
  { english: "Come", hebrew: "לבוא", category: "Actions", emoji: "👋", vowelType: "short" },
  { english: "Sit", hebrew: "לשבת", category: "Actions", emoji: "🪑", vowelType: "short" },
  { english: "Stand", hebrew: "לעמוד", category: "Actions", emoji: "🧍", vowelType: "short" },
  { english: "Throw", hebrew: "לזרוק", category: "Actions", emoji: "🤾", vowelType: "long" },
  { english: "Catch", hebrew: "לתפוס", category: "Actions", emoji: "🤲", vowelType: "short" },
  { english: "Push", hebrew: "לדחוף", category: "Actions", emoji: "👐", vowelType: "short" },
  { english: "Pull", hebrew: "למשוך", category: "Actions", emoji: "💪", vowelType: "short" },
  { english: "Climb", hebrew: "לטפס", category: "Actions", emoji: "🧗", vowelType: "long" },
  
  // ===== SCHOOL =====
  { english: "Book", hebrew: "ספר", category: "School", emoji: "📚", vowelType: "short" },
  { english: "Pen", hebrew: "עט", category: "School", emoji: "🖊️", vowelType: "short" },
  { english: "Pencil", hebrew: "עיפרון", category: "School", emoji: "✏️", vowelType: "short" },
  { english: "Paper", hebrew: "נייר", category: "School", emoji: "📄", vowelType: "long" },
  { english: "Teacher", hebrew: "מורה", category: "School", emoji: "👨‍🏫", vowelType: "long" },
  { english: "Student", hebrew: "תלמיד", category: "School", emoji: "🧑‍🎓", vowelType: "long" },
  { english: "School", hebrew: "בית ספר", category: "School", emoji: "🏫", vowelType: "long" },
  { english: "Class", hebrew: "כיתה", category: "School", emoji: "🏫", vowelType: "short" },
  { english: "Desk", hebrew: "שולחן", category: "School", emoji: "🪑", vowelType: "short" },
  { english: "Board", hebrew: "לוח", category: "School", emoji: "🖥️", vowelType: "long" },
  { english: "Eraser", hebrew: "מחק", category: "School", emoji: "🧽", vowelType: "long" },
  { english: "Ruler", hebrew: "סרגל", category: "School", emoji: "📏", vowelType: "long" },
  { english: "Bag", hebrew: "תיק", category: "School", emoji: "🎒", vowelType: "short" },
  { english: "Homework", hebrew: "שיעורי בית", category: "School", emoji: "📝", vowelType: "long" },
  { english: "Test", hebrew: "מבחן", category: "School", emoji: "📋", vowelType: "short" },
  
  // ===== CLOTHES =====
  { english: "Shirt", hebrew: "חולצה", category: "Clothes", emoji: "👕", vowelType: "short" },
  { english: "Pants", hebrew: "מכנסיים", category: "Clothes", emoji: "👖", vowelType: "short" },
  { english: "Dress", hebrew: "שמלה", category: "Clothes", emoji: "👗", vowelType: "short" },
  { english: "Shoes", hebrew: "נעליים", category: "Clothes", emoji: "👟", vowelType: "long" },
  { english: "Socks", hebrew: "גרביים", category: "Clothes", emoji: "🧦", vowelType: "short" },
  { english: "Hat", hebrew: "כובע", category: "Clothes", emoji: "🧢", vowelType: "short" },
  { english: "Jacket", hebrew: "ז'קט", category: "Clothes", emoji: "🧥", vowelType: "short" },
  { english: "Coat", hebrew: "מעיל", category: "Clothes", emoji: "🧥", vowelType: "long" },
  { english: "Gloves", hebrew: "כפפות", category: "Clothes", emoji: "🧤", vowelType: "short" },
  { english: "Scarf", hebrew: "צעיף", category: "Clothes", emoji: "🧣", vowelType: "short" },
  
  // ===== TOYS & PLAY =====
  { english: "Toy", hebrew: "צעצוע", category: "Toys", emoji: "🧸", vowelType: "short" },
  { english: "Doll", hebrew: "בובה", category: "Toys", emoji: "🪆", vowelType: "short" },
  { english: "Ball", hebrew: "כדור", category: "Toys", emoji: "⚽", vowelType: "short" },
  { english: "Game", hebrew: "משחק", category: "Toys", emoji: "🎮", vowelType: "long" },
  { english: "Puzzle", hebrew: "פאזל", category: "Toys", emoji: "🧩", vowelType: "short" },
  { english: "Kite", hebrew: "עפיפון", category: "Toys", emoji: "🪁", vowelType: "long" },
  { english: "Robot", hebrew: "רובוט", category: "Toys", emoji: "🤖", vowelType: "long" },
  { english: "Bike", hebrew: "אופניים", category: "Toys", emoji: "🚲", vowelType: "long" },
  { english: "Skateboard", hebrew: "סקייטבורד", category: "Toys", emoji: "🛹", vowelType: "long" },
  { english: "Swing", hebrew: "נדנדה", category: "Toys", emoji: "🎢", vowelType: "short" },
  
  // ===== TRANSPORT =====
  { english: "Car", hebrew: "מכונית", category: "Transport", emoji: "🚗", vowelType: "short" },
  { english: "Bus", hebrew: "אוטובוס", category: "Transport", emoji: "🚌", vowelType: "short" },
  { english: "Train", hebrew: "רכבת", category: "Transport", emoji: "🚂", vowelType: "long" },
  { english: "Plane", hebrew: "מטוס", category: "Transport", emoji: "✈️", vowelType: "long" },
  { english: "Boat", hebrew: "סירה", category: "Transport", emoji: "⛵", vowelType: "long" },
  { english: "Ship", hebrew: "ספינה", category: "Transport", emoji: "🚢", vowelType: "short" },
  { english: "Bike", hebrew: "אופניים", category: "Transport", emoji: "🚲", vowelType: "long" },
  { english: "Truck", hebrew: "משאית", category: "Transport", emoji: "🚚", vowelType: "short" },
  { english: "Helicopter", hebrew: "מסוק", category: "Transport", emoji: "🚁", vowelType: "short" },
  { english: "Rocket", hebrew: "רקטה", category: "Transport", emoji: "🚀", vowelType: "short" },
  
  // ===== FEELINGS =====
  { english: "Happy", hebrew: "שמח", category: "Feelings", emoji: "😊", vowelType: "short" },
  { english: "Sad", hebrew: "עצוב", category: "Feelings", emoji: "😢", vowelType: "short" },
  { english: "Angry", hebrew: "כועס", category: "Feelings", emoji: "😠", vowelType: "short" },
  { english: "Scared", hebrew: "מפחד", category: "Feelings", emoji: "😨", vowelType: "long" },
  { english: "Tired", hebrew: "עייף", category: "Feelings", emoji: "😴", vowelType: "long" },
  { english: "Hungry", hebrew: "רעב", category: "Feelings", emoji: "🤤", vowelType: "short" },
  { english: "Thirsty", hebrew: "צמא", category: "Feelings", emoji: "🥤", vowelType: "short" },
  { english: "Excited", hebrew: "נרגש", category: "Feelings", emoji: "🤩", vowelType: "long" },
  { english: "Surprised", hebrew: "מופתע", category: "Feelings", emoji: "😮", vowelType: "long" },
  { english: "Brave", hebrew: "אמיץ", category: "Feelings", emoji: "💪", vowelType: "long" },
  { english: "Shy", hebrew: "ביישן", category: "Feelings", emoji: "😳", vowelType: "long" },
  { english: "Proud", hebrew: "גאה", category: "Feelings", emoji: "😤", vowelType: "short" },
  { english: "Calm", hebrew: "רגוע", category: "Feelings", emoji: "😌", vowelType: "short" },
  
  // ===== WEATHER =====
  { english: "Hot", hebrew: "חם", category: "Weather", emoji: "🥵", vowelType: "short" },
  { english: "Cold", hebrew: "קר", category: "Weather", emoji: "🥶", vowelType: "long" },
  { english: "Sunny", hebrew: "שמשי", category: "Weather", emoji: "☀️", vowelType: "short" },
  { english: "Cloudy", hebrew: "מעונן", category: "Weather", emoji: "☁️", vowelType: "short" },
  { english: "Rainy", hebrew: "גשום", category: "Weather", emoji: "🌧️", vowelType: "long" },
  { english: "Windy", hebrew: "סוער", category: "Weather", emoji: "💨", vowelType: "short" },
  { english: "Snowy", hebrew: "מושלג", category: "Weather", emoji: "❄️", vowelType: "long" },
  { english: "Stormy", hebrew: "סוער", category: "Weather", emoji: "⛈️", vowelType: "short" },
  
  // ===== ADJECTIVES =====
  { english: "Big", hebrew: "גדול", category: "Adjectives", emoji: "🐘", vowelType: "short" },
  { english: "Small", hebrew: "קטן", category: "Adjectives", emoji: "🐜", vowelType: "short" },
  { english: "Fast", hebrew: "מהיר", category: "Adjectives", emoji: "💨", vowelType: "short" },
  { english: "Slow", hebrew: "איטי", category: "Adjectives", emoji: "🐢", vowelType: "long" },
  { english: "Strong", hebrew: "חזק", category: "Adjectives", emoji: "💪", vowelType: "short" },
  { english: "Tall", hebrew: "גבוה", category: "Adjectives", emoji: "🦒", vowelType: "short" },
  { english: "Short", hebrew: "נמוך", category: "Adjectives", emoji: "🐁", vowelType: "short" },
  { english: "Long", hebrew: "ארוך", category: "Adjectives", emoji: "🐍", vowelType: "short" },
  { english: "New", hebrew: "חדש", category: "Adjectives", emoji: "✨", vowelType: "long" },
  { english: "Old", hebrew: "ישן", category: "Adjectives", emoji: "👴", vowelType: "long" },
  { english: "Good", hebrew: "טוב", category: "Adjectives", emoji: "👍", vowelType: "short" },
  { english: "Bad", hebrew: "רע", category: "Adjectives", emoji: "👎", vowelType: "short" },
  { english: "Nice", hebrew: "נחמד", category: "Adjectives", emoji: "😊", vowelType: "long" },
  { english: "Beautiful", hebrew: "יפה", category: "Adjectives", emoji: "🌺", vowelType: "long" },
  { english: "Cool", hebrew: "מגניב", category: "Adjectives", emoji: "😎", vowelType: "long" },
  { english: "Super", hebrew: "סופר", category: "Adjectives", emoji: "🦸", vowelType: "long" },
  { english: "Amazing", hebrew: "מדהים", category: "Adjectives", emoji: "🤩", vowelType: "long" },
  { english: "Funny", hebrew: "מצחיק", category: "Adjectives", emoji: "😄", vowelType: "short" },
  { english: "Cute", hebrew: "חמוד", category: "Adjectives", emoji: "🥰", vowelType: "long" },
  { english: "Loud", hebrew: "רועש", category: "Adjectives", emoji: "📢", vowelType: "short" },
  { english: "Quiet", hebrew: "שקט", category: "Adjectives", emoji: "🤫", vowelType: "long" },
  { english: "Hard", hebrew: "קשה", category: "Adjectives", emoji: "🪨", vowelType: "short" },
  { english: "Soft", hebrew: "רך", category: "Adjectives", emoji: "🧸", vowelType: "short" },
  { english: "Easy", hebrew: "קל", category: "Adjectives", emoji: "✅", vowelType: "long" },
  { english: "Yummy", hebrew: "טעים", category: "Adjectives", emoji: "😋", vowelType: "short" },
  
  // ===== COMMON WORDS =====
  { english: "Yes", hebrew: "כן", category: "Common", emoji: "✅", vowelType: "short" },
  { english: "No", hebrew: "לא", category: "Common", emoji: "❌", vowelType: "long" },
  { english: "Please", hebrew: "בבקשה", category: "Common", emoji: "🙏", vowelType: "long" },
  { english: "Thanks", hebrew: "תודה", category: "Common", emoji: "🙏", vowelType: "short" },
  { english: "Sorry", hebrew: "סליחה", category: "Common", emoji: "😔", vowelType: "short" },
  { english: "Hello", hebrew: "שלום", category: "Common", emoji: "👋", vowelType: "short" },
  { english: "Goodbye", hebrew: "להתראות", category: "Common", emoji: "👋", vowelType: "short" },
  { english: "Good morning", hebrew: "בוקר טוב", category: "Common", emoji: "🌅", vowelType: "short" },
  { english: "Good night", hebrew: "לילה טוב", category: "Common", emoji: "🌙", vowelType: "long" },
  { english: "I", hebrew: "אני", category: "Common", emoji: "👆", vowelType: "long" },
  { english: "You", hebrew: "אתה", category: "Common", emoji: "👉", vowelType: "long" },
  { english: "He", hebrew: "הוא", category: "Common", emoji: "👦", vowelType: "long" },
  { english: "She", hebrew: "היא", category: "Common", emoji: "👧", vowelType: "long" },
  { english: "We", hebrew: "אנחנו", category: "Common", emoji: "👨‍👩‍👧‍👦", vowelType: "long" },
  { english: "They", hebrew: "הם", category: "Common", emoji: "👥", vowelType: "long" },
  { english: "What", hebrew: "מה", category: "Common", emoji: "❓", vowelType: "short" },
  { english: "Where", hebrew: "איפה", category: "Common", emoji: "📍", vowelType: "long" },
  { english: "When", hebrew: "מתי", category: "Common", emoji: "⏰", vowelType: "short" },
  { english: "Why", hebrew: "למה", category: "Common", emoji: "🤔", vowelType: "long" },
  { english: "How", hebrew: "איך", category: "Common", emoji: "❓", vowelType: "short" },
  { english: "This", hebrew: "זה", category: "Common", emoji: "👆", vowelType: "short" },
  { english: "That", hebrew: "זה", category: "Common", emoji: "👉", vowelType: "short" },
  { english: "Here", hebrew: "פה", category: "Common", emoji: "📍", vowelType: "long" },
  { english: "There", hebrew: "שם", category: "Common", emoji: "👉", vowelType: "long" },
  { english: "And", hebrew: "ו", category: "Common", emoji: "➕", vowelType: "short" },
  { english: "But", hebrew: "אבל", category: "Common", emoji: "↩️", vowelType: "short" },
  { english: "Is", hebrew: "הוא/היא", category: "Common", emoji: "=", vowelType: "short" },
  { english: "Are", hebrew: "הם/הן", category: "Common", emoji: "=", vowelType: "long" },
  { english: "Can", hebrew: "יכול", category: "Common", emoji: "💪", vowelType: "short" },
  { english: "My", hebrew: "שלי", category: "Common", emoji: "👆", vowelType: "long" },
  { english: "Your", hebrew: "שלך", category: "Common", emoji: "👉", vowelType: "long" },
  { english: "Very", hebrew: "מאוד", category: "Common", emoji: "❗", vowelType: "short" },
  { english: "Now", hebrew: "עכשיו", category: "Common", emoji: "⏰", vowelType: "short" },
  { english: "Today", hebrew: "היום", category: "Common", emoji: "📅", vowelType: "long" },
  { english: "Up", hebrew: "למעלה", category: "Common", emoji: "⬆️", vowelType: "short" },
  { english: "Down", hebrew: "למטה", category: "Common", emoji: "⬇️", vowelType: "short" },
  { english: "In", hebrew: "בתוך", category: "Common", emoji: "📥", vowelType: "short" },
  { english: "Out", hebrew: "בחוץ", category: "Common", emoji: "📤", vowelType: "short" },
  { english: "On", hebrew: "על", category: "Common", emoji: "⬆️", vowelType: "short" },
  { english: "Off", hebrew: "כבוי", category: "Common", emoji: "⭕", vowelType: "short" },
  { english: "With", hebrew: "עם", category: "Common", emoji: "🤝", vowelType: "short" },
  { english: "For", hebrew: "בשביל", category: "Common", emoji: "🎁", vowelType: "short" },
  { english: "To", hebrew: "ל", category: "Common", emoji: "➡️", vowelType: "long" },
  { english: "From", hebrew: "מ", category: "Common", emoji: "⬅️", vowelType: "short" },
  
  // ===== TIME =====
  { english: "Day", hebrew: "יום", category: "Time", emoji: "☀️", vowelType: "long" },
  { english: "Night", hebrew: "לילה", category: "Time", emoji: "🌙", vowelType: "long" },
  { english: "Morning", hebrew: "בוקר", category: "Time", emoji: "🌅", vowelType: "short" },
  { english: "Evening", hebrew: "ערב", category: "Time", emoji: "🌆", vowelType: "long" },
  { english: "Week", hebrew: "שבוע", category: "Time", emoji: "📅", vowelType: "long" },
  { english: "Month", hebrew: "חודש", category: "Time", emoji: "📆", vowelType: "short" },
  { english: "Year", hebrew: "שנה", category: "Time", emoji: "🗓️", vowelType: "long" },
  { english: "Hour", hebrew: "שעה", category: "Time", emoji: "⏰", vowelType: "short" },
  { english: "Minute", hebrew: "דקה", category: "Time", emoji: "⏱️", vowelType: "short" },
  { english: "Second", hebrew: "שנייה", category: "Time", emoji: "⏱️", vowelType: "short" },
];

// For backward compatibility - keep words export
export const words: WordData[] = masterWordBank;

// Get words for a specific letter with 50% uppercase, 50% lowercase distribution
export const getWordsForLetter = (letter: string, count: number = 10): { english: string; hebrew: string; startsWithUpper: boolean }[] => {
  const upperLetter = letter.toUpperCase();
  const lowerLetter = letter.toLowerCase();
  
  // Words that start with or prominently feature uppercase letter
  const upperWords = masterWordBank.filter(word => 
    word.english.startsWith(upperLetter) || word.english.includes(upperLetter)
  );
  
  // Words that contain lowercase letter (not starting with it)
  const lowerWords = masterWordBank.filter(word => 
    word.english.toLowerCase().includes(lowerLetter) && !word.english.startsWith(upperLetter)
  );
  
  const halfCount = Math.floor(count / 2);
  const shuffledUpper = shuffleArray(upperWords).slice(0, halfCount);
  const shuffledLower = shuffleArray(lowerWords).slice(0, count - halfCount);
  
  const result = [
    ...shuffledUpper.map(w => ({ english: w.english, hebrew: w.hebrew, startsWithUpper: true })),
    ...shuffledLower.map(w => ({ english: w.english, hebrew: w.hebrew, startsWithUpper: false }))
  ];
  
  // If we don't have enough words, fill from available
  if (result.length < count) {
    const allFiltered = masterWordBank.filter(word => wordContainsLetter(word.english, letter));
    const additional = shuffleArray(allFiltered)
      .filter(w => !result.some(r => r.english === w.english))
      .slice(0, count - result.length)
      .map(w => ({ english: w.english, hebrew: w.hebrew, startsWithUpper: w.english.startsWith(upperLetter) }));
    result.push(...additional);
  }
  
  return shuffleArray(result).slice(0, count);
};

// Letter sounds data - vowel sounds and pronunciation for each letter
export const letterSounds: Record<string, { sound: string; example: string; type: "short" | "long" | "consonant" }[]> = {
  A: [
    { sound: "æ", example: "apple", type: "short" },
    { sound: "eɪ", example: "cake", type: "long" },
    { sound: "ɑː", example: "car", type: "long" },
  ],
  E: [
    { sound: "ɛ", example: "bed", type: "short" },
    { sound: "iː", example: "see", type: "long" },
  ],
  I: [
    { sound: "ɪ", example: "sit", type: "short" },
    { sound: "aɪ", example: "kite", type: "long" },
  ],
  O: [
    { sound: "ɒ", example: "hot", type: "short" },
    { sound: "oʊ", example: "go", type: "long" },
  ],
  U: [
    { sound: "ʌ", example: "cup", type: "short" },
    { sound: "uː", example: "blue", type: "long" },
  ],
  B: [{ sound: "b", example: "ball", type: "consonant" }],
  C: [
    { sound: "k", example: "cat", type: "consonant" },
    { sound: "s", example: "city", type: "consonant" },
  ],
  D: [{ sound: "d", example: "dog", type: "consonant" }],
  F: [{ sound: "f", example: "fish", type: "consonant" }],
  G: [
    { sound: "g", example: "go", type: "consonant" },
    { sound: "dʒ", example: "giant", type: "consonant" },
  ],
  H: [{ sound: "h", example: "hat", type: "consonant" }],
  J: [{ sound: "dʒ", example: "jump", type: "consonant" }],
  K: [{ sound: "k", example: "kick", type: "consonant" }],
  L: [{ sound: "l", example: "leg", type: "consonant" }],
  M: [{ sound: "m", example: "man", type: "consonant" }],
  N: [{ sound: "n", example: "net", type: "consonant" }],
  P: [{ sound: "p", example: "pen", type: "consonant" }],
  Q: [{ sound: "kw", example: "queen", type: "consonant" }],
  R: [{ sound: "r", example: "run", type: "consonant" }],
  S: [
    { sound: "s", example: "sun", type: "consonant" },
    { sound: "z", example: "rose", type: "consonant" },
  ],
  T: [{ sound: "t", example: "top", type: "consonant" }],
  V: [{ sound: "v", example: "van", type: "consonant" }],
  W: [{ sound: "w", example: "wet", type: "consonant" }],
  X: [{ sound: "ks", example: "box", type: "consonant" }],
  Y: [
    { sound: "j", example: "yes", type: "consonant" },
    { sound: "iː", example: "happy", type: "long" },
  ],
  Z: [{ sound: "z", example: "zoo", type: "consonant" }],
};

// Shuffle utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate letter data dynamically
export const letters: LetterData[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => ({
  letter,
  lowercase: letter.toLowerCase(),
  words: getWordsForLetter(letter, 10),
}));

// Get random words by category
export const getRandomWords = (count: number = 10, category?: string): WordData[] => {
  const filtered = category ? masterWordBank.filter(w => w.category === category) : masterWordBank;
  return shuffleArray(filtered).slice(0, count);
};

// ===== SENTENCES (expanded, no Smurfs) =====
export const allSentences: SentenceData[] = [
  // Mario sentences
  { english: "Mario jumps", hebrew: "מריו קופץ", words: ["Mario", "jumps"] },
  { english: "Luigi is green", hebrew: "לואיג'י ירוק", words: ["Luigi", "is", "green"] },
  { english: "Peach is a princess", hebrew: "פיץ' היא נסיכה", words: ["Peach", "is", "a", "princess"] },
  { english: "Bowser is big", hebrew: "באוזר גדול", words: ["Bowser", "is", "big"] },
  { english: "Yoshi eats fruit", hebrew: "יושי אוכל פרי", words: ["Yoshi", "eats", "fruit"] },
  { english: "Toad helps Mario", hebrew: "טואד עוזר למריו", words: ["Toad", "helps", "Mario"] },
  { english: "Mario finds a star", hebrew: "מריו מוצא כוכב", words: ["Mario", "finds", "a", "star"] },
  { english: "Luigi runs fast", hebrew: "לואיג'י רץ מהר", words: ["Luigi", "runs", "fast"] },
  { english: "I play Mario", hebrew: "אני משחק מריו", words: ["I", "play", "Mario"] },
  { english: "Koopa is a turtle", hebrew: "קופה הוא צב", words: ["Koopa", "is", "a", "turtle"] },
  
  // Sonic sentences
  { english: "Sonic runs fast", hebrew: "סוניק רץ מהר", words: ["Sonic", "runs", "fast"] },
  { english: "Tails can fly", hebrew: "טיילס יכול לעוף", words: ["Tails", "can", "fly"] },
  { english: "Knuckles is strong", hebrew: "נאקלס חזק", words: ["Knuckles", "is", "strong"] },
  { english: "Shadow is cool", hebrew: "שאדו מגניב", words: ["Shadow", "is", "cool"] },
  { english: "Sonic is blue", hebrew: "סוניק כחול", words: ["Sonic", "is", "blue"] },
  { english: "Sonic gets rings", hebrew: "סוניק אוסף טבעות", words: ["Sonic", "gets", "rings"] },
  { english: "Eggman is bad", hebrew: "אגמן רע", words: ["Eggman", "is", "bad"] },
  { english: "Tails is smart", hebrew: "טיילס חכם", words: ["Tails", "is", "smart"] },
  { english: "I like Sonic", hebrew: "אני אוהב סוניק", words: ["I", "like", "Sonic"] },
  { english: "Sonic is a hero", hebrew: "סוניק הוא גיבור", words: ["Sonic", "is", "a", "hero"] },
  
  // Paw Patrol sentences
  { english: "Chase helps pups", hebrew: "צ'ייס עוזר לגורים", words: ["Chase", "helps", "pups"] },
  { english: "Marshall is a dog", hebrew: "מרשל הוא כלב", words: ["Marshall", "is", "a", "dog"] },
  { english: "Skye can fly", hebrew: "סקיי יכולה לעוף", words: ["Skye", "can", "fly"] },
  { english: "Paw Patrol helps", hebrew: "מפרץ ההרפתקאות עוזר", words: ["Paw", "Patrol", "helps"] },
  { english: "Rubble digs fast", hebrew: "ראבל חופר מהר", words: ["Rubble", "digs", "fast"] },
  { english: "Rocky recycles", hebrew: "רוקי ממחזר", words: ["Rocky", "recycles"] },
  { english: "Zuma loves water", hebrew: "זומה אוהב מים", words: ["Zuma", "loves", "water"] },
  { english: "The pups are brave", hebrew: "הגורים אמיצים", words: ["The", "pups", "are", "brave"] },
  { english: "Ryder calls the pups", hebrew: "ריידר קורא לגורים", words: ["Ryder", "calls", "the", "pups"] },
  { english: "No job is too big", hebrew: "אין משימה גדולה מדי", words: ["No", "job", "is", "too", "big"] },
  
  // Soccer sentences
  { english: "I like soccer", hebrew: "אני אוהב כדורגל", words: ["I", "like", "soccer"] },
  { english: "Kick the ball", hebrew: "בעט בכדור", words: ["Kick", "the", "ball"] },
  { english: "We win the game", hebrew: "אנחנו מנצחים במשחק", words: ["We", "win", "the", "game"] },
  { english: "I play soccer", hebrew: "אני משחק כדורגל", words: ["I", "play", "soccer"] },
  { english: "Goal! We win!", hebrew: "גול! ניצחנו!", words: ["Goal!", "We", "win!"] },
  { english: "Pass the ball", hebrew: "העבר את הכדור", words: ["Pass", "the", "ball"] },
  { english: "The team plays well", hebrew: "הקבוצה משחקת טוב", words: ["The", "team", "plays", "well"] },
  { english: "The goalie saves", hebrew: "השוער מציל", words: ["The", "goalie", "saves"] },
  { english: "Run to the goal", hebrew: "רוץ לשער", words: ["Run", "to", "the", "goal"] },
  { english: "I score a goal", hebrew: "אני מבקיע שער", words: ["I", "score", "a", "goal"] },
  { english: "The referee blows", hebrew: "השופט שורק", words: ["The", "referee", "blows"] },
  { english: "We are champions", hebrew: "אנחנו אלופים", words: ["We", "are", "champions"] },
  { english: "Shoot the ball", hebrew: "בעט לשער", words: ["Shoot", "the", "ball"] },
  { english: "The match starts", hebrew: "המשחק מתחיל", words: ["The", "match", "starts"] },
  { english: "Great tackle", hebrew: "חטיפה מעולה", words: ["Great", "tackle"] },
  
  // Family sentences
  { english: "I love Mom", hebrew: "אני אוהב את אמא", words: ["I", "love", "Mom"] },
  { english: "Dad helps me", hebrew: "אבא עוזר לי", words: ["Dad", "helps", "me"] },
  { english: "My sister is nice", hebrew: "האחות שלי נחמדה", words: ["My", "sister", "is", "nice"] },
  { english: "My brother plays", hebrew: "האח שלי משחק", words: ["My", "brother", "plays"] },
  { english: "Grandma bakes cake", hebrew: "סבתא אופה עוגה", words: ["Grandma", "bakes", "cake"] },
  { english: "I love my family", hebrew: "אני אוהב את המשפחה שלי", words: ["I", "love", "my", "family"] },
  { english: "Baby is sleeping", hebrew: "התינוק ישן", words: ["Baby", "is", "sleeping"] },
  { english: "Grandpa tells stories", hebrew: "סבא מספר סיפורים", words: ["Grandpa", "tells", "stories"] },
  
  // Daily life sentences
  { english: "I am happy", hebrew: "אני שמח", words: ["I", "am", "happy"] },
  { english: "This is fun", hebrew: "זה כיף", words: ["This", "is", "fun"] },
  { english: "I love to play", hebrew: "אני אוהב לשחק", words: ["I", "love", "to", "play"] },
  { english: "You are awesome", hebrew: "אתה מדהים", words: ["You", "are", "awesome"] },
  { english: "I like to read", hebrew: "אני אוהב לקרוא", words: ["I", "like", "to", "read"] },
  { english: "The sun is hot", hebrew: "השמש חמה", words: ["The", "sun", "is", "hot"] },
  { english: "I am tired", hebrew: "אני עייף", words: ["I", "am", "tired"] },
  { english: "Good morning", hebrew: "בוקר טוב", words: ["Good", "morning"] },
  { english: "Good night", hebrew: "לילה טוב", words: ["Good", "night"] },
  { english: "I eat breakfast", hebrew: "אני אוכל ארוחת בוקר", words: ["I", "eat", "breakfast"] },
  { english: "Time to sleep", hebrew: "זמן לישון", words: ["Time", "to", "sleep"] },
  { english: "I go to school", hebrew: "אני הולך לבית ספר", words: ["I", "go", "to", "school"] },
  { english: "I have a pet", hebrew: "יש לי חיית מחמד", words: ["I", "have", "a", "pet"] },
  { english: "The dog runs", hebrew: "הכלב רץ", words: ["The", "dog", "runs"] },
  { english: "The cat sleeps", hebrew: "החתול ישן", words: ["The", "cat", "sleeps"] },
  { english: "Birds can fly", hebrew: "ציפורים יכולות לעוף", words: ["Birds", "can", "fly"] },
  { english: "I drink water", hebrew: "אני שותה מים", words: ["I", "drink", "water"] },
  { english: "It is raining", hebrew: "יורד גשם", words: ["It", "is", "raining"] },
  { english: "The sky is blue", hebrew: "השמיים כחולים", words: ["The", "sky", "is", "blue"] },
  { english: "I see a rainbow", hebrew: "אני רואה קשת", words: ["I", "see", "a", "rainbow"] },
];

// For backward compatibility
export const sentences = allSentences;

// Get random sentences
export const getRandomSentences = (count: number = 3): SentenceData[] => {
  return shuffleArray(allSentences).slice(0, count);
};

// ===== SPELLING WORDS (with difficulty levels) =====
export interface SpellingWord {
  english: string;
  hebrew: string;
  emoji: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = easiest (3-letter), 5 = hardest (8+ letters)
}

export const allSpellingWords: SpellingWord[] = [
  // Difficulty 1: 2-3 letters
  { english: "Go", hebrew: "ללכת", emoji: "🚶", difficulty: 1 },
  { english: "Up", hebrew: "למעלה", emoji: "⬆️", difficulty: 1 },
  { english: "No", hebrew: "לא", emoji: "❌", difficulty: 1 },
  { english: "On", hebrew: "על", emoji: "🔛", difficulty: 1 },
  { english: "In", hebrew: "בתוך", emoji: "📥", difficulty: 1 },
  { english: "Is", hebrew: "הוא", emoji: "=", difficulty: 1 },
  { english: "It", hebrew: "זה", emoji: "👆", difficulty: 1 },
  { english: "At", hebrew: "ב", emoji: "📍", difficulty: 1 },
  { english: "We", hebrew: "אנחנו", emoji: "👫", difficulty: 1 },
  { english: "He", hebrew: "הוא", emoji: "👦", difficulty: 1 },
  { english: "Me", hebrew: "אני", emoji: "👆", difficulty: 1 },
  { english: "Be", hebrew: "להיות", emoji: "✨", difficulty: 1 },
  { english: "Do", hebrew: "לעשות", emoji: "✅", difficulty: 1 },
  { english: "So", hebrew: "אז", emoji: "➡️", difficulty: 1 },
  { english: "To", hebrew: "ל", emoji: "➡️", difficulty: 1 },
  
  // Difficulty 2: 3-4 letters, easy words
  { english: "Cat", hebrew: "חתול", emoji: "🐱", difficulty: 2 },
  { english: "Dog", hebrew: "כלב", emoji: "🐕", difficulty: 2 },
  { english: "Run", hebrew: "לרוץ", emoji: "🏃", difficulty: 2 },
  { english: "Sun", hebrew: "שמש", emoji: "☀️", difficulty: 2 },
  { english: "Mom", hebrew: "אמא", emoji: "👩", difficulty: 2 },
  { english: "Dad", hebrew: "אבא", emoji: "👨", difficulty: 2 },
  { english: "Red", hebrew: "אדום", emoji: "🔴", difficulty: 2 },
  { english: "Hat", hebrew: "כובע", emoji: "🧢", difficulty: 2 },
  { english: "Cup", hebrew: "כוס", emoji: "🥤", difficulty: 2 },
  { english: "Bed", hebrew: "מיטה", emoji: "🛏️", difficulty: 2 },
  { english: "Box", hebrew: "קופסה", emoji: "📦", difficulty: 2 },
  { english: "Egg", hebrew: "ביצה", emoji: "🥚", difficulty: 2 },
  { english: "Pig", hebrew: "חזיר", emoji: "🐷", difficulty: 2 },
  { english: "Big", hebrew: "גדול", emoji: "🐘", difficulty: 2 },
  { english: "Hot", hebrew: "חם", emoji: "🥵", difficulty: 2 },
  { english: "Sad", hebrew: "עצוב", emoji: "😢", difficulty: 2 },
  { english: "Sit", hebrew: "לשבת", emoji: "🪑", difficulty: 2 },
  { english: "Win", hebrew: "לנצח", emoji: "🏆", difficulty: 2 },
  { english: "Bus", hebrew: "אוטובוס", emoji: "🚌", difficulty: 2 },
  { english: "Toy", hebrew: "צעצוע", emoji: "🧸", difficulty: 2 },
  
  // Difficulty 3: 4-5 letters
  { english: "Ball", hebrew: "כדור", emoji: "⚽", difficulty: 3 },
  { english: "Star", hebrew: "כוכב", emoji: "⭐", difficulty: 3 },
  { english: "Fish", hebrew: "דג", emoji: "🐟", difficulty: 3 },
  { english: "Bird", hebrew: "ציפור", emoji: "🐦", difficulty: 3 },
  { english: "Tree", hebrew: "עץ", emoji: "🌳", difficulty: 3 },
  { english: "Book", hebrew: "ספר", emoji: "📚", difficulty: 3 },
  { english: "Cake", hebrew: "עוגה", emoji: "🎂", difficulty: 3 },
  { english: "Duck", hebrew: "ברווז", emoji: "🦆", difficulty: 3 },
  { english: "Frog", hebrew: "צפרדע", emoji: "🐸", difficulty: 3 },
  { english: "Moon", hebrew: "ירח", emoji: "🌙", difficulty: 3 },
  { english: "Rain", hebrew: "גשם", emoji: "🌧️", difficulty: 3 },
  { english: "Snow", hebrew: "שלג", emoji: "❄️", difficulty: 3 },
  { english: "Jump", hebrew: "לקפוץ", emoji: "⬆️", difficulty: 3 },
  { english: "Play", hebrew: "לשחק", emoji: "🎮", difficulty: 3 },
  { english: "Blue", hebrew: "כחול", emoji: "🔵", difficulty: 3 },
  { english: "Pink", hebrew: "ורוד", emoji: "🩷", difficulty: 3 },
  { english: "Love", hebrew: "אהבה", emoji: "❤️", difficulty: 3 },
  { english: "Hand", hebrew: "יד", emoji: "✋", difficulty: 3 },
  { english: "Foot", hebrew: "רגל", emoji: "🦶", difficulty: 3 },
  { english: "Door", hebrew: "דלת", emoji: "🚪", difficulty: 3 },
  { english: "Home", hebrew: "בית", emoji: "🏠", difficulty: 3 },
  { english: "King", hebrew: "מלך", emoji: "👑", difficulty: 3 },
  { english: "Fire", hebrew: "אש", emoji: "🔥", difficulty: 3 },
  { english: "Milk", hebrew: "חלב", emoji: "🥛", difficulty: 3 },
  { english: "Goal", hebrew: "שער", emoji: "🥅", difficulty: 3 },
  { english: "Team", hebrew: "קבוצה", emoji: "👥", difficulty: 3 },
  { english: "Kick", hebrew: "בעיטה", emoji: "🦵", difficulty: 3 },
  
  // Difficulty 4: 5-6 letters
  { english: "Mario", hebrew: "מריו", emoji: "🍄", difficulty: 4 },
  { english: "Sonic", hebrew: "סוניק", emoji: "🦔", difficulty: 4 },
  { english: "Luigi", hebrew: "לואיג'י", emoji: "💚", difficulty: 4 },
  { english: "Chase", hebrew: "צ'ייס", emoji: "🐕", difficulty: 4 },
  { english: "Tails", hebrew: "טיילס", emoji: "🦊", difficulty: 4 },
  { english: "Apple", hebrew: "תפוח", emoji: "🍎", difficulty: 4 },
  { english: "Happy", hebrew: "שמח", emoji: "😊", difficulty: 4 },
  { english: "Green", hebrew: "ירוק", emoji: "🟢", difficulty: 4 },
  { english: "Water", hebrew: "מים", emoji: "💧", difficulty: 4 },
  { english: "House", hebrew: "בית", emoji: "🏠", difficulty: 4 },
  { english: "Candy", hebrew: "ממתק", emoji: "🍬", difficulty: 4 },
  { english: "Pizza", hebrew: "פיצה", emoji: "🍕", difficulty: 4 },
  { english: "Tiger", hebrew: "נמר", emoji: "🐯", difficulty: 4 },
  { english: "Horse", hebrew: "סוס", emoji: "🐴", difficulty: 4 },
  { english: "Queen", hebrew: "מלכה", emoji: "👸", difficulty: 4 },
  { english: "Robot", hebrew: "רובוט", emoji: "🤖", difficulty: 4 },
  { english: "Truck", hebrew: "משאית", emoji: "🚚", difficulty: 4 },
  { english: "Train", hebrew: "רכבת", emoji: "🚂", difficulty: 4 },
  { english: "Plane", hebrew: "מטוס", emoji: "✈️", difficulty: 4 },
  { english: "Shark", hebrew: "כריש", emoji: "🦈", difficulty: 4 },
  { english: "Beach", hebrew: "חוף", emoji: "🏖️", difficulty: 4 },
  { english: "Sunny", hebrew: "שמשי", emoji: "☀️", difficulty: 4 },
  { english: "Party", hebrew: "מסיבה", emoji: "🎉", difficulty: 4 },
  { english: "Story", hebrew: "סיפור", emoji: "📖", difficulty: 4 },
  { english: "Score", hebrew: "ניקוד", emoji: "🔢", difficulty: 4 },
  { english: "Coach", hebrew: "מאמן", emoji: "📋", difficulty: 4 },
  
  // Difficulty 5: 7+ letters
  { english: "Rainbow", hebrew: "קשת", emoji: "🌈", difficulty: 5 },
  { english: "Elephant", hebrew: "פיל", emoji: "🐘", difficulty: 5 },
  { english: "Butterfly", hebrew: "פרפר", emoji: "🦋", difficulty: 5 },
  { english: "Dinosaur", hebrew: "דינוזאור", emoji: "🦕", difficulty: 5 },
  { english: "Penguin", hebrew: "פינגווין", emoji: "🐧", difficulty: 5 },
  { english: "Dolphin", hebrew: "דולפין", emoji: "🐬", difficulty: 5 },
  { english: "Unicorn", hebrew: "חד קרן", emoji: "🦄", difficulty: 5 },
  { english: "Princess", hebrew: "נסיכה", emoji: "👸", difficulty: 5 },
  { english: "Champion", hebrew: "אלוף", emoji: "🏆", difficulty: 5 },
  { english: "Stadium", hebrew: "אצטדיון", emoji: "🏟️", difficulty: 5 },
  { english: "Referee", hebrew: "שופט", emoji: "👨‍⚖️", difficulty: 5 },
  { english: "Sandwich", hebrew: "כריך", emoji: "🥪", difficulty: 5 },
  { english: "Strawberry", hebrew: "תות", emoji: "🍓", difficulty: 5 },
  { english: "Helicopter", hebrew: "מסוק", emoji: "🚁", difficulty: 5 },
  { english: "Skateboard", hebrew: "סקייטבורד", emoji: "🛹", difficulty: 5 },
  { english: "Giraffe", hebrew: "ג'ירפה", emoji: "🦒", difficulty: 5 },
  { english: "Crocodile", hebrew: "תנין", emoji: "🐊", difficulty: 5 },
  { english: "Kangaroo", hebrew: "קנגורו", emoji: "🦘", difficulty: 5 },
  { english: "Octopus", hebrew: "תמנון", emoji: "🐙", difficulty: 5 },
  { english: "Jellyfish", hebrew: "מדוזה", emoji: "🪼", difficulty: 5 },
  { english: "Mushroom", hebrew: "פטריה", emoji: "🍄", difficulty: 5 },
  { english: "Pineapple", hebrew: "אננס", emoji: "🍍", difficulty: 5 },
  { english: "Chocolate", hebrew: "שוקולד", emoji: "🍫", difficulty: 5 },
  { english: "Broccoli", hebrew: "ברוקולי", emoji: "🥦", difficulty: 5 },
  { english: "Avocado", hebrew: "אבוקדו", emoji: "🥑", difficulty: 5 },
  { english: "Cucumber", hebrew: "מלפפון", emoji: "🥒", difficulty: 5 },
  { english: "Watermelon", hebrew: "אבטיח", emoji: "🍉", difficulty: 5 },
  { english: "Computer", hebrew: "מחשב", emoji: "💻", difficulty: 5 },
  { english: "Keyboard", hebrew: "מקלדת", emoji: "⌨️", difficulty: 5 },
  { english: "Television", hebrew: "טלוויזיה", emoji: "📺", difficulty: 5 },
  { english: "Telephone", hebrew: "טלפון", emoji: "📞", difficulty: 5 },
  { english: "Microphone", hebrew: "מיקרופון", emoji: "🎤", difficulty: 5 },
  { english: "Headphones", hebrew: "אוזניות", emoji: "🎧", difficulty: 5 },
  { english: "Flashlight", hebrew: "פנס", emoji: "🔦", difficulty: 5 },
  { english: "Backpack", hebrew: "תיק גב", emoji: "🎒", difficulty: 5 },
  { english: "Umbrella", hebrew: "מטריה", emoji: "☂️", difficulty: 5 },
  { english: "Sunglasses", hebrew: "משקפי שמש", emoji: "🕶️", difficulty: 5 },
  { english: "Fireworks", hebrew: "זיקוקים", emoji: "🎆", difficulty: 5 },
  { english: "Mountain", hebrew: "הר", emoji: "🏔️", difficulty: 5 },
  { english: "Volcano", hebrew: "הר געש", emoji: "🌋", difficulty: 5 },
  { english: "Snowflake", hebrew: "פתית שלג", emoji: "❄️", difficulty: 5 },
  { english: "Lightning", hebrew: "ברק", emoji: "⚡", difficulty: 5 },
  { english: "Treasure", hebrew: "אוצר", emoji: "💎", difficulty: 5 },
  { english: "Birthday", hebrew: "יום הולדת", emoji: "🎂", difficulty: 5 },
  { english: "Christmas", hebrew: "חג המולד", emoji: "🎄", difficulty: 5 },
  { english: "Hospital", hebrew: "בית חולים", emoji: "🏥", difficulty: 5 },
  { english: "Ambulance", hebrew: "אמבולנס", emoji: "🚑", difficulty: 5 },
  { english: "Firetruck", hebrew: "כבאית", emoji: "🚒", difficulty: 5 },
  { english: "Airplane", hebrew: "מטוס", emoji: "✈️", difficulty: 5 },
  { english: "Spaceship", hebrew: "חללית", emoji: "🚀", difficulty: 5 },
  { english: "Submarine", hebrew: "צוללת", emoji: "🛟", difficulty: 5 },
  { english: "Motorcycle", hebrew: "אופנוע", emoji: "🏍️", difficulty: 5 },
  { english: "Bicycle", hebrew: "אופניים", emoji: "🚲", difficulty: 5 },
  { english: "Telescope", hebrew: "טלסקופ", emoji: "🔭", difficulty: 5 },
  { english: "Microscope", hebrew: "מיקרוסקופ", emoji: "🔬", difficulty: 5 },
  { english: "Calendar", hebrew: "לוח שנה", emoji: "📅", difficulty: 5 },
  { english: "Notebook", hebrew: "מחברת", emoji: "📓", difficulty: 5 },
  { english: "Envelope", hebrew: "מעטפה", emoji: "✉️", difficulty: 5 },
  { english: "Scissors", hebrew: "מספריים", emoji: "✂️", difficulty: 5 },
  { english: "Cupcake", hebrew: "קאפקייק", emoji: "🧁", difficulty: 5 },
  { english: "Lollipop", hebrew: "סוכריה", emoji: "🍭", difficulty: 5 },
  { english: "Doughnut", hebrew: "סופגניה", emoji: "🍩", difficulty: 5 },
  { english: "Popcorn", hebrew: "פופקורן", emoji: "🍿", difficulty: 5 },
  { english: "Pancakes", hebrew: "פנקייק", emoji: "🥞", difficulty: 5 },
  { english: "Hamburger", hebrew: "המבורגר", emoji: "🍔", difficulty: 5 },
  { english: "Spaghetti", hebrew: "ספגטי", emoji: "🍝", difficulty: 5 },
  { english: "Croissant", hebrew: "קרואסון", emoji: "🥐", difficulty: 5 },
  { english: "Blueberry", hebrew: "אוכמניות", emoji: "🫐", difficulty: 5 },
  { english: "Astronaut", hebrew: "אסטרונאוט", emoji: "👨‍🚀", difficulty: 5 },
  { english: "Detective", hebrew: "בלש", emoji: "🕵️", difficulty: 5 },
  { english: "Superhero", hebrew: "גיבור על", emoji: "🦸", difficulty: 5 },
  { english: "Pirate", hebrew: "פיראט", emoji: "🏴‍☠️", difficulty: 5 },
  { english: "Cowboy", hebrew: "קאובוי", emoji: "🤠", difficulty: 5 },
  { english: "Mermaid", hebrew: "בת ים", emoji: "🧜‍♀️", difficulty: 5 },
  { english: "Wizard", hebrew: "קוסם", emoji: "🧙", difficulty: 5 },
  { english: "Dragon", hebrew: "דרקון", emoji: "🐉", difficulty: 5 },
  { english: "Monster", hebrew: "מפלצת", emoji: "👹", difficulty: 5 },
  { english: "Skeleton", hebrew: "שלד", emoji: "💀", difficulty: 5 },
  { english: "Vampire", hebrew: "ערפד", emoji: "🧛", difficulty: 5 },
  { english: "Pumpkin", hebrew: "דלעת", emoji: "🎃", difficulty: 5 },
  { english: "Snowman", hebrew: "איש שלג", emoji: "⛄", difficulty: 5 },
  { english: "Fountain", hebrew: "מזרקה", emoji: "⛲", difficulty: 5 },
  { english: "Carousel", hebrew: "קרוסלה", emoji: "🎠", difficulty: 5 },
  { english: "Rollercoaster", hebrew: "רכבת הרים", emoji: "🎢", difficulty: 5 },
  { english: "Trampoline", hebrew: "טרמפולינה", emoji: "🤸", difficulty: 5 },
  { english: "Playground", hebrew: "גן משחקים", emoji: "🛝", difficulty: 5 },
  { english: "Treehouse", hebrew: "בית עץ", emoji: "🏡", difficulty: 5 },
  { english: "Flamingo", hebrew: "פלמינגו", emoji: "🦩", difficulty: 5 },
  { english: "Peacock", hebrew: "טווס", emoji: "🦚", difficulty: 5 },
  { english: "Parrot", hebrew: "תוכי", emoji: "🦜", difficulty: 5 },
  { english: "Gorilla", hebrew: "גורילה", emoji: "🦍", difficulty: 5 },
  { english: "Leopard", hebrew: "נמר", emoji: "🐆", difficulty: 5 },
  { english: "Hamster", hebrew: "אוגר", emoji: "🐹", difficulty: 5 },
  { english: "Squirrel", hebrew: "סנאי", emoji: "🐿️", difficulty: 5 },
  { english: "Hedgehog", hebrew: "קיפוד", emoji: "🦔", difficulty: 5 },
  { english: "Caterpillar", hebrew: "זחל", emoji: "🐛", difficulty: 5 },
  { english: "Ladybug", hebrew: "חיפושית", emoji: "🐞", difficulty: 5 },
  { english: "Dragonfly", hebrew: "שפירית", emoji: "🪰", difficulty: 5 },
  { english: "Scorpion", hebrew: "עקרב", emoji: "🦂", difficulty: 5 },
  
  // Additional Easy words (2-4 letters)
  { english: "Hi", hebrew: "היי", emoji: "👋", difficulty: 1 },
  { english: "Bye", hebrew: "ביי", emoji: "👋", difficulty: 1 },
  { english: "Yes", hebrew: "כן", emoji: "✅", difficulty: 1 },
  { english: "Pen", hebrew: "עט", emoji: "🖊️", difficulty: 1 },
  { english: "Map", hebrew: "מפה", emoji: "🗺️", difficulty: 1 },
  { english: "Jam", hebrew: "ריבה", emoji: "🍯", difficulty: 1 },
  { english: "Bug", hebrew: "חרק", emoji: "🐛", difficulty: 1 },
  { english: "Hug", hebrew: "חיבוק", emoji: "🤗", difficulty: 1 },
  { english: "Mud", hebrew: "בוץ", emoji: "💩", difficulty: 1 },
  { english: "Jug", hebrew: "כד", emoji: "🏺", difficulty: 1 },
  { english: "Leg", hebrew: "רגל", emoji: "🦵", difficulty: 1 },
  { english: "Rug", hebrew: "שטיח", emoji: "🧶", difficulty: 1 },
  { english: "Pot", hebrew: "סיר", emoji: "🍲", difficulty: 1 },
  { english: "Pot", hebrew: "סיר", emoji: "🍲", difficulty: 1 },
  { english: "Top", hebrew: "למעלה", emoji: "🔝", difficulty: 1 },
  { english: "Mop", hebrew: "מגב", emoji: "🧹", difficulty: 1 },
  { english: "Net", hebrew: "רשת", emoji: "🥅", difficulty: 1 },
  { english: "Jet", hebrew: "מטוס", emoji: "✈️", difficulty: 1 },
  { english: "Wet", hebrew: "רטוב", emoji: "💧", difficulty: 1 },
  { english: "Bat", hebrew: "עטלף", emoji: "🦇", difficulty: 1 },
  { english: "Rat", hebrew: "חולדה", emoji: "🐀", difficulty: 1 },
  { english: "Van", hebrew: "טנדר", emoji: "🚐", difficulty: 1 },
  { english: "Fan", hebrew: "מאוורר", emoji: "🌀", difficulty: 1 },
  { english: "Pan", hebrew: "מחבת", emoji: "🍳", difficulty: 1 },
  { english: "Zip", hebrew: "רוכסן", emoji: "🤐", difficulty: 1 },
  
  // Additional Medium words (4-5 letters)
  { english: "Kite", hebrew: "עפיפון", emoji: "🪁", difficulty: 2 },
  { english: "Ship", hebrew: "ספינה", emoji: "🚢", difficulty: 2 },
  { english: "Gift", hebrew: "מתנה", emoji: "🎁", difficulty: 2 },
  { english: "Ring", hebrew: "טבעת", emoji: "💍", difficulty: 2 },
  { english: "Drum", hebrew: "תוף", emoji: "🥁", difficulty: 2 },
  { english: "Lamp", hebrew: "מנורה", emoji: "💡", difficulty: 2 },
  { english: "Coin", hebrew: "מטבע", emoji: "🪙", difficulty: 2 },
  { english: "Tent", hebrew: "אוהל", emoji: "⛺", difficulty: 2 },
  { english: "Bone", hebrew: "עצם", emoji: "🦴", difficulty: 2 },
  { english: "Leaf", hebrew: "עלה", emoji: "🍃", difficulty: 2 },
  { english: "Nest", hebrew: "קן", emoji: "🪹", difficulty: 2 },
  { english: "Wave", hebrew: "גל", emoji: "🌊", difficulty: 2 },
  { english: "Gold", hebrew: "זהב", emoji: "🥇", difficulty: 2 },
  { english: "Soap", hebrew: "סבון", emoji: "🧼", difficulty: 2 },
  { english: "Sock", hebrew: "גרב", emoji: "🧦", difficulty: 2 },
  { english: "Belt", hebrew: "חגורה", emoji: "👔", difficulty: 2 },
  { english: "Rope", hebrew: "חבל", emoji: "🪢", difficulty: 2 },
  { english: "Flag", hebrew: "דגל", emoji: "🚩", difficulty: 2 },
  { english: "Bean", hebrew: "שעועית", emoji: "🫘", difficulty: 2 },
  { english: "Seed", hebrew: "זרע", emoji: "🌱", difficulty: 2 },
  
  // Additional Hard words (4-5 letters)
  { english: "Lion", hebrew: "אריה", emoji: "🦁", difficulty: 3 },
  { english: "Wolf", hebrew: "זאב", emoji: "🐺", difficulty: 3 },
  { english: "Bear", hebrew: "דוב", emoji: "🐻", difficulty: 3 },
  { english: "Deer", hebrew: "צבי", emoji: "🦌", difficulty: 3 },
  { english: "Seal", hebrew: "כלב ים", emoji: "🦭", difficulty: 3 },
  { english: "Crab", hebrew: "סרטן", emoji: "🦀", difficulty: 3 },
  { english: "Swan", hebrew: "ברבור", emoji: "🦢", difficulty: 3 },
  { english: "Goat", hebrew: "עז", emoji: "🐐", difficulty: 3 },
  { english: "Pear", hebrew: "אגס", emoji: "🍐", difficulty: 3 },
  { english: "Corn", hebrew: "תירס", emoji: "🌽", difficulty: 3 },
  { english: "Drum", hebrew: "תוף", emoji: "🥁", difficulty: 3 },
  { english: "Harp", hebrew: "נבל", emoji: "🪕", difficulty: 3 },
  { english: "Bell", hebrew: "פעמון", emoji: "🔔", difficulty: 3 },
  { english: "Dice", hebrew: "קוביה", emoji: "🎲", difficulty: 3 },
  { english: "Mask", hebrew: "מסכה", emoji: "🎭", difficulty: 3 },
  { english: "Wand", hebrew: "שרביט", emoji: "🪄", difficulty: 3 },
  { english: "Sail", hebrew: "מפרש", emoji: "⛵", difficulty: 3 },
  { english: "Bike", hebrew: "אופניים", emoji: "🚴", difficulty: 3 },
  { english: "Taxi", hebrew: "מונית", emoji: "🚕", difficulty: 3 },
  { english: "Jeep", hebrew: "ג'יפ", emoji: "🚙", difficulty: 3 },
  
  // Additional Expert words (5-6 letters)
  { english: "Zebra", hebrew: "זברה", emoji: "🦓", difficulty: 4 },
  { english: "Camel", hebrew: "גמל", emoji: "🐫", difficulty: 4 },
  { english: "Koala", hebrew: "קואלה", emoji: "🐨", difficulty: 4 },
  { english: "Panda", hebrew: "פנדה", emoji: "🐼", difficulty: 4 },
  { english: "Whale", hebrew: "לוויתן", emoji: "🐋", difficulty: 4 },
  { english: "Eagle", hebrew: "נשר", emoji: "🦅", difficulty: 4 },
  { english: "Grape", hebrew: "ענב", emoji: "🍇", difficulty: 4 },
  { english: "Lemon", hebrew: "לימון", emoji: "🍋", difficulty: 4 },
  { english: "Mango", hebrew: "מנגו", emoji: "🥭", difficulty: 4 },
  { english: "Melon", hebrew: "מלון", emoji: "🍈", difficulty: 4 },
  { english: "Peach", hebrew: "אפרסק", emoji: "🍑", difficulty: 4 },
  { english: "Cherry", hebrew: "דובדבן", emoji: "🍒", difficulty: 4 },
  { english: "Carrot", hebrew: "גזר", emoji: "🥕", difficulty: 4 },
  { english: "Potato", hebrew: "תפוח אדמה", emoji: "🥔", difficulty: 4 },
  { english: "Onion", hebrew: "בצל", emoji: "🧅", difficulty: 4 },
  { english: "Crown", hebrew: "כתר", emoji: "👑", difficulty: 4 },
  { english: "Sword", hebrew: "חרב", emoji: "⚔️", difficulty: 4 },
  { english: "Shield", hebrew: "מגן", emoji: "🛡️", difficulty: 4 },
  { english: "Castle", hebrew: "טירה", emoji: "🏰", difficulty: 4 },
  { english: "Bridge", hebrew: "גשר", emoji: "🌉", difficulty: 4 },
];

// For backward compatibility
export const spellingWords: WordData[] = allSpellingWords.map(w => ({
  english: w.english,
  hebrew: w.hebrew,
  category: "Spelling",
  emoji: w.emoji,
}));

// Get spelling words by difficulty level with word length filtering
export const getSpellingWordsByDifficulty = (difficulty: number, count: number = 10): SpellingWord[] => {
  // Define word length ranges for each difficulty
  const lengthConfig: Record<number, { min: number; max: number }> = {
    1: { min: 2, max: 4 },  // Easy: 2-4 letters
    2: { min: 4, max: 5 },  // Medium: 4-5 letters
    3: { min: 4, max: 5 },  // Hard: 4-5 letters (2 missing)
    4: { min: 5, max: 6 },  // Expert: 5-6 letters
    5: { min: 7, max: 20 }, // Master: 7+ letters
  };
  
  const config = lengthConfig[difficulty] || lengthConfig[1];
  
  // Filter by word length (not by difficulty property)
  const filtered = allSpellingWords.filter(w => {
    const len = w.english.length;
    return len >= config.min && len <= config.max;
  });
  
  return shuffleArray(filtered).slice(0, count);
};

// ===== MATCHING GAME (images/emojis only, no Hebrew) =====
export const matchingPairs: { english: string; hebrew: string; emoji: string }[] = [
  // Characters
  { english: "Mario", hebrew: "מריו", emoji: "🍄" },
  { english: "Sonic", hebrew: "סוניק", emoji: "🦔" },
  { english: "Luigi", hebrew: "לואיג'י", emoji: "💚" },
  { english: "Tails", hebrew: "טיילס", emoji: "🦊" },
  { english: "Chase", hebrew: "צ'ייס", emoji: "🐕" },
  { english: "Yoshi", hebrew: "יושי", emoji: "🦎" },
  { english: "Peach", hebrew: "פיץ'", emoji: "👸" },
  { english: "Knuckles", hebrew: "נאקלס", emoji: "👊" },
  
  // Soccer
  { english: "Ball", hebrew: "כדור", emoji: "⚽" },
  { english: "Goal", hebrew: "שער", emoji: "🥅" },
  { english: "Trophy", hebrew: "גביע", emoji: "🏆" },
  { english: "Referee", hebrew: "שופט", emoji: "👨‍⚖️" },
  { english: "Whistle", hebrew: "משרוקית", emoji: "📣" },
  { english: "Jersey", hebrew: "חולצה", emoji: "👕" },
  
  // Animals
  { english: "Dog", hebrew: "כלב", emoji: "🐶" },
  { english: "Cat", hebrew: "חתול", emoji: "🐱" },
  { english: "Bird", hebrew: "ציפור", emoji: "🐦" },
  { english: "Fish", hebrew: "דג", emoji: "🐟" },
  { english: "Lion", hebrew: "אריה", emoji: "🦁" },
  { english: "Elephant", hebrew: "פיל", emoji: "🐘" },
  { english: "Monkey", hebrew: "קוף", emoji: "🐒" },
  { english: "Frog", hebrew: "צפרדע", emoji: "🐸" },
  { english: "Butterfly", hebrew: "פרפר", emoji: "🦋" },
  { english: "Turtle", hebrew: "צב", emoji: "🐢" },
  
  // Nature
  { english: "Sun", hebrew: "שמש", emoji: "☀️" },
  { english: "Moon", hebrew: "ירח", emoji: "🌙" },
  { english: "Star", hebrew: "כוכב", emoji: "⭐" },
  { english: "Rainbow", hebrew: "קשת", emoji: "🌈" },
  { english: "Tree", hebrew: "עץ", emoji: "🌳" },
  { english: "Flower", hebrew: "פרח", emoji: "🌸" },
  { english: "Fire", hebrew: "אש", emoji: "🔥" },
  { english: "Snow", hebrew: "שלג", emoji: "❄️" },
  
  // Food
  { english: "Apple", hebrew: "תפוח", emoji: "🍎" },
  { english: "Banana", hebrew: "בננה", emoji: "🍌" },
  { english: "Pizza", hebrew: "פיצה", emoji: "🍕" },
  { english: "Cake", hebrew: "עוגה", emoji: "🎂" },
  { english: "Ice cream", hebrew: "גלידה", emoji: "🍦" },
  { english: "Cookie", hebrew: "עוגיה", emoji: "🍪" },
  
  // Colors
  { english: "Red", hebrew: "אדום", emoji: "🔴" },
  { english: "Blue", hebrew: "כחול", emoji: "🔵" },
  { english: "Green", hebrew: "ירוק", emoji: "🟢" },
  { english: "Yellow", hebrew: "צהוב", emoji: "🟡" },
  { english: "Orange", hebrew: "כתום", emoji: "🟠" },
  { english: "Purple", hebrew: "סגול", emoji: "🟣" },
  
  // Objects
  { english: "Heart", hebrew: "לב", emoji: "❤️" },
  { english: "King", hebrew: "מלך", emoji: "👑" },
  { english: "Book", hebrew: "ספר", emoji: "📚" },
  { english: "Car", hebrew: "מכונית", emoji: "🚗" },
  { english: "House", hebrew: "בית", emoji: "🏠" },
  { english: "Robot", hebrew: "רובוט", emoji: "🤖" },
  { english: "Rocket", hebrew: "רקטה", emoji: "🚀" },
  { english: "Train", hebrew: "רכבת", emoji: "🚂" },
  
  // Family
  { english: "Mom", hebrew: "אמא", emoji: "👩" },
  { english: "Dad", hebrew: "אבא", emoji: "👨" },
  { english: "Baby", hebrew: "תינוק", emoji: "👶" },
  { english: "Grandma", hebrew: "סבתא", emoji: "👵" },
];

// Get random matching pairs
export const getRandomMatchingPairs = (count: number = 6): { english: string; hebrew: string; emoji: string }[] => {
  return shuffleArray(matchingPairs).slice(0, count);
};

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
  "Keep it up! 💪",
  "You're a star! ⭐",
  "Goal! ⚽",
];

export const getRandomEncouragement = () => {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};
