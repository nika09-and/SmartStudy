import styles from "./index.module.css";
import Courses from "../../components/courses";

const Library = () => {
  return (
    <div className={styles.container}>
      <Courses
        color="blue"
        title="Sample Course"
        description="This is a sample course description."
      />
    </div>
  );
};

export default Library;
