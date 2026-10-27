// Difficulty rules for Listen & Pick and Sentence Builder
export type ThreeLevel = 1 | 2 | 3;

export interface ListenConfig {
  label: string;
  options: number;
  maxDifficulty: number;
  /** true = distractors from same category, false = other categories, null = any */
  sameCategory: boolean | null;
}

export const getListenConfig = (level: ThreeLevel): ListenConfig => {
  switch (level) {
    case 2: return { label: "Medium", options: 4, maxDifficulty: 3, sameCategory: null };
    case 3: return { label: "Hard", options: 6, maxDifficulty: 5, sameCategory: true };
    default: return { label: "Easy", options: 3, maxDifficulty: 2, sameCategory: false };
  }
};

export interface BuilderConfig {
  label: string;
  sentenceLength: number;
  prefillFirst: boolean;
  extraTiles: number;
  showPictures: boolean;
}

export const getBuilderConfig = (level: ThreeLevel): BuilderConfig => {
  switch (level) {
    case 2: return { label: "Medium", sentenceLength: 4, prefillFirst: true, extraTiles: 0, showPictures: true };
    case 3: return { label: "Hard", sentenceLength: 5, prefillFirst: false, extraTiles: 2, showPictures: false };
    default: return { label: "Easy", sentenceLength: 3, prefillFirst: true, extraTiles: 0, showPictures: true };
  }
};

export const LISTEN_ROUND = 10;
export const BUILDER_ROUND = 5;
