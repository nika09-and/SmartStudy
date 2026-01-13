import styles from "./index.module.css";
import logoIcon from "../../assets/SmartStudy-icon.svg";
import Navigation from "../../components/navigation/Navigation";
import profile from "../../assets/profileLink.svg";
import notificationsYes from "../../assets/notification-eys.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={logoIcon} alt="logo" />
      </div>
      <div className={styles.midSide}>
        <input
          type="search"
          placeholder="🔍︎ Search..."
          className={styles.searchInput}
        ></input>
      </div>
      <div className={styles.rightSide}>
        <Navigation />
        <a href="#" className={styles.logInLink}>
          Log In
        </a>
        <a href="#" className={styles.profileLink}>
          <img src={profile} alt="profile" />
        </a>
        <button className={styles.notifications}>
          <img src={notificationsYes} alt="notifications" />
        </button>
      </div>
    </div>
  );
};

export default Header;
