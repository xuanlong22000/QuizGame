import React, { FC, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./QuestionCard.module.scss";
import { AnswerObject } from "../App";
import useTime from "../hooks/useTime";
const cx = classNames.bind(styles);

type Props = {
  question: string;
  answers: string[];
  checkAnswer: any;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: FC<Props> = ({
  question,
  answers,
  checkAnswer,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  const second = useTime((state) => state.time);
  const setTime = useTime((state) => state.timeUp);

  useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => {
      setTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [second, setTime]);

  return (
    <div className={cx("cardWrapper")}>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      {answers?.map((answer) => (
        <div key={answer} className={cx("buttonWrapper")}>
          <button
            style={
              userAnswer?.correctAnswer === answer
                ? { background: "linear-gradient(90deg, #56FFA4, #59BC86)" }
                : userAnswer?.correctAnswer !== answer &&
                  userAnswer?.answer === answer
                ? { background: "linear-gradient(90deg, #FF5656, #C16868)" }
                : { background: "linear-gradient(90deg, #56ccff, #6eafb4)" }
            }
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={checkAnswer}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
