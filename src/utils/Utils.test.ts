import { describe, it, expect } from 'vitest'
import { calculateScore } from './Utils'
import { Difficulty } from '@/types/Types.ts'

describe('calculateScore', () => {
  it('calculates the score correctly for easy difficulty', () => {
    const totalRemainingTime = 60
    const difficulty = Difficulty.EASY
    const increaseDifficultyMultiplier = 0
    const correctAnswers = 5
    const consecutiveBonus = 1.5

    const expectedScore = Math.floor(totalRemainingTime * (1 + increaseDifficultyMultiplier) + correctAnswers) * consecutiveBonus
    const actualScore = calculateScore(totalRemainingTime, difficulty, increaseDifficultyMultiplier, correctAnswers, consecutiveBonus)

    expect(actualScore).toBe(expectedScore)
  })

  it('calculates the score correctly for medium difficulty', () => {
    const totalRemainingTime = 45
    const difficulty = Difficulty.MEDIUM
    const increaseDifficultyMultiplier = 0.5
    const correctAnswers = 7
    const consecutiveBonus = 2

    const expectedScore = Math.floor(totalRemainingTime * (3 + increaseDifficultyMultiplier) + correctAnswers) * consecutiveBonus
    const actualScore = calculateScore(totalRemainingTime, difficulty, increaseDifficultyMultiplier, correctAnswers, consecutiveBonus)

    expect(actualScore).toBe(expectedScore)
  })

  it('calculates the score correctly for hard difficulty', () => {
    const totalRemainingTime = 30
    const difficulty = Difficulty.HARD
    const increaseDifficultyMultiplier = 1
    const correctAnswers = 10
    const consecutiveBonus = 2.5

    const expectedScore = Math.floor(totalRemainingTime * (5 + increaseDifficultyMultiplier) + correctAnswers) * consecutiveBonus
    const actualScore = calculateScore(totalRemainingTime, difficulty, increaseDifficultyMultiplier, correctAnswers, consecutiveBonus)

    expect(actualScore).toBe(expectedScore)
  })
})
