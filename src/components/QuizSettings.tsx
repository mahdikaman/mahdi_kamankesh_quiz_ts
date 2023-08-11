import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GameStateCtx } from '@/ctx/Context'
import { getCategories } from '@/utils/Api'
import { Category, Difficulty, GameSettings } from '@/types/Types'
import styled from 'styled-components'

interface SettingsProps extends GameSettings {
  onSubmit: (settings: GameSettings) => void
}

export function QuizSettings({ onSubmit, ...defaultProps }: SettingsProps) {
  const { setError } = useContext(GameStateCtx)
  const [quizCategories, setQuizCategories] = useState<Category[]>([])
  const [playerName, setPlayerName] = useState(defaultProps.playerName)
  const [categories, setCategories] = useState<Category[]>(defaultProps.categories)
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultProps.difficulty)
  const [region, setRegion] = useState(defaultProps.region)

  const filteredCategories = useMemo((): Category[] => {
    return quizCategories.filter((category) => !categories.map((c) => c.value).includes(category.value))
  }, [quizCategories, categories])

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = quizCategories.find((category) => category.value === event.currentTarget.value)
    if (category == null) return
    setCategories([...categories, category])
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c.value !== category))
  }

  const handleDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.currentTarget.value as Difficulty)
  }

  const handleRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.currentTarget.value)
  }

  const handleStart = () => {
    onSubmit({
      playerName,
      rounds: 9,
      categories,
      difficulty,
      region,
    })
  }
  const handlePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.currentTarget.value)
  }

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setQuizCategories(Object.entries(categories).map(([name, values]) => ({ name, value: values[0] })))
      })
      .catch(() => setError('Api is down right now, try again later'))
  }, [setError])

  const isValid = useMemo(() => {
    return playerName.trim().length > 0 && categories.length > 0 && difficulty.length > 0
  }, [categories, difficulty, playerName])

  return (
    <div className="QuizSettings">
      <ElementWithLabel>
        <Label htmlFor="name_input">Name:</Label>
        <input onChange={handlePlayerName} type="text" id="name_input" placeholder="Type your name here..." />
      </ElementWithLabel>

      <ElementWithLabel>
        <Label htmlFor="difficulty_select">Difficulty:</Label>
        <div>
          <select defaultValue={defaultProps.difficulty} required id="difficulty_select" onChange={handleDifficulty}>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
            <option value={Difficulty.RANDOM}>Random</option>
          </select>
        </div>
      </ElementWithLabel>

      <ElementWithLabel>
        <Label htmlFor="region_select">Region:</Label>
        <div>
          <select defaultValue={defaultProps.region} required id="region_select" onChange={handleRegion}>
            <option value="SE">Sweden</option>
            <option value="US">USA</option>
          </select>
        </div>
      </ElementWithLabel>

      <ElementWithLabel>
        <Label htmlFor="category_select">Categories:</Label>
        <div>
          <select required id="category_select" onChange={handleCategory}>
            <option hidden value="">
              Select a category
            </option>
            {filteredCategories.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </ElementWithLabel>

      <ElementWithLabel>
        <Label>Selected:</Label>
        <SelectedCategories>
          {categories.map((category) => (
            <SelectedCategory key={category.value} onClick={() => removeCategory(category.value)}>
              {category.name}
            </SelectedCategory>
          ))}
        </SelectedCategories>
      </ElementWithLabel>

      <button className={isValid ? '' : ' is-disabled'} onClick={handleStart} disabled={!isValid}>
        Start Game
      </button>
    </div>
  )
}

const ElementWithLabel = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: end;
`

const Label = styled.label`
  margin-left: 4px;
  min-width: 180px;
  text-align: right;
`
const SelectedCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SelectedCategory = styled.span`
  margin: 0.5em;
  text-align: center;
`
