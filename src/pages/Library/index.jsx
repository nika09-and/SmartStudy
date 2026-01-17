import styles from "./index.module.css";

const Library = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Library</h1>
      <p className={styles.description}>Your saved subjects and study materials will appear here.</p>
    </div>
  );
};

export default Library;
