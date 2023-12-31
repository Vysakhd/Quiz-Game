import React from 'react';

function Results({ totalQuestions, correctAnswers, onRestart }) {
  return (
    <div className="Results">
      <h2>Quiz Results</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default Results;
