import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";

// Type for department/detail data
type DetailData = {
  wname: string;
  department: string;
  wcontact: string;
  block: string;
  floor: string;
  officeno: string;
  wtitle?: string;
};

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
  const apiURL = import.meta.env.VITE_API_URL || "";

  if (!data)
    return (
      <div className="detail-container">
        <p>No data found. Please go back.</p>
        <button onClick={() => navigate(-1)} className="detail-btn">
          Go Back
        </button>
      </div>
    );

  // Fallback for department field if it's not a string
  const departmentText =
    typeof data.department === "string"
      ? data.department
      : Array.isArray(data.department)
      ? data.department.join(", ")
      : "";

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
        <h2 className="detail-name">{data.wname}</h2>
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
            Your Desired Destination is
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
              <p className="block-p">Block</p>
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
              <p className="block-p">Floor</p>
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
              <p className="block-p">Room</p>
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
          CURRENT LOCATION
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
          FEEDBACK
        </button>
      </div>

      {/* Location Dialog */}
      {showLocation && (
        <div className="detail-modal-overlay" role="dialog" aria-modal="true">
          <div className="detail-modal">
            <p className="detail-modal-title">You are at work</p>
            <button
              onClick={() => setShowLocation(false)}
              className="detail-modal-back"
              aria-label="Close location dialog">
              Back
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
                fontSize: "1.2rem",
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
            <h3 className="detail-modal-title">Leave your feedback</h3>
            {feedbackSent ? (
              <>
                <p className="detail-success-msg">
                  Thank you for your feedback!
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
                  Back
                </button>
              </>
            ) : (
              <>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  maxLength={800}
                  placeholder="Write your comment (up to 800 characters)..."
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
                    Back
                  </button>
                  <button
                    disabled={!feedback.trim()}
                    onClick={async () => {
                      // Prepare feedback data
                      const feedbackData = {
                        department: departmentText,
                        title: data.wtitle || "",
                        name: data.wname,
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
                          "Failed to send feedback. Please try again later."
                        );
                      }
                    }}
                    className="detail-btn"
                    aria-label="Send feedback">
                    Send
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
