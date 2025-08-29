import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import "./department_list.css";

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

type DataRow = {
  block: string;
  department_Category: string;
  department: string;
  departmentamh: string;
  floor: string;
  officeno: string;
  wcontact: string;
  wid: string;
  wname: string;
  wnameamh: string;
  wtitle: string;
  wtitleamh: string;
};

const DepartmentList: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Show all");
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((json: DataRow[]) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const filtered =
    selectedCategory === "Show all"
      ? data
      : data.filter((row) => row.department_Category === selectedCategory);

  if (loading) return <div className="department-list-loading">{language === "am" ? "በመጫን ላይ..." : "Loading..."}</div>;

  return (
    <div className="department-list-container">
      {/* Back button */}
      <div className="back-button-department" onClick={() => navigate(-1)}>
        <img
          src="/Vector.svg"
          alt="BackImage"
          className="back-button-department-icon"
        />
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
                {language === "am" ? row.wtitleamh : row.wtitle}
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
        <div className="department-list-empty">{language === "am" ? "ምንም ማዕረግ አልተገኘም።" : "No titles found."}</div>
      )}
    </div>
  );
};

export default DepartmentList;
