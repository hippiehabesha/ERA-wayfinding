import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./department_list.css";

function parseCSV(csv: string) {
  const lines = csv.split("\n").filter(Boolean);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

const categories = [
  "Show all",
  "Administrative Board Office",
  "Director General",
  "Project Development. DDG",
  "Corporate Services. DDG",
  "Road Asset Management. DDG",
  "Office of Director General. DDG",
  "Construction Projects Management. DDG",
];

const DepartmentList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Show all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        setData(parseCSV(text));
        setLoading(false);
      });
  }, []);

  // Filter data by selected department_category
  const filtered =
    selectedCategory === "Show all"
      ? data
      : data.filter((row) => row.department_Category === selectedCategory);

  if (loading) return <div className="department-list-loading">Loading...</div>;

  return (
    <div className="department-list-container">
      <div className="back-button-department" onClick={() => navigate(-1)}>
        <img
          src="/Vector.svg"
          alt="BackImage"
          className="back-button-department-icon"
        />
      </div>
      <div className="department-list-category-carousel">
        <button onClick={handlePrev} disabled={startIdx === 0}>
          Prev
        </button>
        <div className="department-list-category-filter">
          {categories.slice(startIdx, startIdx + visibleCount).map((cat) => (
            <button
              key={cat}
              className={`department-list-category-btn${
                selectedCategory === cat ? " active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={startIdx >= categories.length - visibleCount}>
          Next
        </button>
      </div>
      <div className="department-list-card">
        <ul className="department-list-ul">
          {filtered.map((row, idx) => (
            <li
              key={idx}
              className="department-list-item"
              onClick={() =>
                navigate("/detail", { state: { department: row } })
              }
              style={{ cursor: "pointer" }}>
              <div className="department-list-row">
                <span className="department-list-title-label"></span>{" "}
                {row.wtitle}
              </div>
              <button
                className="plus-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/detail", { state: { department: row } });
                }}>
                <img
                  src="/octicon_feed-plus-16.svg" // or .png, adjust path as needed
                  alt="Additional Info"
                  className="plus-btn-img"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Horizontal scrollable category filter */}
      <div className="department-list-category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`department-list-category-btn${
              selectedCategory === cat ? " active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Department list */}
      <div className="department-list-card">
        <ul className="department-list-ul">
          {filtered.map((row, idx) => (
            <li
              key={idx}
              className="department-list-item"
              onClick={() =>
                navigate("/detail", { state: { department: row } })
              }
              style={{ cursor: "pointer" }}>
              <div className="department-list-row">
                <span className="department-list-title-label"></span>{" "}
                {row.wtitle}
              </div>
              <button
                className="plus-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/detail", { state: { department: row } });
                }}>
                <img
                  src="/octicon_feed-plus-16.svg"
                  alt="Additional Info"
                  className="plus-btn-img"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* No results */}
      {!filtered.length && (
        <div className="department-list-empty">No titles found.</div>
      )}
    </div>
  );
};

export default DepartmentList;
