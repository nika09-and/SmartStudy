// ...existing code...
import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import headerMark from "../../assets/form_header_start.svg";
import Button from "../../components/button";

const Create = () => {
  // added state and helpers
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [colorSelected, setColorSelected] = useState("");

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

  const toggleOption = (val) =>
    setSelected((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val],
    );

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(", ");

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
            <div className={styles.indicatorTitle}>i</div>
          </div>
          <input type="text" className={styles.titleInput} />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.descriptionLine}>
            <p className={styles.description}>Description</p>
            <div className={styles.indicatorDescription}>i</div>
          </div>
          <textarea maxLength="300" className={styles.descriptionInput} />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.bottomLeft}>
            <div className={styles.categoriesLine}>
              <p className={styles.categories}>Categories</p>
              <div className={styles.indicatorCategories}>i</div>
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
              <div className={styles.indicatorColor}>i</div>
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
                  onClick={() => setColorSelected(opt.id)}
                  aria-pressed={colorSelected === opt.id}
                />
              ))}
            </div>
          </div>
          <div className={styles.bottomRight}>
            <div className={styles.fileLine}>
              <p className={styles.file}>File</p>
              <div className={styles.indicatorFile}>i</div>
            </div>
            <div className={styles.fileUpload}>
              <Button
                text="Upload"
                color="#272A30"
                height="40px"
                width="120px"
                fontSize="16px"
              />
              <Button
                text="Complete"
                color="#6a5be2"
                height="40px"
                width="120px"
                fontSize="16px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
