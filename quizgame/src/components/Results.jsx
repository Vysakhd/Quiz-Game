import React from 'react';

function Results({ totalQuestions, correctAnswers, onPlayAgain }) {
  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default Results;
