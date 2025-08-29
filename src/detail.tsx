import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import "./detail.css";

// Type for department/detail data
type DetailData = {
  wname: string;
  wnameamh: string;
  department: string;
  departmentamh: string;
  wcontact: string;
  block: string;
  floor: string;
  officeno: string;
  wtitle?: string;
  wtitleamh?: string;
};

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { language } = useLanguage();

  // Accept both `department` and `detail` keys, fallback to null
  const data: DetailData | null =
    state?.department && typeof state.department === "object"
      ? state.department
      : state?.detail && typeof state.detail === "object"
      ? state.detail
      : null;

  const [showLocation, setShowLocation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const apiURL = "http://localhost:3001";

  if (!data)
    return (
      <div className="detail-container">
        <p>{language === "am" ? "ምንም መረጃ አልተገኘም። እባክዎ ተመለሱ።" : "No data found. Please go back."}</p>
        <button onClick={() => navigate(-1)} className="detail-btn">
          {language === "am" ? "ተመለስ" : "Go Back"}
        </button>
      </div>
    );

  // Get language-appropriate text values
  const departmentText =
    typeof data.department === "string"
      ? (language === "am" ? data.departmentamh : data.department)
      : Array.isArray(data.department)
      ? data.department.join(", ")
      : "";
  
  const nameText = language === "am" ? data.wnameamh : data.wname;
  const titleText = language === "am" ? data.wtitleamh : data.wtitle;

  return (
    <div className="detail-container">
      {/* Card */}
      <div className="back-button-department" onClick={() => navigate(-1)}>
        <img
          src="/Vector.svg"
          alt="BackImage"
          className="back-button-details-icon"
        />
      </div>
      <div className="detail-card">
        <img
          src="/profile_picture.jpg"
          alt={`${data.wname}'s profile`}
          className="detail-profile-img"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/120?text=No+Image";
          }}
        />
        <h2 className="detail-name">{nameText}</h2>
        <p className="detail-department">{departmentText}</p>
        <p className="detail-contact" aria-label={`Contact: ${data.wcontact}`}>
          <img
            src="/Vector-phone.svg"
            alt="Phone Icon"
            className="phone-icon"
          />
          {data.wcontact}
        </p>

        <div className="detail-destination">
          <p className="detail-destination-title">
            {language === "am" ? "የእርስዎ የተፈለገ መድረሻ" : "Your Desired Destination is"}
          </p>
          <div className="detail-destination-grid">
            <div>
              <p className="detail-icon" aria-label="Block">
                <img
                  src="/Vector-block.svg"
                  alt="block Icon"
                  className="block-icon"
                />
              </p>
              <p className="block-p">{language === "am" ? "ቦሎክ" : "Block"}</p>
              <p className="detail-value">{data.block}</p>
            </div>
            <div>
              <p className="detail-icon" aria-label="Floor">
                <img
                  src="/stairs.svg"
                  alt="stairs Icon"
                  className="stairs-icon"
                />
              </p>
              <p className="block-p">{language === "am" ? "ፎቅ" : "Floor"}</p>
              <p className="detail-value">{data.floor}</p>
            </div>
            <div>
              <p className="detail-icon" aria-label="Room">
                <img
                  src="/Vector-room.svg"
                  alt="room Icon"
                  className="room-icon"
                />
              </p>
              <p className="block-p">{language === "am" ? "ክፍል" : "Room"}</p>
              <p className="detail-value">{data.officeno}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="detail-buttons">
        <button
          onClick={() => setShowLocation(true)}
          className="detail-btn"
          aria-label="Show current location">
          <img
            src="/gridicons_location.svg"
            alt="location Icon"
            className="location-icon"
          />
          {language === "am" ? "የአሁኑ ቦታ" : "CURRENT LOCATION"}
        </button>
        <button
          onClick={() => setShowFeedback(true)}
          className="detail-btn"
          aria-label="Leave feedback">
          <img
            src="/ic_baseline-feedback.svg"
            alt="feedback Icon"
            className="feedback-icon"
          />
          {language === "am" ? "አስተያየት" : "FEEDBACK"}
        </button>
      </div>

      {/* Location Dialog */}
      {showLocation && (
        <div className="detail-modal-overlay" role="dialog" aria-modal="true">
          <div className="detail-modal">
            <p className="detail-modal-title">{language === "am" ? "በስራ ቦታዎ ነዎት" : "You are at work"}</p>
            <button
              onClick={() => setShowLocation(false)}
              className="detail-modal-back"
              aria-label="Close location dialog">
              {language === "am" ? "ተመለስ" : "Back"}
            </button>
          </div>
        </div>
      )}

      {/* Feedback Dialog */}
      {showFeedback && (
        <div className="detail-modal-overlay" role="dialog" aria-modal="true">
          <div className="detail-modal detail-modal-feedback">
            {/* Back button at top right */}
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
              }}
              aria-label="Close feedback"
              onClick={() => {
                setShowFeedback(false);
                setFeedbackSent(false);
                setFeedback("");
                setFeedbackError(null);
              }}>
              ⨉
            </button>
            <h3 className="detail-modal-title">{language === "am" ? "አስተያየትዎን ይተዉ" : "Leave Your Feedback"}</h3>
            {feedbackSent ? (
              <>
                <p className="detail-success-msg">
                  {language === "am" ? "ለአስተያየትዎ እናመሰግናለን!" : "Thank you for your feedback!"}
                </p>
                <button
                  style={{ marginTop: "16px" }}
                  className="detail-modal-back"
                  onClick={() => {
                    setShowFeedback(false);
                    setFeedbackSent(false);
                    setFeedback("");
                    setFeedbackError(null);
                  }}
                  aria-label="Back">
                  {language === "am" ? "ተመለስ" : "Back"}
                </button>
              </>
            ) : (
              <>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  maxLength={800}
                  placeholder={language === "am" ? "አስተያየትዎን ይጻፉ (እስከ 800 ቁምፊዎች ድረስ)..." : "Write your comment (up to 800 characters)..."}
                  className="detail-textarea"
                  aria-label="Feedback text"
                />
                {feedbackError && (
                  <p className="detail-error-msg" style={{ color: "red" }}>
                    {feedbackError}
                  </p>
                )}
                <div className="detail-modal-actions">
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackSent(false);
                      setFeedback("");
                      setFeedbackError(null);
                    }}
                    className="detail-modal-back"
                    aria-label="Back">
                    {language === "am" ? "ተመለስ" : "Back"}
                  </button>
                  <button
                    disabled={!feedback.trim()}
                    onClick={async () => {
                      // Prepare feedback data
                      const feedbackData = {
                        department: departmentText,
                        title: titleText || "",
                        name: nameText,
                        feedback_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
                        feedback_text: feedback,
                      };

                      // Send feedback to backend (assumes endpoint exists)
                      try {
                        setFeedbackError(null);
                        const resp = await fetch(`${apiURL}/api/feedback`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(feedbackData),
                        });
                        if (!resp.ok) {
                          throw new Error("Failed to send feedback.");
                        }
                        setFeedbackSent(true);
                        setFeedback("");
                      } catch (err) {
                        setFeedbackError(
                          language === "am" ? "አስተያየት መላክ አልተቻለም። እባክዎ ደግመው ይሞክሩ።" : "Failed to send feedback. Please try again later."
                        );
                      }
                    }}
                    className="detail-btn-send"
                    aria-label="Send feedback">
                    {language === "am" ? "ላክ" : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
