export interface LetterData {
  letter: string;
  words: { english: string; hebrew: string }[];
}

export interface WordData {
  english: string;
  hebrew: string;
  category: string;
}

export interface SentenceData {
  english: string;
  hebrew: string;
  words: string[];
}

export const letters: LetterData[] = [
  {
    letter: "A",
    words: [
      { english: "Apple", hebrew: "תפוח" },
      { english: "Ant", hebrew: "נמלה" },
      { english: "Awesome", hebrew: "מדהים" },
    ],
  },
  {
    letter: "B",
    words: [
      { english: "Ball", hebrew: "כדור" },
      { english: "Bowser", hebrew: "באוזר" },
      { english: "Blue", hebrew: "כחול" },
    ],
  },
  {
    letter: "C",
    words: [
      { english: "Chase", hebrew: "צ'ייס" },
      { english: "Cat", hebrew: "חתול" },
      { english: "Cool", hebrew: "מגניב" },
    ],
  },
  {
    letter: "D",
    words: [
      { english: "Donkey Kong", hebrew: "דונקי קונג" },
      { english: "Dog", hebrew: "כלב" },
      { english: "Daisy", hebrew: "דייזי" },
    ],
  },
  {
    letter: "E",
    words: [
      { english: "Eggman", hebrew: "אגמן" },
      { english: "Egg", hebrew: "ביצה" },
      { english: "Elf", hebrew: "שדון" },
    ],
  },
  {
    letter: "F",
    words: [
      { english: "Football", hebrew: "כדורגל" },
      { english: "Fast", hebrew: "מהיר" },
      { english: "Fun", hebrew: "כיף" },
    ],
  },
  {
    letter: "G",
    words: [
      { english: "Goomba", hebrew: "גומבה" },
      { english: "Goal", hebrew: "שער" },
      { english: "Green", hebrew: "ירוק" },
    ],
  },
  {
    letter: "H",
    words: [
      { english: "Happy", hebrew: "שמח" },
      { english: "Help", hebrew: "עזרה" },
      { english: "Hero", hebrew: "גיבור" },
    ],
  },
  {
    letter: "I",
    words: [
      { english: "I", hebrew: "אני" },
      { english: "Ice", hebrew: "קרח" },
      { english: "It", hebrew: "זה" },
    ],
  },
  {
    letter: "J",
    words: [
      { english: "Jump", hebrew: "קפיצה" },
      { english: "Junior", hebrew: "ג'וניור" },
      { english: "Jet", hebrew: "סילון" },
    ],
  },
  {
    letter: "K",
    words: [
      { english: "Knuckles", hebrew: "נאקלס" },
      { english: "Kick", hebrew: "בעיטה" },
      { english: "Koopa", hebrew: "קופה" },
    ],
  },
  {
    letter: "L",
    words: [
      { english: "Luigi", hebrew: "לואיג'י" },
      { english: "Like", hebrew: "אוהב" },
      { english: "Love", hebrew: "אהבה" },
    ],
  },
  {
    letter: "M",
    words: [
      { english: "Mario", hebrew: "מריו" },
      { english: "Marshall", hebrew: "מרשל" },
      { english: "Me", hebrew: "אני" },
    ],
  },
  {
    letter: "N",
    words: [
      { english: "Nice", hebrew: "נחמד" },
      { english: "No", hebrew: "לא" },
      { english: "New", hebrew: "חדש" },
    ],
  },
  {
    letter: "O",
    words: [
      { english: "Orange", hebrew: "כתום" },
      { english: "On", hebrew: "על" },
      { english: "Ok", hebrew: "בסדר" },
    ],
  },
  {
    letter: "P",
    words: [
      { english: "Peach", hebrew: "פיץ'" },
      { english: "Paw Patrol", hebrew: "מפרץ ההרפתקאות" },
      { english: "Play", hebrew: "לשחק" },
    ],
  },
  {
    letter: "Q",
    words: [
      { english: "Quick", hebrew: "מהיר" },
      { english: "Queen", hebrew: "מלכה" },
      { english: "Quiet", hebrew: "שקט" },
    ],
  },
  {
    letter: "R",
    words: [
      { english: "Run", hebrew: "לרוץ" },
      { english: "Rosalina", hebrew: "רוזלינה" },
      { english: "Red", hebrew: "אדום" },
    ],
  },
  {
    letter: "S",
    words: [
      { english: "Sonic", hebrew: "סוניק" },
      { english: "Soccer", hebrew: "כדורגל" },
      { english: "Smurf", hebrew: "דרדס" },
    ],
  },
  {
    letter: "T",
    words: [
      { english: "Tails", hebrew: "טיילס" },
      { english: "Toad", hebrew: "טואד" },
      { english: "Team", hebrew: "קבוצה" },
    ],
  },
  {
    letter: "U",
    words: [
      { english: "Up", hebrew: "למעלה" },
      { english: "Under", hebrew: "מתחת" },
      { english: "Us", hebrew: "אנחנו" },
    ],
  },
  {
    letter: "V",
    words: [
      { english: "Very", hebrew: "מאוד" },
      { english: "Victory", hebrew: "ניצחון" },
      { english: "Van", hebrew: "טנדר" },
    ],
  },
  {
    letter: "W",
    words: [
      { english: "Win", hebrew: "לנצח" },
      { english: "Water", hebrew: "מים" },
      { english: "Wow", hebrew: "וואו" },
    ],
  },
  {
    letter: "X",
    words: [
      { english: "X-ray", hebrew: "צילום רנטגן" },
      { english: "Box", hebrew: "קופסה" },
      { english: "Fox", hebrew: "שועל" },
    ],
  },
  {
    letter: "Y",
    words: [
      { english: "Yoshi", hebrew: "יושי" },
      { english: "Yes", hebrew: "כן" },
      { english: "Yellow", hebrew: "צהוב" },
    ],
  },
  {
    letter: "Z",
    words: [
      { english: "Zuma", hebrew: "זומה" },
      { english: "Zoom", hebrew: "זום" },
      { english: "Zero", hebrew: "אפס" },
    ],
  },
];

