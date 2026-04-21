import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get the currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please log in to create a course.");
        return;
      }

      // 2. Insert the new course into your Supabase 'courses' table
      const { error } = await supabase.from("courses").insert([
        {
          title: title,
          description: description,
          user_id: user.id, // Links the course to the logged-in user
        },
      ]);

      if (error) throw error;

      alert("Course created successfully!");

      // 3. Clear the blanks
      setTitle("");
      setDescription("");

      // 4. Optionally navigate back to the library to see the dynamic update
      navigate("/library");
    } catch (error) {
      console.error("Error saving course:", error.message);
      alert("Failed to save course. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container" style={{ padding: "20px" }}>
      <h1>Create New Course</h1>
      <form onSubmit={handleCreateCourse}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Course Title:</label>
          <input
            type="text"
            placeholder="Enter course title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Course Description / Content:</label>
          <textarea
            placeholder="Fill in the course details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {loading ? "Saving..." : "Add to Library"}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
