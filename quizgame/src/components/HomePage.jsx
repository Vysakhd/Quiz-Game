import React, {useState} from 'react';
import QuizPage from '../components/QuizPage';
import './HomePage.css'

function HomePage() {
  const [quizStart, setQuizStarted] = useState(false);

  const start = () => {
    setQuizStarted(true);
  };

  return (
    <div className="HomePage">
      {quizStart ? (
        <QuizPage />
      ) : (
        <div>
          <h1>Just Brainstorm!!!</h1>
         
          <button onClick={start}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;