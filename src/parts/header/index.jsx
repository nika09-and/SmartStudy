import styles from "./index.module.css";
import logoIcon from "../../assets/SmartStudy-icon.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={logoIcon} alt="logo" />
      </div>
      <div className={styles.midSide}></div>
      <div className={styles.rightSide}></div>
    </div>
  );
};

export default Header;
