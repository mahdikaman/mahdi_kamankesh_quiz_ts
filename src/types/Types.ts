export enum GameState {
  LOADING,
  SELECT_CATEGORY,
  PLAYING,
  RESULT,
}

export interface GameSettings {
  playerName: string
  region: string
  difficulty: Difficulty
  categories: Category[]
  rounds: number
}

export type Categories = Record<string, string[]>

export interface Category {
  name: string
  value: string
}

export interface Question {
  category: string
  id: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  tags: string[]
  type: string
  difficulty: Difficulty
  regions: string[]
  isNiche: boolean
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  RANDOM = 'random',
}
