import { render } from '@testing-library/react';
import { Result } from './Result';

describe('Result', () => {
  it('renders without crashing', () => {
    render(<Result name="John Doe" score={10} />);
  });

  it('displays the name and score', () => {
    const { getByText } = render(<Result name="John Doe" score={10} />);
    expect(getByText('Well done John Doe! Score: 10')).toBeInTheDocument();
  });

  it('displays the reset button', () => {
    const { getByText } = render(<Result name="John Doe" score={10} />);
    expect(getByText('Reset')).toBeInTheDocument();
  });

  it('resets the game when the reset button is clicked', () => {
    const { getByText } = render(<Result name="John Doe" score={10} />);
    const button = getByText('Reset');
    button.click();
    expect(window.location.pathname).toBe('/');
  });
});