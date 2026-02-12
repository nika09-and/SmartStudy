import styles from "./index.module.css";

const Button = ({ text, color, height, width, fontSize }) => {
  return (
    <button
      className={styles.button}
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        fontSize: fontSize,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
