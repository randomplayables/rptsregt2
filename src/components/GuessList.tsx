import React from 'react'
import type { GuessEntry } from '../types'

interface GuessListProps {
  guesses: GuessEntry[]
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  return (
    <ul className="guess-list">
      {guesses.map((entry, index) => (
        <li key={index} className="guess-list-item">
          Guess {index + 1}: {entry.guess} - {entry.feedback}
        </li>
      ))}
    </ul>
  )
}

export default GuessList