const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://randomplayables.com/api'
  : '/api';

const GAME_ID = import.meta.env.VITE_GAME_ID;

export async function initGameSession() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const surveyMode = urlParams.get('surveyMode') === 'true';
    const questionId = urlParams.get('questionId');

    const response = await fetch(`${API_BASE_URL}/game-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          gameId: GAME_ID,
          surveyMode: surveyMode,
          surveyQuestionId: questionId
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to initialize game session');
    }
    
    const sessionData = await response.json();

    // If in survey mode, send the newly created session ID to the parent window
    if (surveyMode && window.parent) {
        console.log('Game is in survey mode. Posting session data to parent window.');
        window.parent.postMessage({ type: 'GAME_SESSION_CREATED', payload: sessionData }, '*');
    }
    
    return sessionData;

  } catch (error) {
    console.error('Error initializing game session:', error);
    return { sessionId: 'local-session' };
  }
}

export async function saveGameData(sessionId: string, roundNumber: number, roundData: any) {
  try {
    if (!sessionId) {
      console.error('No session ID provided for saving game data');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/game-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, roundNumber, roundData }),
    });
    if (!response.ok) {
      throw new Error('Failed to save game data');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving game data:', error);
    return null;
  }
}