export const words: WordData[] = [
  // Mario characters
  { english: "Mario", hebrew: "מריו", category: "Mario" },
  { english: "Luigi", hebrew: "לואיג'י", category: "Mario" },
  { english: "Peach", hebrew: "פיץ'", category: "Mario" },
  { english: "Bowser", hebrew: "באוזר", category: "Mario" },
  { english: "Yoshi", hebrew: "יושי", category: "Mario" },
  { english: "Toad", hebrew: "טואד", category: "Mario" },
  { english: "Goomba", hebrew: "גומבה", category: "Mario" },
  { english: "Koopa", hebrew: "קופה", category: "Mario" },
  { english: "Rosalina", hebrew: "רוזלינה", category: "Mario" },
  { english: "Daisy", hebrew: "דייזי", category: "Mario" },

  // Sonic characters
  { english: "Sonic", hebrew: "סוניק", category: "Sonic" },
  { english: "Tails", hebrew: "טיילס", category: "Sonic" },
  { english: "Knuckles", hebrew: "נאקלס", category: "Sonic" },
  { english: "Shadow", hebrew: "שאדו", category: "Sonic" },
  { english: "Eggman", hebrew: "אגמן", category: "Sonic" },

  // Paw Patrol
  { english: "Chase", hebrew: "צ'ייס", category: "Paw Patrol" },
  { english: "Marshall", hebrew: "מרשל", category: "Paw Patrol" },
  { english: "Skye", hebrew: "סקיי", category: "Paw Patrol" },
  { english: "Rubble", hebrew: "ראבל", category: "Paw Patrol" },
  { english: "Rocky", hebrew: "רוקי", category: "Paw Patrol" },
  { english: "Zuma", hebrew: "זומה", category: "Paw Patrol" },

  // Smurfs
  { english: "Smurf", hebrew: "דרדס", category: "Smurfs" },
  { english: "Papa Smurf", hebrew: "דרדסבא", category: "Smurfs" },
  { english: "Smurfette", hebrew: "דרדסית", category: "Smurfs" },

  // Soccer/Football
  { english: "Ball", hebrew: "כדור", category: "Soccer" },
  { english: "Goal", hebrew: "שער", category: "Soccer" },
  { english: "Kick", hebrew: "בעיטה", category: "Soccer" },
  { english: "Team", hebrew: "קבוצה", category: "Soccer" },
  { english: "Win", hebrew: "לנצח", category: "Soccer" },
  { english: "Play", hebrew: "לשחק", category: "Soccer" },

  // Action words
  { english: "Jump", hebrew: "לקפוץ", category: "Actions" },
  { english: "Run", hebrew: "לרוץ", category: "Actions" },
  { english: "Fast", hebrew: "מהיר", category: "Actions" },
  { english: "Help", hebrew: "לעזור", category: "Actions" },
  { english: "Like", hebrew: "אוהב", category: "Actions" },
  { english: "Love", hebrew: "אהבה", category: "Actions" },

  // Colors
  { english: "Blue", hebrew: "כחול", category: "Colors" },
  { english: "Red", hebrew: "אדום", category: "Colors" },
  { english: "Green", hebrew: "ירוק", category: "Colors" },
  { english: "Yellow", hebrew: "צהוב", category: "Colors" },
  { english: "Orange", hebrew: "כתום", category: "Colors" },
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
