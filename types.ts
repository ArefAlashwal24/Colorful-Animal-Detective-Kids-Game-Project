export enum GameScreen {
  HOME = 'HOME',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  STORY = 'STORY',
  PUZZLE = 'PUZZLE',
  COLORING = 'COLORING',
  FINISH = 'FINISH'
}

export enum CharacterType {
  CAT = 'CAT',
  DOG = 'DOG',
  RABBIT = 'RABBIT',
  BIRD = 'BIRD'
}

export type PuzzleColor = 'RED' | 'BLUE' | 'YELLOW' | 'GREEN';

// Map specific body parts to colors for the coloring activity
export type CharacterColors = Record<string, string>;

export interface CharacterProps {
  className?: string;
  colors?: CharacterColors;
  onPartClick?: (partId: string) => void;
  animate?: boolean;
}