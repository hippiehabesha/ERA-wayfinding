import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import "./search_list.css";

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

const SearchList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const searchTerm = location.state?.searchTerm?.toLowerCase() || "";
  const [results, setResults] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [localFilter, setLocalFilter] = useState<string>("");

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data: DataRow[]) => {
        const filtered = data.filter(
          (row) => {
            const dept = language === "am" ? row.departmentamh : row.department;
            const name = language === "am" ? row.wnameamh : row.wname;
            const title = language === "am" ? row.wtitleamh : row.wtitle;
            
            return dept?.toLowerCase().includes(searchTerm) ||
                   name?.toLowerCase().includes(searchTerm) ||
                   title?.toLowerCase().includes(searchTerm);
          }
        );
        // Sort alphabetically by department, then wname
        filtered.sort((a, b) => {
          const depA = (language === "am" ? a.departmentamh : a.department || "").toLowerCase();
          const depB = (language === "am" ? b.departmentamh : b.department || "").toLowerCase();
          if (depA < depB) return -1;
          if (depA > depB) return 1;
          const nameA = (language === "am" ? a.wnameamh : a.wname || "").toLowerCase();
          const nameB = (language === "am" ? b.wnameamh : b.wname || "").toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setResults(filtered);
        setLoading(false);
      });
  }, [searchTerm, language]);

  const handleItemClick = (row: DataRow) => {
    navigate("/detail", { state: { detail: row } });
  };

  // Filter results by local search input (case-insensitive, by name)
  const filteredResults = localFilter
    ? results.filter(
        (row) => {
          const name = language === "am" ? row.wnameamh : row.wname;
          return name && name.toLowerCase().includes(localFilter.toLowerCase());
        }
      )
    : results;

  if (loading) return <div className="search-list-loading">{language === "am" ? "በመጫን ላይ..." : "Loading..."}</div>;
  if (!results.length)
    return <div className="search-list-empty">{language === "am" ? "ምንም ውጤት አልተገኘም።" : "No results found."}</div>;

  return (
    <div className="search-list-container">
      <div className="back-button-search" onClick={() => navigate(-1)}>
        <img
          src="/Vector.svg"
          alt="BackImage"
          className="back-button-search-icon"
        />
      </div>
      <h2 className="search-list-title">{language === "am" ? "የፍለጋ ውጤቶች" : "Search Results"}</h2>
      {/* Replace A-Z filter with a search input */}
      <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <input
          type="text"
          className="search-list-search-input"
          placeholder={language === "am" ? "በስም ያጣሩ..." : "Filter by name..."}
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #d0d0d0",
            fontSize: "1rem",
            width: "240px",
            maxWidth: "100%",
          }}
        />
      </div>
      <ul className="search-list-ul">
        {filteredResults.map((row, idx) => (
          <li
            key={idx}
            className="search-list-item"
            onClick={() => handleItemClick(row)}
            style={{ cursor: "pointer" }}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleItemClick(row);
            }}>
            <div className="search-list-row">
              <span className="search-list-label">{language === "am" ? "ዲፓርትመንት:" : "Department:"}</span>{" "}
              {language === "am" ? row.departmentamh : row.department}
            </div>
            <div className="search-list-row">
              <span className="search-list-label">{language === "am" ? "ስም:" : "Name:"}</span> {language === "am" ? row.wnameamh : row.wname}
            </div>
            <div className="search-list-row">
              <span className="search-list-label">{language === "am" ? "ማዕረግ:" : "Title:"}</span> {language === "am" ? row.wtitleamh : row.wtitle}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
