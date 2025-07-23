import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./search_list.css";

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

const SearchList: React.FC = () => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm?.toLowerCase() || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const data = parseCSV(text);
        const filtered = data.filter(
          (row) =>
            row.department?.toLowerCase().includes(searchTerm) ||
            row.wname?.toLowerCase().includes(searchTerm) ||
            row.wtitle?.toLowerCase().includes(searchTerm)
        );
        setResults(filtered);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) return <div className="search-list-loading">Loading...</div>;
  if (!results.length)
    return <div className="search-list-empty">No results found.</div>;

  return (
    <div className="search-list-container">
      <h2 className="search-list-title">Search Results</h2>
      <ul className="search-list-ul">
        {results.map((row, idx) => (
          <li key={idx} className="search-list-item">
            <div className="search-list-row">
              <span className="search-list-label">Department:</span>{" "}
              {row.department}
            </div>
            <div className="search-list-row">
              <span className="search-list-label">Name:</span> {row.wname}
            </div>
            <div className="search-list-row">
              <span className="search-list-label">Title:</span> {row.wtitle}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
