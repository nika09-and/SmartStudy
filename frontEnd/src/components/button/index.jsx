import styles from "./index.module.css";

const Button = ({ text, color, height, width, fontSize, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        backgroundColor: color,
        height,
        width,
        fontSize,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
