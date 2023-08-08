interface ResultProps {
  name: string
  score: number
}

export function Result({ name, score }: ResultProps) {
  return (
    <div className="Result">
      <div>
        Well done {name}! Score: {score}
      </div>
      <a href="/">
        <button>Reset</button>
      </a>
    </div>
  )
}

export default Result
