import styles from "./index.module.css";

const Courses = ({ color, title, description }) => {
  return (
    <div style={{ backgroundColor: color }} className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Courses;
