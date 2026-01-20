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
}

export interface SentenceData {
  english: string;
  hebrew: string;
  words: string[];
}

export const letters: LetterData[] = [
  {
    letter: "A",
    lowercase: "a",
    words: [
      { english: "Apple", hebrew: "תפוח" },
      { english: "Ant", hebrew: "נמלה" },
      { english: "Awesome", hebrew: "מדהים" },
      { english: "Arm", hebrew: "זרוע" },
      { english: "Animal", hebrew: "חיה" },
      { english: "Art", hebrew: "אומנות" },
      { english: "Astronaut", hebrew: "אסטרונאוט" },
      { english: "Airplane", hebrew: "מטוס" },
      { english: "Arrow", hebrew: "חץ" },
      { english: "Angry", hebrew: "כועס" },
    ],
  },
  {
    letter: "B",
    lowercase: "b",
    words: [
      { english: "Ball", hebrew: "כדור" },
      { english: "Bowser", hebrew: "באוזר" },
      { english: "Blue", hebrew: "כחול" },
      { english: "Banana", hebrew: "בננה" },
      { english: "Bird", hebrew: "ציפור" },
      { english: "Book", hebrew: "ספר" },
      { english: "Big", hebrew: "גדול" },
      { english: "Bear", hebrew: "דוב" },
      { english: "Butterfly", hebrew: "פרפר" },
      { english: "Baby", hebrew: "תינוק" },
    ],
  },
  {
    letter: "C",
    lowercase: "c",
    words: [
      { english: "Chase", hebrew: "צ'ייס" },
      { english: "Cat", hebrew: "חתול" },
      { english: "Cool", hebrew: "מגניב" },
      { english: "Car", hebrew: "מכונית" },
      { english: "Cake", hebrew: "עוגה" },
      { english: "Cloud", hebrew: "ענן" },
      { english: "Candy", hebrew: "סוכריה" },
      { english: "Circle", hebrew: "עיגול" },
      { english: "Coin", hebrew: "מטבע" },
      { english: "Castle", hebrew: "טירה" },
    ],
  },
  {
    letter: "D",
    lowercase: "d",
    words: [
      { english: "Donkey Kong", hebrew: "דונקי קונג" },
      { english: "Dog", hebrew: "כלב" },
      { english: "Daisy", hebrew: "דייזי" },
      { english: "Duck", hebrew: "ברווז" },
      { english: "Door", hebrew: "דלת" },
      { english: "Diamond", hebrew: "יהלום" },
      { english: "Dinosaur", hebrew: "דינוזאור" },
      { english: "Drum", hebrew: "תוף" },
      { english: "Dragon", hebrew: "דרקון" },
      { english: "Dance", hebrew: "לרקוד" },
    ],
  },
  {
    letter: "E",
    lowercase: "e",
    words: [
      { english: "Eggman", hebrew: "אגמן" },
      { english: "Egg", hebrew: "ביצה" },
      { english: "Elf", hebrew: "שדון" },
      { english: "Elephant", hebrew: "פיל" },
      { english: "Eye", hebrew: "עין" },
      { english: "Ear", hebrew: "אוזן" },
      { english: "Earth", hebrew: "כדור הארץ" },
      { english: "Energy", hebrew: "אנרגיה" },
      { english: "Eagle", hebrew: "נשר" },
      { english: "Emerald", hebrew: "אמרלד" },
    ],
  },
  {
    letter: "F",
    lowercase: "f",
    words: [
      { english: "Football", hebrew: "כדורגל" },
      { english: "Fast", hebrew: "מהיר" },
      { english: "Fun", hebrew: "כיף" },
      { english: "Fish", hebrew: "דג" },
      { english: "Flower", hebrew: "פרח" },
      { english: "Friend", hebrew: "חבר" },
      { english: "Fire", hebrew: "אש" },
      { english: "Frog", hebrew: "צפרדע" },
      { english: "Fly", hebrew: "לעוף" },
      { english: "Fox", hebrew: "שועל" },
    ],
  },
  {
    letter: "G",
    lowercase: "g",
    words: [
      { english: "Goomba", hebrew: "גומבה" },
      { english: "Goal", hebrew: "שער" },
      { english: "Green", hebrew: "ירוק" },
      { english: "Game", hebrew: "משחק" },
      { english: "Gold", hebrew: "זהב" },
      { english: "Grass", hebrew: "דשא" },
      { english: "Grape", hebrew: "ענב" },
      { english: "Giant", hebrew: "ענק" },
      { english: "Guitar", hebrew: "גיטרה" },
      { english: "Girl", hebrew: "ילדה" },
    ],
  },
  {
    letter: "H",
    lowercase: "h",
    words: [
      { english: "Happy", hebrew: "שמח" },
      { english: "Help", hebrew: "עזרה" },
      { english: "Hero", hebrew: "גיבור" },
      { english: "Hat", hebrew: "כובע" },
      { english: "Heart", hebrew: "לב" },
      { english: "House", hebrew: "בית" },
      { english: "Horse", hebrew: "סוס" },
      { english: "Hand", hebrew: "יד" },
      { english: "Hot", hebrew: "חם" },
      { english: "Honey", hebrew: "דבש" },
    ],
  },
  {
    letter: "I",
    lowercase: "i",
    words: [
      { english: "I", hebrew: "אני" },
      { english: "Ice", hebrew: "קרח" },
      { english: "It", hebrew: "זה" },
      { english: "Island", hebrew: "אי" },
      { english: "Ice cream", hebrew: "גלידה" },
      { english: "Idea", hebrew: "רעיון" },
      { english: "Insect", hebrew: "חרק" },
      { english: "Igloo", hebrew: "איגלו" },
      { english: "Ink", hebrew: "דיו" },
      { english: "Iron", hebrew: "ברזל" },
    ],
  },
  {
    letter: "J",
    lowercase: "j",
    words: [
      { english: "Jump", hebrew: "קפיצה" },
      { english: "Junior", hebrew: "ג'וניור" },
      { english: "Jet", hebrew: "סילון" },
      { english: "Juice", hebrew: "מיץ" },
      { english: "Jungle", hebrew: "ג'ונגל" },
      { english: "Jam", hebrew: "ריבה" },
      { english: "Jelly", hebrew: "ג'לי" },
      { english: "Jewel", hebrew: "תכשיט" },
      { english: "Jacket", hebrew: "ז'קט" },
      { english: "Joy", hebrew: "שמחה" },
    ],
  },
  {
    letter: "K",
    lowercase: "k",
    words: [
      { english: "Knuckles", hebrew: "נאקלס" },
      { english: "Kick", hebrew: "בעיטה" },
      { english: "Koopa", hebrew: "קופה" },
      { english: "King", hebrew: "מלך" },
      { english: "Kite", hebrew: "עפיפון" },
      { english: "Key", hebrew: "מפתח" },
      { english: "Kangaroo", hebrew: "קנגורו" },
      { english: "Kitchen", hebrew: "מטבח" },
      { english: "Kitten", hebrew: "חתלתול" },
      { english: "Knight", hebrew: "אביר" },
    ],
  },
  {
    letter: "L",
    lowercase: "l",
    words: [
      { english: "Luigi", hebrew: "לואיג'י" },
      { english: "Like", hebrew: "אוהב" },
      { english: "Love", hebrew: "אהבה" },
      { english: "Lion", hebrew: "אריה" },
      { english: "Lemon", hebrew: "לימון" },
      { english: "Light", hebrew: "אור" },
      { english: "Leaf", hebrew: "עלה" },
      { english: "Lamp", hebrew: "מנורה" },
      { english: "Leg", hebrew: "רגל" },
      { english: "Lucky", hebrew: "בר מזל" },
    ],
  },
  {
    letter: "M",
    lowercase: "m",
    words: [
      { english: "Mario", hebrew: "מריו" },
      { english: "Marshall", hebrew: "מרשל" },
      { english: "Me", hebrew: "אני" },
      { english: "Moon", hebrew: "ירח" },
      { english: "Monkey", hebrew: "קוף" },
      { english: "Music", hebrew: "מוזיקה" },
      { english: "Magic", hebrew: "קסם" },
      { english: "Milk", hebrew: "חלב" },
      { english: "Mountain", hebrew: "הר" },
      { english: "Mushroom", hebrew: "פטריה" },
    ],
  },
  {
    letter: "N",
    lowercase: "n",
    words: [
      { english: "Nice", hebrew: "נחמד" },
      { english: "No", hebrew: "לא" },
      { english: "New", hebrew: "חדש" },
      { english: "Nose", hebrew: "אף" },
      { english: "Night", hebrew: "לילה" },
      { english: "Ninja", hebrew: "נינג'ה" },
      { english: "Nest", hebrew: "קן" },
      { english: "Number", hebrew: "מספר" },
      { english: "Name", hebrew: "שם" },
      { english: "Net", hebrew: "רשת" },
    ],
  },
  {
    letter: "O",
    lowercase: "o",
    words: [
      { english: "Orange", hebrew: "כתום" },
      { english: "On", hebrew: "על" },
      { english: "Ok", hebrew: "בסדר" },
      { english: "Ocean", hebrew: "אוקיינוס" },
      { english: "Owl", hebrew: "ינשוף" },
      { english: "Open", hebrew: "פתוח" },
      { english: "Octopus", hebrew: "תמנון" },
      { english: "One", hebrew: "אחד" },
      { english: "Olive", hebrew: "זית" },
      { english: "Onion", hebrew: "בצל" },
    ],
  },
  {
    letter: "P",
    lowercase: "p",
    words: [
      { english: "Peach", hebrew: "פיץ'" },
      { english: "Paw Patrol", hebrew: "מפרץ ההרפתקאות" },
      { english: "Play", hebrew: "לשחק" },
      { english: "Pizza", hebrew: "פיצה" },
      { english: "Pirate", hebrew: "פיראט" },
      { english: "Planet", hebrew: "כוכב לכת" },
      { english: "Puzzle", hebrew: "פאזל" },
      { english: "Penguin", hebrew: "פינגווין" },
      { english: "Power", hebrew: "כוח" },
      { english: "Princess", hebrew: "נסיכה" },
    ],
  },
  {
    letter: "Q",
    lowercase: "q",
    words: [
      { english: "Quick", hebrew: "מהיר" },
      { english: "Queen", hebrew: "מלכה" },
      { english: "Quiet", hebrew: "שקט" },
      { english: "Question", hebrew: "שאלה" },
      { english: "Quilt", hebrew: "שמיכה" },
      { english: "Quack", hebrew: "קוואק" },
      { english: "Quest", hebrew: "מסע" },
      { english: "Quite", hebrew: "די" },
      { english: "Quiz", hebrew: "חידון" },
      { english: "Quarter", hebrew: "רבע" },
    ],
  },
  {
    letter: "R",
    lowercase: "r",
    words: [
      { english: "Run", hebrew: "לרוץ" },
      { english: "Rosalina", hebrew: "רוזלינה" },
      { english: "Red", hebrew: "אדום" },
      { english: "Rainbow", hebrew: "קשת" },
      { english: "Robot", hebrew: "רובוט" },
      { english: "Ring", hebrew: "טבעת" },
      { english: "Rocket", hebrew: "רקטה" },
      { english: "Rocky", hebrew: "רוקי" },
      { english: "Rain", hebrew: "גשם" },
      { english: "Race", hebrew: "מרוץ" },
    ],
  },
  {
    letter: "S",
    lowercase: "s",
    words: [
      { english: "Sonic", hebrew: "סוניק" },
      { english: "Soccer", hebrew: "כדורגל" },
      { english: "Smurf", hebrew: "דרדס" },
      { english: "Star", hebrew: "כוכב" },
      { english: "Sun", hebrew: "שמש" },
      { english: "Skye", hebrew: "סקיי" },
      { english: "Shadow", hebrew: "שאדו" },
      { english: "Super", hebrew: "סופר" },
      { english: "Speed", hebrew: "מהירות" },
      { english: "Smile", hebrew: "חיוך" },
    ],
  },
  {
    letter: "T",
    lowercase: "t",
    words: [
      { english: "Tails", hebrew: "טיילס" },
      { english: "Toad", hebrew: "טואד" },
      { english: "Team", hebrew: "קבוצה" },
      { english: "Tiger", hebrew: "נמר" },
      { english: "Tree", hebrew: "עץ" },
      { english: "Train", hebrew: "רכבת" },
      { english: "Treasure", hebrew: "אוצר" },
      { english: "Truck", hebrew: "משאית" },
      { english: "Turtle", hebrew: "צב" },
      { english: "Trophy", hebrew: "גביע" },
    ],
  },
  {
    letter: "U",
    lowercase: "u",
    words: [
      { english: "Up", hebrew: "למעלה" },
      { english: "Under", hebrew: "מתחת" },
      { english: "Us", hebrew: "אנחנו" },
      { english: "Umbrella", hebrew: "מטריה" },
      { english: "Unicorn", hebrew: "חד קרן" },
      { english: "Uniform", hebrew: "מדים" },
      { english: "Uncle", hebrew: "דוד" },
      { english: "Unit", hebrew: "יחידה" },
      { english: "Universe", hebrew: "יקום" },
      { english: "Use", hebrew: "להשתמש" },
    ],
  },
  {
    letter: "V",
    lowercase: "v",
    words: [
      { english: "Very", hebrew: "מאוד" },
      { english: "Victory", hebrew: "ניצחון" },
      { english: "Van", hebrew: "טנדר" },
      { english: "Volcano", hebrew: "הר געש" },
      { english: "Violin", hebrew: "כינור" },
      { english: "Vegetable", hebrew: "ירק" },
      { english: "Village", hebrew: "כפר" },
      { english: "Voice", hebrew: "קול" },
      { english: "Visit", hebrew: "לבקר" },
      { english: "Vest", hebrew: "אפוד" },
    ],
  },
  {
    letter: "W",
    lowercase: "w",
    words: [
      { english: "Win", hebrew: "לנצח" },
      { english: "Water", hebrew: "מים" },
      { english: "Wow", hebrew: "וואו" },
      { english: "World", hebrew: "עולם" },
      { english: "Wolf", hebrew: "זאב" },
      { english: "Wizard", hebrew: "קוסם" },
      { english: "Wheel", hebrew: "גלגל" },
      { english: "Wind", hebrew: "רוח" },
      { english: "Winter", hebrew: "חורף" },
      { english: "Watch", hebrew: "שעון" },
    ],
  },
  {
    letter: "X",
    lowercase: "x",
    words: [
      { english: "X-ray", hebrew: "צילום רנטגן" },
      { english: "Box", hebrew: "קופסה" },
      { english: "Fox", hebrew: "שועל" },
      { english: "Mix", hebrew: "לערבב" },
      { english: "Six", hebrew: "שש" },
      { english: "Wax", hebrew: "שעווה" },
      { english: "Max", hebrew: "מקס" },
      { english: "Hex", hebrew: "קסם" },
      { english: "Taxi", hebrew: "מונית" },
      { english: "Rex", hebrew: "רקס" },
    ],
  },
  {
    letter: "Y",
    lowercase: "y",
    words: [
      { english: "Yoshi", hebrew: "יושי" },
      { english: "Yes", hebrew: "כן" },
      { english: "Yellow", hebrew: "צהוב" },
      { english: "Yummy", hebrew: "טעים" },
      { english: "Yoga", hebrew: "יוגה" },
      { english: "Yo-yo", hebrew: "יויו" },
      { english: "Year", hebrew: "שנה" },
      { english: "Young", hebrew: "צעיר" },
      { english: "Yard", hebrew: "חצר" },
      { english: "Yawn", hebrew: "פיהוק" },
    ],
  },
  {
    letter: "Z",
    lowercase: "z",
    words: [
      { english: "Zuma", hebrew: "זומה" },
      { english: "Zoom", hebrew: "זום" },
      { english: "Zero", hebrew: "אפס" },
      { english: "Zebra", hebrew: "זברה" },
      { english: "Zigzag", hebrew: "זיגזג" },
      { english: "Zoo", hebrew: "גן חיות" },
      { english: "Zombie", hebrew: "זומבי" },
      { english: "Zap", hebrew: "להכות" },
      { english: "Zone", hebrew: "אזור" },
      { english: "Zip", hebrew: "רוכסן" },
    ],
  },
];

