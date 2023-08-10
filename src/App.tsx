import { useState } from 'react'
import styled from 'styled-components'
import { Category, Difficulty, GameSettings, GameState } from '@/types/Types'
import { GameStateCtx } from '@/ctx/Context'
import { QuizSettings } from '@/components/QuizSettings.tsx'
import { Quiz } from '@/components/Quiz'
import Result from '@/components/Result.tsx'

export function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECT_CATEGORY)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [region, setRegion] = useState('SE')
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.RANDOM)
  const [totalRounds, setTotalRounds] = useState(9)
  const [categories, setCategories] = useState<Category[]>([])

  function handleSettings(settings: GameSettings) {
    setPlayerName(settings.playerName)
    setRegion(settings.region)
    setDifficulty(settings.difficulty)
    setTotalRounds(settings.rounds)
    setCategories(settings.categories)

    setGameState(GameState.PLAYING)
  }

  function handleResult(result: number) {
    setScore(result)
    setGameState(GameState.RESULT)
  }

  if (error) {
    return (
      <Wrapper className="App">
        <Main>
          <div>{error}</div>
        </Main>
        <Footer>&copy; 2023 Mahdi Kamankesh</Footer>
      </Wrapper>
    )
  }

  function renderGameState() {
    switch (gameState) {
      case GameState.LOADING:
        return <div>Loading...</div>
      case GameState.SELECT_CATEGORY:
        return (
          <QuizSettings
            rounds={totalRounds}
            difficulty={difficulty}
            categories={categories}
            playerName={playerName}
            region={region}
            onSubmit={handleSettings}
          />
        )
      case GameState.PLAYING:
        return <Quiz region={region} categories={categories} difficulty={difficulty} totalRounds={totalRounds} onResult={handleResult} />
      case GameState.RESULT:
        return <Result name={playerName} score={score} />
    }
  }

  return (
    <GameStateCtx.Provider value={{ setGameState, setError }}>
      <Wrapper className="App">
        <Main>{renderGameState()}</Main>
        <Footer> &copy; 2023 Mahdi Kamankesh</Footer>
      </Wrapper>
    </GameStateCtx.Provider>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
`

const Footer = styled.div`
  height: 64px;
`

export default App
