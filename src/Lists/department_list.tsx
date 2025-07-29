import React, { useEffect, useState } from "react";
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
      <h2 className="department-list-title">Department</h2>
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
      <ul className="department-list-ul">
        {filtered.map((row, idx) => (
          <li key={idx} className="department-list-item">
            <div className="department-list-row">
              <span className="department-list-title-label"></span> {row.wtitle}
            </div>
          </li>
        ))}
      </ul>
      {!filtered.length && (
        <div className="department-list-empty">No titles found.</div>
      )}
    </div>
  );
};

export default DepartmentList;