export const words: WordData[] = [
  // Mario characters
  { english: "Mario", hebrew: "מריו", category: "Mario", emoji: "🍄" },
  { english: "Luigi", hebrew: "לואיג'י", category: "Mario", emoji: "💚" },
  { english: "Peach", hebrew: "פיץ'", category: "Mario", emoji: "👸" },
  { english: "Bowser", hebrew: "באוזר", category: "Mario", emoji: "🐢" },
  { english: "Yoshi", hebrew: "יושי", category: "Mario", emoji: "🦎" },
  { english: "Toad", hebrew: "טואד", category: "Mario", emoji: "🍄" },
  { english: "Goomba", hebrew: "גומבה", category: "Mario", emoji: "🟤" },
  { english: "Koopa", hebrew: "קופה", category: "Mario", emoji: "🐢" },
  { english: "Rosalina", hebrew: "רוזלינה", category: "Mario", emoji: "⭐" },
  { english: "Daisy", hebrew: "דייזי", category: "Mario", emoji: "🌼" },

  // Sonic characters
  { english: "Sonic", hebrew: "סוניק", category: "Sonic", emoji: "🦔" },
  { english: "Tails", hebrew: "טיילס", category: "Sonic", emoji: "🦊" },
  { english: "Knuckles", hebrew: "נאקלס", category: "Sonic", emoji: "👊" },
  { english: "Shadow", hebrew: "שאדו", category: "Sonic", emoji: "🖤" },
  { english: "Eggman", hebrew: "אגמן", category: "Sonic", emoji: "🥚" },

  // Paw Patrol
  { english: "Chase", hebrew: "צ'ייס", category: "Paw Patrol", emoji: "🐕" },
  { english: "Marshall", hebrew: "מרשל", category: "Paw Patrol", emoji: "🚒" },
  { english: "Skye", hebrew: "סקיי", category: "Paw Patrol", emoji: "🚁" },
  { english: "Rubble", hebrew: "ראבל", category: "Paw Patrol", emoji: "🚜" },
  { english: "Rocky", hebrew: "רוקי", category: "Paw Patrol", emoji: "♻️" },
  { english: "Zuma", hebrew: "זומה", category: "Paw Patrol", emoji: "🌊" },

  // Smurfs
  { english: "Smurf", hebrew: "דרדס", category: "Smurfs", emoji: "🔵" },
  { english: "Papa Smurf", hebrew: "דרדסבא", category: "Smurfs", emoji: "🧙" },
  { english: "Smurfette", hebrew: "דרדסית", category: "Smurfs", emoji: "💛" },

  // Soccer/Football
  { english: "Ball", hebrew: "כדור", category: "Soccer", emoji: "⚽" },
  { english: "Goal", hebrew: "שער", category: "Soccer", emoji: "🥅" },
  { english: "Kick", hebrew: "בעיטה", category: "Soccer", emoji: "🦵" },
  { english: "Team", hebrew: "קבוצה", category: "Soccer", emoji: "👥" },
  { english: "Win", hebrew: "לנצח", category: "Soccer", emoji: "🏆" },
  { english: "Play", hebrew: "לשחק", category: "Soccer", emoji: "🎮" },

  // Action words
  { english: "Jump", hebrew: "לקפוץ", category: "Actions", emoji: "⬆️" },
  { english: "Run", hebrew: "לרוץ", category: "Actions", emoji: "🏃" },
  { english: "Fast", hebrew: "מהיר", category: "Actions", emoji: "💨" },
  { english: "Help", hebrew: "לעזור", category: "Actions", emoji: "🤝" },
  { english: "Like", hebrew: "אוהב", category: "Actions", emoji: "👍" },
  { english: "Love", hebrew: "אהבה", category: "Actions", emoji: "❤️" },

  // Colors
  { english: "Blue", hebrew: "כחול", category: "Colors", emoji: "🔵" },
  { english: "Red", hebrew: "אדום", category: "Colors", emoji: "🔴" },
  { english: "Green", hebrew: "ירוק", category: "Colors", emoji: "🟢" },
  { english: "Yellow", hebrew: "צהוב", category: "Colors", emoji: "🟡" },
  { english: "Orange", hebrew: "כתום", category: "Colors", emoji: "🟠" },
];

