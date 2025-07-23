// src/components/BlockList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./block_list.css";

const BLOCKS = ["A", "B", "C"];
const CSV_PATH = "/data.csv";

function parseCSV(text: string) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

const BlockList: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState("A");
  const [departments, setDepartments] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(CSV_PATH)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CSV");
        return res.text();
      })
      .then((text) => {
        const data = parseCSV(text);
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredList = departments
      .filter((dep) => dep.block === selectedBlock)
      .sort((a, b) => (a.department || "").localeCompare(b.department || ""));
    setFiltered(filteredList);
  }, [departments, selectedBlock]);

  const handleClick = (dep: any) => {
    navigate("/detail", { state: { department: dep } });
  };

  return (
    <div className="block-list-container">
      <div className="block-list-filter">
        {BLOCKS.map((block) => (
          <button
            key={block}
            onClick={() => setSelectedBlock(block)}
            className={`block-list-btn${
              selectedBlock === block ? " active" : ""
            }`}>
            Block {block}
          </button>
        ))}
      </div>

      <div className="block-list-card">
        <h2 className="block-list-title">Block {selectedBlock} Departments</h2>

        {loading ? (
          <p className="block-list-loading">Loading data...</p>
        ) : error ? (
          <p className="block-list-error">Error: {error}</p>
        ) : (
          <ul className="block-list-ul">
            {filtered.length === 0 ? (
              <li className="block-list-empty">No departments found.</li>
            ) : (
              filtered.map((dep, idx) => (
                <li
                  key={idx}
                  className="block-list-li"
                  onClick={() => handleClick(dep)}>
                  {dep.department || "Unnamed Department"}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlockList;
