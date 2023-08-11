import { expectTypeOf } from 'vitest'
import { GameState, GameSettings, Categories, Category, Question, Difficulty } from './Types'

it('checks the types', () => {
  expectTypeOf<GameState>(GameState.LOADING)
  expectTypeOf<GameState>(GameState.SELECT_CATEGORY)
  expectTypeOf<GameState>(GameState.PLAYING)
  expectTypeOf<GameState>(GameState.RESULT)

  expectTypeOf<GameSettings>({
    playerName: 'John Doe',
    region: 'us',
    difficulty: Difficulty.EASY,
    categories: [{ name: 'General Knowledge', value: '9' }],
    rounds: 10,
  })

  expectTypeOf<Categories>({
    '9': ['General Knowledge'],
    '10': ['Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music'],
  })

  expectTypeOf<Category>({
    name: 'General Knowledge',
    value: '9',
  })

  expectTypeOf<Question>({
    category: 'General Knowledge',
    id: '1',
    correctAnswer: 'Answer',
    incorrectAnswers: ['Answer 1', 'Answer 2', 'Answer 3'],
    question: 'Question',
    tags: ['tag1', 'tag2'],
    type: 'multiple',
    difficulty: Difficulty.EASY,
    regions: ['us'],
    isNiche: false,
  })

  expectTypeOf<Difficulty>(Difficulty.EASY)
  expectTypeOf<Difficulty>(Difficulty.MEDIUM)
  expectTypeOf<Difficulty>(Difficulty.HARD)
  expectTypeOf<Difficulty>(Difficulty.RANDOM)
})