export const sentences: SentenceData[] = [
  // Mario sentences
  {
    english: "Mario jumps",
    hebrew: "מריו קופץ",
    words: ["Mario", "jumps"],
  },
  {
    english: "Luigi is green",
    hebrew: "לואיג'י ירוק",
    words: ["Luigi", "is", "green"],
  },
  {
    english: "Peach is a princess",
    hebrew: "פיץ' היא נסיכה",
    words: ["Peach", "is", "a", "princess"],
  },
  {
    english: "Bowser is big",
    hebrew: "באוזר גדול",
    words: ["Bowser", "is", "big"],
  },
  {
    english: "Yoshi eats fruit",
    hebrew: "יושי אוכל פרי",
    words: ["Yoshi", "eats", "fruit"],
  },
  {
    english: "Toad helps Mario",
    hebrew: "טואד עוזר למריו",
    words: ["Toad", "helps", "Mario"],
  },

  // Sonic sentences
  {
    english: "Sonic runs fast",
    hebrew: "סוניק רץ מהר",
    words: ["Sonic", "runs", "fast"],
  },
  {
    english: "Tails can fly",
    hebrew: "טיילס יכול לעוף",
    words: ["Tails", "can", "fly"],
  },
  {
    english: "Knuckles is strong",
    hebrew: "נאקלס חזק",
    words: ["Knuckles", "is", "strong"],
  },
  {
    english: "Shadow is cool",
    hebrew: "שאדו מגניב",
    words: ["Shadow", "is", "cool"],
  },
  {
    english: "Sonic is blue",
    hebrew: "סוניק כחול",
    words: ["Sonic", "is", "blue"],
  },

  // Paw Patrol sentences
  {
    english: "Chase helps pups",
    hebrew: "צ'ייס עוזר לגורים",
    words: ["Chase", "helps", "pups"],
  },
  {
    english: "Marshall is a dog",
    hebrew: "מרשל הוא כלב",
    words: ["Marshall", "is", "a", "dog"],
  },
  {
    english: "Skye can fly",
    hebrew: "סקיי יכולה לעוף",
    words: ["Skye", "can", "fly"],
  },
  {
    english: "Paw Patrol helps",
    hebrew: "מפרץ ההרפתקאות עוזר",
    words: ["Paw", "Patrol", "helps"],
  },

  // Smurfs sentences
  {
    english: "Smurf is blue",
    hebrew: "דרדס כחול",
    words: ["Smurf", "is", "blue"],
  },
  {
    english: "Papa Smurf is wise",
    hebrew: "דרדסבא חכם",
    words: ["Papa", "Smurf", "is", "wise"],
  },
  {
    english: "Smurfs are small",
    hebrew: "הדרדסים קטנים",
    words: ["Smurfs", "are", "small"],
  },

  // Soccer sentences
  {
    english: "I like soccer",
    hebrew: "אני אוהב כדורגל",
    words: ["I", "like", "soccer"],
  },
  {
    english: "Kick the ball",
    hebrew: "בעט בכדור",
    words: ["Kick", "the", "ball"],
  },
  {
    english: "We win the game",
    hebrew: "אנחנו מנצחים במשחק",
    words: ["We", "win", "the", "game"],
  },
  {
    english: "I play soccer",
    hebrew: "אני משחק כדורגל",
    words: ["I", "play", "soccer"],
  },
  {
    english: "Goal! We win!",
    hebrew: "גול! ניצחנו!",
    words: ["Goal!", "We", "win!"],
  },

  // Simple sentences
  {
    english: "I am happy",
    hebrew: "אני שמח",
    words: ["I", "am", "happy"],
  },
  {
    english: "This is fun",
    hebrew: "זה כיף",
    words: ["This", "is", "fun"],
  },
  {
    english: "I love to play",
    hebrew: "אני אוהב לשחק",
    words: ["I", "love", "to", "play"],
  },
  {
    english: "You are awesome",
    hebrew: "אתה מדהים",
    words: ["You", "are", "awesome"],
  },
];

