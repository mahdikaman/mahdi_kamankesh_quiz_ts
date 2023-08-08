import styled from 'styled-components'

export function QuizQuestionLoading(props: { timer: number }) {
  return (
    <>
      <Message className="message-left">
          <p>{'...'.slice(0, 4 - props.timer)}</p>
      </Message>
    </>
  )
}

const Message = styled.section`
  display: flex;
  `
export default QuizQuestionLoading
