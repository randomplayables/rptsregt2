import React from 'react'
import usePrimeGame from './hooks/usePrimeGame'
import Header from './components/Header'
import GuessInput from './components/GuessInput'
import GuessList from './components/GuessList'
import Feedback from './components/Feedback'
import './App.css'

const App: React.FC = () => {
  const {
    guess,
    feedback,
    guesses,
    attemptsLeft,
    gameStatus,
    handleGuessChange,
    handleSubmit,
    resetGame,
  } = usePrimeGame()

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Feedback message={feedback} />
        <GuessInput
          value={guess}
          onChange={handleGuessChange}
          onSubmit={handleSubmit}
          disabled={gameStatus === 'won'}
        />
        <GuessList guesses={guesses} />
        <p className="attempts-left">Attempts Left: {attemptsLeft}</p>
        {gameStatus === 'won' && (
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

export default App
