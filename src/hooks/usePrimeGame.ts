import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { generateRandomNumber, isPrime } from '../utils/math'
import { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS } from '../constants'
import type { GuessEntry, GameStatus } from '../types'

const usePrimeGame = () => {
  const [sessionId, setSessionId] = useState<string>('')
  const [secretNumber, setSecretNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<GuessEntry[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS)
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')

  useEffect(() => {
    const startSession = async () => {
      const sessionData = await initGameSession()
      setSessionId(sessionData.sessionId)
      initializeGame()
    }
    startSession()
  }, [])

  const initializeGame = () => {
    let num = generateRandomNumber(MIN_NUMBER, MAX_NUMBER)
    while (!isPrime(num)) {
      num = generateRandomNumber(MIN_NUMBER, MAX_NUMBER)
    }
    setSecretNumber(num)
    setGuesses([])
    setFeedback('')
    setAttemptsLeft(MAX_ATTEMPTS)
    setGameStatus('playing')
    setGuess('')
  }

  const handleGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (gameStatus !== 'playing') return
    const guessNum = parseInt(guess, 10)
    if (isNaN(guessNum)) {
      setFeedback('Please enter a valid number')
      return
    }
    let newFeedback = ''
    let newStatus: GameStatus = gameStatus
    if (guessNum === secretNumber) {
      newFeedback = 'Correct!'
      newStatus = 'won'
    } else if (guessNum < secretNumber) {
      newFeedback = 'Too low.'
    } else {
      newFeedback = 'Too high.'
    }
    const newAttemptsLeft = attemptsLeft - 1
    if (newAttemptsLeft <= 0 && newStatus !== 'won') {
      newStatus = 'lost'
      newFeedback = `Game over! The number was ${secretNumber}.`
    }
    const roundNumber = guesses.length + 1
    const roundData = { guess: guessNum, feedback: newFeedback, attemptsLeft: newAttemptsLeft }
    saveGameData(sessionId, roundNumber, roundData)
    setGuesses(prev => [...prev, { guess: guessNum, feedback: newFeedback }])
    setFeedback(newFeedback)
    setAttemptsLeft(newAttemptsLeft)
    setGameStatus(newStatus)
    setGuess('')
  }

  const resetGame = () => {
    initializeGame()
  }

  return {
    guess,
    feedback,
    guesses,
    attemptsLeft,
    gameStatus,
    handleGuessChange,
    handleSubmit,
    resetGame
  }
}

export default usePrimeGame