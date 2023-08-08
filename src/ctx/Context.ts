import { createContext } from 'react'
import { GameState } from '../types/Types.ts'

type GameStateCtxType = {
  setGameState: (state: GameState) => void
  setError: (error: string) => void
}

export const GameStateCtx = createContext({} as GameStateCtxType)
