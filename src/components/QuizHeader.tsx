import styled from 'styled-components'

interface HeaderProps {
  round: number
  totalRounds: number
  correctAnswers: number
  consecutiveBonus: number
  totalRemainingTime: number
}

export function QuizHeader({ round, totalRounds, correctAnswers, consecutiveBonus, totalRemainingTime }: HeaderProps) {
  return (
    <Header className="Header">
      <a href={'/'}>
        <button>Reset</button>
      </a>

      <div>
        Round:
        {round <= totalRounds ? (
          <HeaderNumbers>
            {round + 1} / {totalRounds}
          </HeaderNumbers>
        ) : (
          <HeaderNumbers>Game Over</HeaderNumbers>
        )}
      </div>
      <div>
        Correct Answers: <HeaderNumbers>{correctAnswers}</HeaderNumbers>
      </div>
      <div>
        Streak: x <HeaderNumbers>{consecutiveBonus}</HeaderNumbers>
      </div>
      <div>
        Bonus Time: <HeaderNumbers>{totalRemainingTime}</HeaderNumbers>
      </div>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  border-radius: 0.5rem;
  height: 15vh;
`

const HeaderNumbers = styled.span`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`

export default QuizHeader
