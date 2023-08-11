import { render, fireEvent } from '@testing-library/react';
import { GameStateCtx } from '@/ctx/Context';
import { getCategories } from '@/utils/Api';
import { Category, Difficulty, GameSettings } from '@/types/Types';
import { QuizSettings } from './QuizSettings';
import jest from 'jest';

const defaultProps: GameSettings = {
  playerName: 'John Doe',
  region: 'us',
  difficulty: Difficulty.EASY,
  categories: [{ name: 'General Knowledge', value: '9' }],
  rounds: 10,
};

const mockSetError = jest.fn();

jest.mock('@/ctx/Context', () => ({
  GameStateCtx: {
    Consumer: ({ children }: { children: (value: any) => any }) =>
      children({ setError: mockSetError }),
  },
}));

jest.mock('@/utils/Api', () => ({
  getCategories: jest.fn(() =>
    Promise.resolve({
      '9': ['General Knowledge'],
      '10': ['Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music'],
    })
  ),
}));

describe('QuizSettings', () => {
  it('renders without crashing', () => {
    render(<QuizSettings {...defaultProps} />);
  });

  it('displays the default values', () => {
    const { getByLabelText, getByText } = render(<QuizSettings {...defaultProps} />);
    expect(getByLabelText('Name:')).toHaveValue(defaultProps.playerName);
    expect(getByText('Easy')).toBeInTheDocument();
    expect(getByText('USA')).toBeInTheDocument();
    expect(getByText('General Knowledge')).toBeInTheDocument();
  });

  it('updates the player name', () => {
    const { getByLabelText } = render(<QuizSettings {...defaultProps} />);
    const input = getByLabelText('Name:');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(input).toHaveValue('Jane Doe');
  });

  it('updates the difficulty', () => {
    const { getByLabelText } = render(<QuizSettings {...defaultProps} />);
    const select = getByLabelText('Difficulty:');
    fireEvent.change(select, { target: { value: Difficulty.HARD } });
    expect(select).toHaveValue(Difficulty.HARD);
  });

  it('updates the region', () => {
    const { getByLabelText } = render(<QuizSettings {...defaultProps} />);
    const select = getByLabelText('Region:');
    fireEvent.change(select, { target: { value: 'SE' } });
    expect(select).toHaveValue('SE');
  });

  it('adds a category', async () => {
    const { getByLabelText, findByText } = render(<QuizSettings {...defaultProps} />);
    const select = getByLabelText('Categories:');
    fireEvent.change(select, { target: { value: '10' } });
    const category = await findByText('Entertainment: Books');
    expect(category).toBeInTheDocument();
  });

  it('removes a category', async () => {
    const { getByText, queryByText } = render(<QuizSettings {...defaultProps} />);
    const category = getByText('General Knowledge');
    const removeButton = category.parentElement!.querySelector('button')!;
    fireEvent.click(removeButton);
    expect(queryByText('General Knowledge')).not.toBeInTheDocument();
  });

  it('submits the form', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<QuizSettings {...defaultProps} onSubmit={onSubmit} />);
    const button = getByText('Start Game');
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith({
      playerName: defaultProps.playerName,
      rounds: 9,
      categories: defaultProps.categories,
      difficulty: Difficulty.EASY,
      region: defaultProps.region,
    });
  });
});