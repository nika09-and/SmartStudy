import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Courses from "../../components/courses";
import { supabase } from "../../supabaseClient";

const Library = () => {
  const [courses, setCourses] = useState([]);

  // 🔥 Fetch courses from Supabase
  const fetchCourses = async () => {
    try {
      // Get logged-in user
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data?.user) {
        console.error("User not logged in");
        return;
      }

      const user = data.user;

      // Get only THIS user's courses
      const { data: coursesData, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  // Delete course handler
  const handleDeleteCourse = async (courseId) => {
    try {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);

      if (error) throw error;

      // Remove from state
      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Error deleting course");
    }
  };

  // Run on page load
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.mainTitle}>Library</p>
      <div className={styles.mainBody}>
        {courses.length === 0 ? (
          <p>No courses yet. Create one!</p>
        ) : (
          courses.map((course) => (
            <Courses
              key={course.id}
              id={course.id}
              color={course.color || "blue"}
              title={course.title}
              description={course.description}
              onDelete={handleDeleteCourse}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
