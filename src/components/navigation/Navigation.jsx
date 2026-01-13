import styles from "./Navigation.module.css";

const Navigation = () => {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Library", href: "#" },
    { label: "Create", href: "#" },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
