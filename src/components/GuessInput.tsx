import React, { ChangeEvent, FormEvent } from 'react'

interface GuessInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  disabled?: boolean
}

const GuessInput: React.FC<GuessInputProps> = ({ value, onChange, onSubmit, disabled = false }) => {
  return (
    <form onSubmit={onSubmit} className="guess-input-container">
      <input
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Enter your guess"
        className="guess-input"
      />
      <button type="submit" disabled={disabled} className="guess-button">
        Guess
      </button>
    </form>
  )
}

export default GuessInput
