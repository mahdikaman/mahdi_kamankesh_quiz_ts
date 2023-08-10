import styled from 'styled-components'

interface QuizQuestionAnsweredProps {
  question: string
  answer?: string
}

export function QuizQuestionAnswered({ question, answer }: QuizQuestionAnsweredProps) {
  return (
    <>
      <Message className="message-left">
          <p>{question}</p>
      </Message>

      <Message className="message-right">
          <p>{answer ?? '[Did not answer]'}</p>
      </Message>
    </>
  )
}

const Message = styled.section`
  display: flex;
`
export default QuizQuestionAnswered
