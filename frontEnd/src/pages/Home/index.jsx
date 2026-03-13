import Button from "../../components/button";
import styles from "./index.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.middle}>
        <p className={styles.mainText}>
          Your Personal
          <span className={styles.studyAssistant}> Study Assistant</span>
        </p>

        <p className={styles.homeDescription}>
          We'll turn your subject it into a personalized study book with
          interactive quizzes and flashcards. Learn smarter, not harder.
        </p>

        <Button text="Add Subject" color="#6a5be2" />
      </div>
    </div>
  );
};

export default Home;
