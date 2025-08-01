import React from 'react'

interface FeedbackProps {
  message: string
}

const Feedback: React.FC<FeedbackProps> = ({ message }) => {
  if (!message) return null
  return <p className="feedback">{message}</p>
}

export default Feedback