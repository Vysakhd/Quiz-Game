import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios
      .get('https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple')
      .then((response) => {
        const data = response.data.results.map((question) => {
          const options = [question.correct_answer, ...question.incorrect_answers];
          const shuffledOptions = shuffleArray(options);

          return {
            ...question,
            options: shuffledOptions,
          };
        });

        setQuestions(data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching questions:', error);
      });
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.correct_answer;
    setIsCorrect(isAnswerCorrect);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setIsCorrect(null);
    } else {
      console.log('End of the quiz');
    }
  };

  const optionClass = (option) => {
    if (isCorrect === null) {
      return '';
    }
    if (option === questions[currentQuestionIndex].correct_answer) {
      return 'correct-answer';
    }
    if (option === selectedOption) {
      return 'wrong-answer';
    }
    return '';
  };

  return (
    <div className="QuizPage">
      <h1>Quiz Page</h1>
      <div className="quiz-container">
        {questions.length > 0 && (
          <div>
            <p className="question">{questions[currentQuestionIndex].question}</p>
            <ul className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className={`option ${optionClass(option)}`}>
                  <label>
                    <input
                      type="radio"
                      name="options"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isCorrect !== null && (
          <div>
            {isCorrect ? (
              <p className="answer-feedback-correct">Correct!</p>
            ) : (
              <p className="answer-feedback-incorrect">Incorrect.</p>
            )}
            <button className="next-button" onClick={moveToNextQuestion}>
              Next
            </button>
          </div>
        )}
        {isCorrect === null && (
          <div>
            <button className="check-answer-button" onClick={checkAnswer}>
              Check Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default QuizPage;
