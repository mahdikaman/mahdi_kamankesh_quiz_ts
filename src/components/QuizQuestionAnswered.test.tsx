import { render } from '@testing-library/react';
import QuizQuestionAnswered from './QuizQuestionAnswered';

const question = 'What is the capital of France?';
const answer = 'Paris';

it('renders without crashing', () => {
  render(<QuizQuestionAnswered question={question} answer={answer} />);
});

it('displays the question and answer', () => {
  const { queryByText } = render(<QuizQuestionAnswered question={question} answer={answer} />);
  expect(queryByText(question)).toBeInTheDocument();
  expect(queryByText(answer)).toBeInTheDocument();
});

it('displays the question and a default answer', () => {
  const { queryByText } = render(<QuizQuestionAnswered question={question} />);
  expect(queryByText(question)).toBeInTheDocument();
  expect(queryByText('[Did not answer]')).toBeInTheDocument();
});