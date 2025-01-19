import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.scss";

function StartPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.root}>
        <div className={styles.header_text}>
          <h1>TrivialApp</h1>
        </div>
        <div className={styles.quiz_text}>
          <img src="./src/assets/illustration.svg" alt="illustration" />
          <h1 className={styles.title}>Welcome to the Trivia Challenge</h1>
          <p>You will be presented with 10 True or False questions</p>
          <p>Can you score 100%?</p>

          <button
            className={styles.quiz_button}
            onClick={() => navigate("/quiz")}
          >
            <div>begin</div>
          </button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
