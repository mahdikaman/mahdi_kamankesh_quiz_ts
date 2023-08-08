import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GameStateCtx } from '@/ctx/Context'
import { Category, Difficulty, Question } from '@/types/Types'
import { gameConfig } from '@/utils/GameConfig'
import { getQuizQuestions } from '@/utils/Api'
import { calculateScore, shuffle } from '@/utils/Utils'
import QuizHeader from '@/components/QuizHeader'
import QuizQuestion from '@/components/QuizQuestion'
import QuizProgress from '@/components/QuizProgress'
import QuizQuestionAnswered from '@/components/QuizQuestionAnswered'
import QuizQuestionLoading from '@/components/QuizQuestionLoading.tsx'

interface QuizProps {
  categories: Category[]
  difficulty: Difficulty
  region: string
  totalRounds: number
  onResult: (score: number) => void
}

let intervalFast: NodeJS.Timeout | null = null
let intervalSlow: NodeJS.Timeout | null = null

export const Quiz = ({ categories, difficulty, region, totalRounds, onResult }: QuizProps) => {
  const { setError } = useContext(GameStateCtx)
  const [round, setRound] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState<number>(0)
  const [consecutiveBonus, setConsecutiveBonus] = useState<number>(1)
  const [totalRemainingTime, setTotalRemainingTime] = useState<number>(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [fastCount, setFastCount] = useState<number>(3)
  const [slowCount, setSlowCount] = useState<number>(gameConfig.timePerQuestion)
  const [fastTimerOn, setFastTimerOn] = useState<boolean>(true)
  const [slowTimerOn, setSlowTimerOn] = useState<boolean>(false)
  const messageListRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (messageListRef.current == null) return
    messageListRef.current?.scrollTo(0, messageListRef.current?.scrollHeight)
  }, [messageListRef, fastTimerOn])

  const question = useMemo((): Question | null => {
    return questions[round] ?? null
  }, [questions, round])

  const choices = useMemo((): string[] => {
    const question = questions[round]
    if (question) {
      return shuffle(...question.incorrectAnswers, question.correctAnswer)
    }
    return []
  }, [questions, round])

  function handleGameOver() {
    onResult(calculateScore(totalRemainingTime, difficulty, gameConfig.increaseDifficultyMultiplier, correctAnswers, consecutiveBonus))
  }

  function handleNextRound() {
    if (round + 1 >= totalRounds) {
      return handleGameOver()
    }
    setSlowCount(gameConfig.timePerQuestion)
    setFastCount(3)
    setRound(round + 1)
    setSlowTimerOn(false)
    setFastTimerOn(true)
  }

  const handleAnswer = (answer: string) => {
    if (answer === question?.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1)
      setConsecutiveCorrectAnswers(consecutiveCorrectAnswers + 1)
      setTotalRemainingTime(Math.floor(totalRemainingTime + slowCount))
    } else {
      setConsecutiveCorrectAnswers(0)
    }
    const answersClone = answers.slice()
    answersClone[round] = answer
    setAnswers(answersClone)
    handleNextRound()
  }

  useEffect(() => {
    if (consecutiveCorrectAnswers >= 3 && consecutiveCorrectAnswers >= consecutiveBonus) {
      setConsecutiveBonus(consecutiveCorrectAnswers)
    }
  }, [consecutiveCorrectAnswers, setConsecutiveBonus, consecutiveBonus])

  useEffect(() => {
    getQuizQuestions(categories, region, totalRounds, difficulty)
      .then(setQuestions)
      .catch(() => setError('Api seems to be down, try again later'))
  }, [categories, difficulty, region, setError, totalRounds])

  useEffect(() => {
    if (fastTimerOn) {
      intervalFast = setInterval(() => {
        setFastCount((prevFastCount) => prevFastCount - 1)
      }, 1000)
    } else if (intervalFast) {
      clearInterval(intervalFast)
    }
    if (slowTimerOn) {
      intervalSlow = setInterval(() => {
        setSlowCount((prevSlowCount) => prevSlowCount - 0.25)
      }, 250)
    } else if (intervalSlow) {
      clearInterval(intervalSlow)
    }

    return () => {
      if (intervalFast) clearInterval(intervalFast)
    }
  }, [fastTimerOn, slowTimerOn])

  if (fastTimerOn && fastCount <= 0) {
    setFastTimerOn(false)
    setSlowTimerOn(true)
  }

  if (slowTimerOn && slowCount <= 0) {
    handleNextRound()
  }

  if (round > gameConfig.questionsPerRound) {
    handleGameOver()
  }

  if (!question) {
    return <div className="Quiz">Loading question...</div>
  }

  return (
    <>
      <QuizHeader
        round={round}
        totalRounds={totalRounds}
        correctAnswers={correctAnswers}
        consecutiveBonus={consecutiveBonus}
        totalRemainingTime={totalRemainingTime}
      />
      <section className="Questions message-list" ref={messageListRef}>
        {questions.slice(0, round).map((question, i) => (
          <QuizQuestionAnswered key={i} question={question.question} answer={answers[i]} />
        ))}
        {fastTimerOn ? (
          <QuizQuestionLoading timer={fastCount} />
        ) : (
          <>
            <QuizQuestion question={question.question} answers={choices} onAnswer={handleAnswer} />
            <QuizProgress progress={(slowCount / gameConfig.timePerQuestion) * 100} />
          </>
        )}
      </section>
    </>
  )
}
