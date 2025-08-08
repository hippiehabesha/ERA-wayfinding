<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DepartmentList from "./Lists/department_list";
import BlockList from "./Lists/block_list";
import SearchList from "./Lists/search_list";
import Detail from "./detail";
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
    navigate("/list/search", { state: { searchTerm } });
  };

  const handleLocationClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleListRedirect = () => {
    navigate("/list/department_list");
  };

  const handleBlockListRedirect = () => {
    navigate("/list/block_list");
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
            {language === "en" ? "SEARCH YOUR something" : "የመዳረሻዎን ይፈልጉ"}
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
            <button
              className="home-block-button"
              onClick={handleBlockListRedirect}>
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
        <Route path="/list/department_list" element={<DepartmentList />} />
        <Route path="/list/block_list" element={<BlockList />} />
        <Route path="/list/search_list" element={<SearchList />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
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
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  //newly added 
  // useEffect(() => {
  //   const updateScale = () => {
  //     const scaleX = window.innerWidth / 1080;
  //     const scaleY = window.innerHeight / 1920;
  //     const scale = Math.min(scaleX, scaleY);
  //     document.documentElement.style.setProperty("--scale-factor", scale.toString());
  //   };
  //   updateScale();
  //   window.addEventListener("resize", updateScale);
  //   return () => window.removeEventListener("resize", updateScale);
  // }, []);  

  //ends here 

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

  return (
    <>
    
    
      {/* <div className="top-video-container">
        <video src="/b.mp4" autoPlay loop muted className="home-top-video" />
      </div> */}

      <div className="home-container">
         <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
          }}
        ></div>
        
        <div className="home-top-bar">
          <div className="language-selector">
            <img src="/subway_world-1.svg" alt="globalImage" 
             />
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="language-dropdown" >
                
                 <option value="" disabled hidden>language</option>
              < option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>
        </div>
        
        <div
          className="home-content"
          // style={{
          //   backgroundImage: `url(${backgrounds[bgIndex]})`,
          //   backgroundRepeat: "no-repeat",
          // }}
          >
          <h1 className="home-title">
            {language === "en" ? "SEARCH YOUR DESTINATION" : "የመዳረሻዎን ይፈልጉ"}
          </h1>
          <div className="home-search-row">
             <img src="mingcute_search-fill.svg" alt="searchImage" className="home-search-icon"
             />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={language === "en" ? "Search..." : "ፈልግ..."}
              className="home-search-input"
            />
            <button onClick={handleSearch} className="home-search-button">
             
            </button>
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
            <img src="gridicons_location.svg" alt="locationImage" className="home-location-icon" />
            {language === "en" ? "CURRENT LOCATION" : "የአሁኑ ቦታ"}
          </button>
          <button
            className="home-feedback-button"
            onClick={() => window.open("mailto:feedback@example.com", "_blank")}
          >
            <img src="ic_baseline-feedback.svg" alt="feedbackImage" className="home-feedback-icon" />
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
       </div>
      {/* <div className="bottom-video-container">
        <video src="/a.mp4" autoPlay loop muted className="home-bottom-video" />
     
      </div> */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/block_list" element={<BlockList />} />
        <Route path="/list/search" element={<SearchList />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
>>>>>>> fanuel_branch
