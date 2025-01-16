import styles from "./Quiz.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { decode } from "he";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: boolean;
  incorrect_answer: string[];
}
function Quiz() {
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<Record<number, boolean>>(
    {}
  );
  const [showAnswerMessage, setShowAnswerMessage] = useState(false);
  const navigate = useNavigate();

  const toggleActive = (value: string) => {
    setCurrentAnswer((prevAnswer) => {
      const updatedAnswers = { ...prevAnswer };
      updatedAnswers[currentIndex] = value === "True";
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  const handleUserInput = (event: React.MouseEvent) => {
    event.preventDefault();

    setShowAnswerMessage(false);
  };

  const handleContinueInput = () => {
    if (
      !(
        currentAnswer[currentIndex] === true ||
        currentAnswer[currentIndex] === false
      )
    ) {
      setShowAnswerMessage(true);
    } else {
      if (currentIndex === questionData.length - 1) {
        navigate("/review");
      } else {
        setCurrentIndex((prevIndex) =>
          prevIndex === questionData.length - 1 ? prevIndex : prevIndex + 1
        );
      }
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get(`${API_ENDPOINT}`);
      setQuestionData(response.data.results);
      localStorage.setItem("questions", JSON.stringify(response.data.results));
    };

    fetchQuestion();
  }, []);

  const currentData = questionData[currentIndex];
  const decodedQuestion = currentData ? decode(currentData.question) : "";
  const decodedCategory = currentData ? decode(currentData.category) : "";

  return (
    <>
      <div>
        <div className={styles.header_text}>
          <h1>TrivialApp</h1>
        </div>
        {currentData ? (
          <div className={styles.container}>
            <p className={styles.track_number}>
              {currentIndex + 1} of {questionData.length} ({decodedCategory})
            </p>
            <h5 className={styles.question_text}>{decodedQuestion}</h5>
            <div className={styles.boolean_box}>
              <div
                className={`${styles.first_boolean} ${
                  currentAnswer[currentIndex] === true ? styles.active : ""
                }`}
                data-value="True"
                onClick={(event) => {
                  toggleActive("True");
                  handleUserInput(event);
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  color="#00973f"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(0, 151, 63)" }}
                >
                  <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
                <p>True</p>
              </div>
              <div
                className={`${styles.second_boolean} ${
                  currentAnswer[currentIndex] === false ? styles.active : ""
                }`}
                data-value="False"
                onClick={(event) => {
                  toggleActive("False");
                  handleUserInput(event);
                }}
              >
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>{" "}
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
                <p>False</p>
              </div>
            </div>
            <p
              className={styles.answer_check}
              style={{ display: showAnswerMessage ? "block" : "none" }}
            >
              Please, answer this question
            </p>
            <button className={styles.next_btn} onClick={handleContinueInput}>
              {currentIndex === questionData.length - 1 ? (
                <>
                  <div>submit</div>
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
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <div>continue</div>
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
                    <path
                      fill-rule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className={styles.spinner_wrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;