// Simple words for spelling game (3-5 letters)
export const spellingWords: WordData[] = [
  { english: "Cat", hebrew: "חתול", category: "Animals", emoji: "🐱" },
  { english: "Dog", hebrew: "כלב", category: "Animals", emoji: "🐕" },
  { english: "Ball", hebrew: "כדור", category: "Sports", emoji: "⚽" },
  { english: "Run", hebrew: "לרוץ", category: "Actions", emoji: "🏃" },
  { english: "Jump", hebrew: "לקפוץ", category: "Actions", emoji: "⬆️" },
  { english: "Red", hebrew: "אדום", category: "Colors", emoji: "🔴" },
  { english: "Blue", hebrew: "כחול", category: "Colors", emoji: "🔵" },
  { english: "Sun", hebrew: "שמש", category: "Nature", emoji: "☀️" },
  { english: "Star", hebrew: "כוכב", category: "Nature", emoji: "⭐" },
  { english: "Fish", hebrew: "דג", category: "Animals", emoji: "🐟" },
  { english: "Bird", hebrew: "ציפור", category: "Animals", emoji: "🐦" },
  { english: "Tree", hebrew: "עץ", category: "Nature", emoji: "🌳" },
  { english: "Book", hebrew: "ספר", category: "Things", emoji: "📚" },
  { english: "Hat", hebrew: "כובע", category: "Things", emoji: "🎩" },
  { english: "Cake", hebrew: "עוגה", category: "Food", emoji: "🎂" },
  { english: "Milk", hebrew: "חלב", category: "Food", emoji: "🥛" },
  { english: "Frog", hebrew: "צפרדע", category: "Animals", emoji: "🐸" },
  { english: "Duck", hebrew: "ברווז", category: "Animals", emoji: "🦆" },
  { english: "Moon", hebrew: "ירח", category: "Nature", emoji: "🌙" },
  { english: "Love", hebrew: "אהבה", category: "Feelings", emoji: "❤️" },
];

