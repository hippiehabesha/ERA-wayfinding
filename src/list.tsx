// src/List.jsx
import { useState, useEffect } from "react";
import "./list.css";

const backgrounds = [
  "/background-1.jpg",
  "/background-2.jpg",
  "/background-3.jpg",
  "/background-4.jpg",
];

function List() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgrounds[bgIndex]})`,
      }}>
      <h2>This is the List page</h2>
    </div>
  );
}

export default List;
