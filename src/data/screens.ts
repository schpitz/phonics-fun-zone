export type Screen =
  | "home" | "letters" | "words" | "sentences" | "games"
  | "matching" | "spelling" | "sorting" | "builder" | "listening";

/** Screens grouped under the "Games" tab of the bottom bar */
export const GAME_SCREENS: Screen[] = ["matching", "spelling", "sorting", "builder", "listening"];
