import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import deleteIcon from "../../assets/delete.svg";

const Courses = ({ id, color, title, description, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete course "${title}"?`)) {
      onDelete(id);
    }
  };

  const handleCourseClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className={styles.container}
      onClick={handleCourseClick}
    >
      <div className={styles.courseUpper}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          title="Delete course"
        >
          <img src={deleteIcon} alt="Delete" className={styles.trashIcon} />
        </button>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Courses;
