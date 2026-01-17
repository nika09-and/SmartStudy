import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import FaHome from "../../assets/faHome.svg";
import FaLibrary from "../../assets/faLibrary.svg";
import FaCreate from "../../assets/faCreate.svg";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: FaHome },
    { label: "Library", path: "/library", icon: FaLibrary },
    { label: "Create", path: "/create", icon: FaCreate },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ""
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{ marginRight: "8px", width: "20px", height: "20px" }}
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