// Matching game pairs
export const matchingPairs: { english: string; hebrew: string; emoji: string }[] = [
  { english: "Mario", hebrew: "מריו", emoji: "🍄" },
  { english: "Sonic", hebrew: "סוניק", emoji: "🦔" },
  { english: "Luigi", hebrew: "לואיג'י", emoji: "💚" },
  { english: "Tails", hebrew: "טיילס", emoji: "🦊" },
  { english: "Chase", hebrew: "צ'ייס", emoji: "🐕" },
  { english: "Smurf", hebrew: "דרדס", emoji: "🔵" },
  { english: "Ball", hebrew: "כדור", emoji: "⚽" },
  { english: "Star", hebrew: "כוכב", emoji: "⭐" },
  { english: "Dog", hebrew: "כלב", emoji: "🐶" },
  { english: "Cat", hebrew: "חתול", emoji: "🐱" },
  { english: "Sun", hebrew: "שמש", emoji: "☀️" },
  { english: "Moon", hebrew: "ירח", emoji: "🌙" },
  { english: "Red", hebrew: "אדום", emoji: "🔴" },
  { english: "Blue", hebrew: "כחול", emoji: "🔵" },
  { english: "Green", hebrew: "ירוק", emoji: "🟢" },
  { english: "Yellow", hebrew: "צהוב", emoji: "🟡" },
  { english: "Heart", hebrew: "לב", emoji: "❤️" },
  { english: "King", hebrew: "מלך", emoji: "👑" },
  { english: "Fish", hebrew: "דג", emoji: "🐟" },
  { english: "Bird", hebrew: "ציפור", emoji: "🐦" },
];

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
];

export const getRandomEncouragement = () => {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};
