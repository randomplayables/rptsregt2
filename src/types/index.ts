export interface GuessEntry {
  guess: number
  feedback: string
}

export type GameStatus = 'playing' | 'won' | 'lost'