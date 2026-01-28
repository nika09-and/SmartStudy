import styles from "./index.module.css";
import headerMark from "../../assets/form_header_start.svg";

const Create = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Create Your subject</p>
      <div className={styles.form}>
        <div className={styles.formTop}>
          <img
            src={headerMark}
            alt="Header Mark"
            className={styles.headerMark}
          />
          <p className={styles.formHeader}>Name & Description</p>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.titleLine}>
            <p className={styles.title}>Title</p>
            <div className={styles.indicator}>i</div>
          </div>
          <input type="text" className={styles.titleInput} />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.titleLine}>
            <p className={styles.title}>Title</p>
            <div className={styles.indicator}>i</div>
          </div>
          <input type="text" className={styles.titleInput} />
        </div>
      </div>
    </div>
  );
};

export default Create;
