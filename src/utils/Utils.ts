import { Difficulty } from '@/types/Types.ts'

export function shuffle<T>(...array: T[]): T[] {
  const from = array.slice()
  const to: T[] = []
  while (from.length) {
    const element = from.splice(Math.floor(Math.random() * from.length), 1)
    to.push(...element)
  }
  return to
}

export function calculateScore(
  totalRemainingTime: number,
  difficulty: Difficulty,
  increaseDifficultyMultiplier: number,
  correctAnswers: number,
  consecutiveBonus: number
) {
  let difficultyMultiplier = 1
  switch (difficulty) {
    case Difficulty.EASY:
      difficultyMultiplier = 1
      break
    case Difficulty.MEDIUM:
      difficultyMultiplier = 3
      break
    case Difficulty.HARD:
      difficultyMultiplier = 5
      break
  }
  return Math.floor(totalRemainingTime * (difficultyMultiplier + increaseDifficultyMultiplier) + correctAnswers) * consecutiveBonus
}
