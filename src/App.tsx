import React, { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import List from "./list";
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
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

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
    alert(`Searching for: ${searchTerm}`);
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

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <>
      <div className="top-video-container">
        <video src="/b.mp4" autoPlay loop muted className="home-top-video" />
      </div>
      <div className="home-container">
        <div className="home-top-bar">
          <div className="language-selector">
            <span role="img" aria-label="globe">
              🌐
            </span>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="language-dropdown">
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>
        </div>
        <div
          className="home-content"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
            backgroundRepeat: "no-repeat",
          }}>
          <h1 className="home-title">
            {language === "en" ? "SEARCH YOUR DESTINATION" : "የመዳረሻዎን ይፈልጉ"}
          </h1>
          <div className="home-search-row">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={language === "en" ? "Search..." : "ፈልግ..."}
              className="home-search-input"
            />
            <button onClick={handleSearch} className="home-search-button">
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </div>
          <div className="home-buttons-row">
            <button
              className="home-department-button"
              onClick={handleListRedirect}>
              {language === "en" ? "DEPARTMENT" : "ዲፓርትመንት"}
            </button>
            <button className="home-block-button" onClick={handleListRedirect}>
              {language === "en" ? "BLOCK" : "ቦሎክ"}
            </button>
          </div>
          <button
            onClick={handleLocationClick}
            className="home-location-button">
            <span role="img" aria-label="location">
              📍
            </span>
            {language === "en" ? "CURRENT LOCATION" : "የአሁኑ ቦታ"}
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
      </div>
      <div className="bottom-video-container">
        <video src="/a.mp4" autoPlay loop muted className="home-bottom-video" />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
