import styles from "./Review.module.scss";
import { useState, useEffect } from "react";
import { decode } from "he";
import { useNavigate } from "react-router-dom";

interface Result {
  [key: string]: boolean | string;
}
interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: boolean | string;
  incorrect_answer: string[];
}
function Review() {
  const [results, setResults] = useState<Result>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers");
    if (savedAnswers) {
      setResults(JSON.parse(savedAnswers));
    }

    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions);
      setQuestions(parsedQuestions);
    }
  }, []);
  return (
    <>
      <div>
        <div className={styles.header_text}>
          <h1>TrivialApp</h1>
        </div>

        <div className={styles.container}>
          <p className={styles.score_text}>
            <span className={styles.answer_text}>You scored</span>
            {
              questions.filter((question, index) => {
                return (
                  Boolean(results[index]) ===
                  Boolean(question.correct_answer === "True")
                );
              }).length
            }
            /{questions.length}{" "}
            <span>
              {questions.filter((question, index) => {
                return (
                  Boolean(results[index]) ===
                  Boolean(question.correct_answer === "True")
                );
              }).length > 5
                ? "💪"
                : "😞"}
            </span>
          </p>
          {questions.map((question, index) => {
            const isCorrect =
              Boolean(results[index]) ===
              Boolean(question.correct_answer === "True");

            return (
              <div
                key={index}
                className={`${styles.question} ${
                  isCorrect ? styles.correct : styles.incorrect
                }`}
              >
                <p className={styles.saved_question}>
                  {decode(question.question)}
                </p>
                <div>
                  Your answer:
                  <span className={styles.answer_result}>
                    {results[index] ? "True" : "False"}
                  </span>
                  {isCorrect ? (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      color="#00973f"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "rgb(0, 151, 63)" }}
                    >
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                    </svg>
                  ) : (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 352 512"
                      color="#b71c1c"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "rgb(183, 28, 28)" }}
                    >
                      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                  )}
                </div>
              </div>
            );
          })}

          <button
            className={styles.reset_btn}
            onClick={() => {
              navigate("/");
            }}
          >
            <div>try again</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              color="white"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white" }}
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
