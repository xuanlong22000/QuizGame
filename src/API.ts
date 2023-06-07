import axios from "axios";
import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficult: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// export type QuestionState = Question & { answer: string[] };

export const fetchQuizQuestion = async () => {
  const url = `https://opentdb.com/api.php?amount=5`;

  const { data } = await axios.get(url);

  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }));
};
