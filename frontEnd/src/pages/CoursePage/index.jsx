import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import styles from "./index.module.css";
import { supabase } from "../../supabaseClient";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return <div className={styles.courseContainer}>Loading...</div>;
  }

  if (!course) {
    return <div className={styles.courseContainer}>Course not found</div>;
  }

  return (
    <div className={styles.courseContainer}>
      <div className={styles.leftColumn}>
        <p className={styles.courseTitle}>{course.title}</p>
        <div
          className={styles.courseColor}
          style={{ backgroundColor: course.color }}
        ></div>
        <p className={styles.courseDescription}>{course.description}</p>
      </div>
      <div className={styles.rightColumn}></div>
    </div>
  );
};

export default CoursePage;
