import styled from 'styled-components'

interface QuizQuestionProps {
  question: string
  answers: string[]
  answered?: string
  onAnswer: (answer: string) => void
}

export function QuizQuestion({ question, answers, answered, onAnswer }: QuizQuestionProps) {
  const handleAnswer = (answer: string) => {
    onAnswer(answer)
  }

  return (
    <>
      <Message className="message-left">
          <p>{question}</p>
      </Message>

      <Message className="message-right">
          <p>
            {answered
              ? answered
              : answers.map((answer: string, i: number) => (
                  <button className="answerButton" key={i} value={answer} onClick={() => handleAnswer(answer)}>
                    {answer}
                  </button>
                ))}
          </p>
  
      </Message>
    </>
  )
}

const Message = styled.section`
  display: flex;
`

export default QuizQuestion
