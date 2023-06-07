import React, { useState } from "react";
import classNames from "classnames/bind";
import { fetchQuizQuestion } from "./API";
import QuestionCard from "./components/QuestionCard";
import useTime from "./hooks/useTime";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GiRobotGolem } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import styles from "./App.module.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const cx = classNames.bind(styles);

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

type Question = {
  question: string;
  answer: string[];
  correct_answer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const timeComplete = useTime((state) => state.time);
  const resetTime = useTime((state) => state.resetTime);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    const listQuestion = await fetchQuizQuestion();

    resetTime();
    setQuestions(listQuestion);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    setNumber(number + 1);
  };

  return (
    <div className={cx("wrapper")}>
      {gameOver ? (
        <>
          <GiRobotGolem size={80} color="red" />
          <button className="start" onClick={startGame}>
            Start Quiz!
          </button>
        </>
      ) : null}

      {loading && <p>Loading Questions...</p>}

      {userAnswer.length !== questions.length && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={questions.length}
          question={questions[number].question}
          answers={questions[number].answer}
          userAnswer={userAnswer[number]}
          checkAnswer={checkAnswer}
        />
      )}

      {!gameOver && !loading && number !== questions.length - 1 ? (
        <button
          disabled={userAnswer.length !== number + 1}
          className={cx("next")}
          onClick={nextQuestion}
        >
          Next
        </button>
      ) : null}

      {/* Popup Result */}
      <Modal
        open={!loading && !gameOver && userAnswer.length === questions.length}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {score >= Math.round(questions.length / score) ? (
            <>
              <FaAward size={80} color="green" />
              <h1>Congratulation!!</h1>
              <span>You are amazing!!</span>
            </>
          ) : (
            <>
              <FiRefreshCcw size={80} color="brown" />
              <h1>Completed!</h1>
              <span>Better luck next time!</span>
            </>
          )}

          <span>
            {score}/{questions.length} correct answers in {timeComplete} seconds
          </span>

          <button className="start" onClick={startGame}>
            Start Again
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
