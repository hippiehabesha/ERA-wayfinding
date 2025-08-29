import React, { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BlockList from "./Lists/block_list";
import SearchList from "./Lists/search_list";
import Detail from "./detail";
import DepartmentList from "./Lists/department_list";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import "./App.css";

const backgrounds = [
  "/background-1.jpg",
  "/background-2.jpg",
  "/background-3.jpg",
  "/background-4.jpg",
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("Report");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    navigate("/list/search", { state: { searchTerm } });
  };

  const handleLocationClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleListRedirect = () => {
    navigate("/list");
  };

  const handleBlockListRedirect = () => {
    navigate("/list/block_list");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleOpenFeedback = () => {
    setIsFeedbackOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
    setFeedbackText("");
    setFeedbackType("Report");
  };

  const handleSendFeedback = async () => {
    setFeedbackStatus("idle"); // reset status before send
    try {
      const response = await fetch("http://localhost:3001/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: feedbackType,
          comment: feedbackText,
        }),
      });

      if (response.ok) {
        setFeedbackStatus("success");
        setFeedbackText(""); // optional: clear textarea
      } else {
        setFeedbackStatus("error");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setFeedbackStatus("error");
    }
  };

  return (
    <>
      <div className="home-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
          }}></div>

        <div className="home-top-bar">
          <div className="language-selector">
            <img src="/subway_world-1.svg" alt="globalImage" />
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="language-dropdown">
              <option value="" disabled hidden>
                language
              </option>
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>
        </div>

        <div className="home-content">
          <h1 className="home-title">
            {language === "en" ? "SEARCH YOUR DESTINATION" : "የመዳረሻዎን ይፈልጉ"}
          </h1>

          {/* 👇 UPDATED SEARCH BAR */}
          <div className="home-search-row">
            <div className="search-input-wrapper">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Search..." : "ፈልግ..."}
                className="home-search-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button
                className="search-icon-button"
                onClick={handleSearch}
                aria-label="Search">
                <img
                  src="mingcute_search-fill.svg"
                  alt="search"
                  className="search-icon-img"
                />
              </button>
            </div>
          </div>

          <div className="home-buttons-row">
            <button
              className="home-department-button"
              onClick={handleListRedirect}>
              {language === "en" ? "DEPARTMENT" : "ዲፓርትመንት"}
            </button>
            <button
              className="home-block-button"
              onClick={handleBlockListRedirect}>
              {language === "en" ? "BLOCK" : "ቦሎክ"}
            </button>
          </div>

          <button
            onClick={handleLocationClick}
            className="home-location-button">
            <img
              src="gridicons_location.svg"
              alt="locationImage"
              className="home-location-icon"
            />
            {language === "en" ? "CURRENT LOCATION" : "የአሁኑ ቦታ"}
          </button>

          <button className="home-feedback-button" onClick={handleOpenFeedback}>
            <img
              src="ic_baseline-feedback.svg"
              alt="feedbackImage"
              className="home-feedback-icon"
            />
            {language === "en" ? "COMMENT" : "አስተያየት"}
          </button>
        </div>

        {openDialog && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <p className="dialog-text">
                {language === "en" ? "You are at work" : "በስራ ቦታዎ ነዎት"}
              </p>
              <button
                onClick={handleCloseDialog}
                className="dialog-close-button">
                {language === "en" ? "Close" : "ዝጋ"}
              </button>
            </div>
          </div>
        )}
        {isFeedbackOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content orange-theme">
              <h3 className="dialog-title">
                {language === "en" ? "Submit Feedback" : "አስተያየት ያቅርቡ"}
              </h3>

              <select
                className="dialog-select"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}>
                <option value="Report">
                  {language === "en" ? "Report" : "ሪፖርት"}
                </option>
                <option value="Feedback">
                  {language === "en" ? "Feedback" : "አስተያየት"}
                </option>
                <option value="Issue">
                  {language === "en" ? "Issue" : "ችግር"}
                </option>
              </select>

              <textarea
                className="dialog-textarea"
                placeholder={
                  language === "en"
                    ? "Enter your message here..."
                    : "መልእክትዎን እዚህ ያስገቡ..."
                }
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />

              {/* 🟢 Feedback Status Messages */}
              {feedbackStatus === "success" && (
                <p className="feedback-success-message">
                  {language === "en"
                    ? "✅ Your comment has been submitted!"
                    : "✅ አስተያየትዎ ተልኳል።"}
                </p>
              )}

              {feedbackStatus === "error" && (
                <p className="feedback-error-message">
                  {language === "en"
                    ? "❌ Something went wrong. Please try again."
                    : "❌ ችግር ተፈጥሯል። እባክዎ ደግመው ይሞክሩ።"}
                </p>
              )}

              {/* 🔘 Buttons */}
              <div className="dialog-buttons-row">
                <button onClick={handleCloseFeedback} className="dialog-button">
                  {language === "en" ? "Back" : "ተመለስ"}
                </button>
                <button
                  onClick={handleSendFeedback}
                  className="dialog-button send">
                  {language === "en" ? "Send" : "ላክ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/block_list" element={<BlockList />} />
          <Route path="/list/search" element={<SearchList />} />
          <Route path="/list" element={<DepartmentList />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
