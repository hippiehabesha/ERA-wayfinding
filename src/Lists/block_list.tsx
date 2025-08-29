// src/components/BlockList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import "./block_list.css";

const BLOCKS = ["A", "B", "C"];

type Department = {
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

const BlockList: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState("A");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filtered, setFiltered] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data: Department[]) => {
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
      .sort((a, b) => {
        const deptA = language === "am" ? a.departmentamh : a.department;
        const deptB = language === "am" ? b.departmentamh : b.department;
        return (deptA || "").localeCompare(deptB || "");
      });
    setFiltered(filteredList);
  }, [departments, selectedBlock, language]);

  const handleClick = (dep: Department) => {
    navigate("/detail", { state: { department: dep } });
  };

  return (
    <div className="block-list-container">
      <div className="block-list-bg">
        <div className="block-list-container">
          <div className="block-list-header">
            <div className="back-button" onClick={() => navigate(-1)}>
              <img
                src="/Vector.svg"
                alt="BackImage"
                className="back-button-icon"
              />
            </div>
            <div className="block-list-filter">
              {BLOCKS.map((block) => (
                <button
                  key={block}
                  onClick={() => setSelectedBlock(block)}
                  className={`block-list-btn${
                    selectedBlock === block ? " active" : ""
                  }`}>
{language === "am" ? `ቦሎክ ${block}` : `Block ${block}`}
                </button>
              ))}
            </div>
          </div>

          <div className="block-list-card">
            <h2 className="block-list-title">
              {language === "am" ? `ቦሎክ ${selectedBlock} ዲፓርትመንቶች` : `Block ${selectedBlock} Departments`}
            </h2>

            {loading ? (
              <p className="block-list-loading">{language === "am" ? "መረጃ በመጫን ላይ..." : "Loading data..."}</p>
            ) : error ? (
              <p className="block-list-error">{language === "am" ? "ስህተት:" : "Error:"} {error}</p>
            ) : (
              <ul className="block-list-ul">
                {filtered.length === 0 ? (
                  <li className="block-list-empty">{language === "am" ? "ምንም ዲፓርትመንት አልተገኘም።" : "No departments found."}</li>
                ) : (
                  filtered.map((dep, idx) => (
                    <li
                      key={idx}
                      className="block-list-li"
                      onClick={() => handleClick(dep)}>
                      <span className="block-list-text">
                        {((language === "am" ? dep.departmentamh : dep.department) || (language === "am" ? "ስም የሌለው ዲፓርትመንት" : "Unnamed Department")).replace(
                          /"/g,
                          ""
                        )}
                      </span>
                      <button
                        className="plus-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(dep);
                        }}>
                        <img
                          src="/octicon_feed-plus-16.svg" // or .png, adjust path as needed
                          alt="Additional Info"
                          className="plus-btn-img"
                        />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockList;
