interface QuizProgressProps {
  className?: string
  progress: number
}

export function QuizProgress({ progress, className = '' }: QuizProgressProps) {
  return (
    <progress
      className={'QuizProgress ' + className}
      value={progress}
      max="100"
      style={{ width: 'calc(100% - 8px)' }}></progress>
  )
}

export default QuizProgress
