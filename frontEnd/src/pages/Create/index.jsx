// ...existing code...
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./index.module.css";
import headerMark from "../../assets/form_header_start.svg";
import Button from "../../components/button";

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // added state and helpers
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [colorSelected, setColorSelected] = useState("");

  // New state for field tracking
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    description: false,
    categories: false,
    color: false,
    file: false,
  });
  const fileInputRef = useRef(null);

  const colorOptionsList = [
    { id: "purple", color: "#6b5ce2" },
    { id: "blue", color: "#2B85FF" },
    { id: "green", color: "#3ED6B5" },
    { id: "pink", color: "#FF8EA5" },
    { id: "orange", color: "#ED673E" },
    { id: "yellow", color: "#F6B91C" },
  ];

  const options = [
    { value: "quiz", label: "Quiz" },
    { value: "test", label: "Test" },
    { value: "flashCards", label: "Flash cards" },
  ];

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const toggleOption = (val) => {
    const newSelected = selected.includes(val)
      ? selected.filter((x) => x !== val)
      : [...selected, val];
    handleFieldChange("categories", newSelected);
  };

  // Helper functions for indicator states
  const getIndicatorState = (fieldName, value) => {
    if (!touchedFields[fieldName]) return "default";
    return value ? "filled" : "empty";
  };

  const handleFieldChange = (fieldName, value) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

    switch (fieldName) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "categories":
        setSelected(value);
        break;
      case "color":
        setColorSelected(value);
        break;
      case "file":
        setFile(value);
        break;
      default:
        break;
    }
  };

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(", ");

  if (!user) {
    return (
      <div className={styles.containerNotLogged}>
        <p className={styles.titleNotLogged}>You are not logged in</p>
        <p className={styles.subtitle}>Please log in to create a course.</p>
        <button
          type="button"
          className={styles.loginRedirect}
          onClick={() => navigate("/login")}
        >
          Go to Log In
        </button>
      </div>
    );
  }

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
            <div
              className={`${styles.indicatorTitle} ${styles[getIndicatorState("title", title)]}`}
              title="Enter a title for your subject, that will help you identify it later"
            >
              i
            </div>
          </div>
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.descriptionLine}>
            <p className={styles.description}>Description</p>
            <div
              className={`${styles.indicatorDescription} ${styles[getIndicatorState("description", description)]}`}
              title="Describe what your subject will cover"
            >
              i
            </div>
          </div>
          <textarea
            maxLength="300"
            className={styles.descriptionInput}
            value={description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.bottomLeft}>
            <div className={styles.categoriesLine}>
              <p className={styles.categories}>Categories</p>
              <div
                className={`${styles.indicatorCategories} ${styles[getIndicatorState("categories", selected.length > 0)]}`}
                title="Select the type of study material you want to create"
              >
                i
              </div>
            </div>

            {/* replaced native select with custom multi-select dropdown */}
            <div className={styles.categoriesSelect} ref={dropdownRef}>
              <button
                type="button"
                className={styles.selectToggle}
                onClick={() => setOpen((s) => !s)}
              >
                {selectedLabels || "Select categories"}
                <span className={styles.chev}>{open ? "▲" : "▼"}</span>
              </button>

              {open && (
                <ul className={styles.optionsList}>
                  {options.map((opt) => (
                    <li
                      key={opt.value}
                      className={styles.optionItem}
                      onClick={() => toggleOption(opt.value)}
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(opt.value)}
                        readOnly
                        className={styles.optionCheckbox}
                      />
                      <span className={styles.checkmark}></span>
                      <span className={styles.optionLabel}>{opt.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.bottomMid}>
            <div className={styles.colorLine}>
              <p className={styles.color}>Color</p>
              <div
                className={`${styles.indicatorColor} ${styles[getIndicatorState("color", colorSelected)]}`}
                title="Choose a color theme for your subject"
              >
                i
              </div>
            </div>

            <div className={styles.colorOptions}>
              {colorOptionsList.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.colorOption} ${
                    colorSelected === opt.id ? styles.selectedColor : ""
                  }`}
                  style={{ backgroundColor: opt.color }}
                  onClick={() => handleFieldChange("color", opt.id)}
                  aria-pressed={colorSelected === opt.id}
                />
              ))}
            </div>
          </div>
          <div className={styles.bottomRight}>
            <div className={styles.fileLine}>
              <p className={styles.file}>File</p>
              <div
                className={`${styles.indicatorFile} ${styles[getIndicatorState("file", !!file)]}`}
                title={file ? `File selected: ${file.name}` : "Upload a file for the subject"}
              >
                i
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                handleFieldChange("file", selectedFile);
              }}
            />
            <div className={styles.fileUpload}>
              <Button
                text="Upload"
                color="#272A30"
                height="40px"
                width="120px"
                fontSize="16px"
                onClick={() => fileInputRef.current?.click()}
              />
              <Button
                text="Complete"
                color="#6a5be2"
                height="40px"
                width="120px"
                fontSize="16px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
