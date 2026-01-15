import styles from "./index.module.css";

const Button = ({ text, color }) => {
  return (
    <button className={styles.button} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

export default Button;
