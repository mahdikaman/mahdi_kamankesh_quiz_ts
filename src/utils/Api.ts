import { Categories, Category, Question } from '@/types/Types.ts'

export const getCategories = (): Promise<Categories> => {
  return fetch('https://the-trivia-api.com/api/categories').then(handleError)
}

export const getQuizQuestions = async (categories: Category[], region: string, questions = 1, difficulty?: string): Promise<Question[]> => {
  const queryParams: Record<string, string> = {
    categories: categories.map((category) => category.value).join(','),
    limit: String(questions),
    region,
  }
  if (difficulty && difficulty != 'random') {
    queryParams.difficulty = difficulty
  }

  const queryString = Object.entries(queryParams)
    .map(([key, value]) => key + '=' + value)
    .join('&')

  return fetch(`https://the-trivia-api.com/api/questions?${queryString}`).then(handleError)
}

export function handleError(res: Response) {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(res.statusText)
  }
}
