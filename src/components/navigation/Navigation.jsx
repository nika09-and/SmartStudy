import styles from "./Navigation.module.css";
import FaHome from "../../assets/faHome.svg";
import FaLibrary from "../../assets/faLibrary.svg";
import FaCreate from "../../assets/faCreate.svg";

const Navigation = () => {
  const navItems = [
    { label: "Home", href: "#", icon: FaHome },
    { label: "Library", href: "#", icon: FaLibrary },
    { label: "Create", href: "#", icon: FaCreate },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className={styles.navLink}>
              <img
                src={item.icon}
                alt={item.label}
                style={{ marginRight: "8px", width: "20px", height: "20px" }}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
