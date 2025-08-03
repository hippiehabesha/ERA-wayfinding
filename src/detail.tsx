import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Accept both `department` and `detail` keys, fallback to null
  const data =
    state?.department && typeof state.department === "object"
      ? state.department
      : state?.detail && typeof state.detail === "object"
      ? state.detail
      : null;

  const [showLocation, setShowLocation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!data)
    return (
      <div className="detail-container">
        <p>No data found. Please go back.</p>
        <button onClick={() => navigate(-1)} className="detail-btn">
          Go Back
        </button>
      </div>
    );

  return (
    <div className="detail-container">
      {/* Card */}
      <div className="detail-card">
        <img
          src="/profile_picture.jpg"
          alt="Profile"
          className="detail-profile-img"
        />
        <h2 className="detail-name">{data.wname}</h2>
        <p className="detail-department">{data.department}</p>
        <p className="detail-contact">📞 {data.wcontact}</p>

        <div className="detail-destination">
          <p className="detail-destination-title">
            Your Desired Destination is
          </p>
          <div className="detail-destination-grid">
            <div>
              <p className="detail-icon">🏢</p>
              <p>Block</p>
              <p className="detail-value">{data.block}</p>
            </div>
            <div>
              <p className="detail-icon">🧱</p>
              <p>Floor</p>
              <p className="detail-value">{data.floor}</p>
            </div>
            <div>
              <p className="detail-icon">🚪</p>
              <p>Room</p>
              <p className="detail-value">{data.officeno}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="detail-buttons">
        <button onClick={() => setShowLocation(true)} className="detail-btn">
          📍 CURRENT LOCATION
        </button>
        <button onClick={() => setShowFeedback(true)} className="detail-btn">
          📝 FEEDBACK
        </button>
      </div>

      {/* Location Dialog */}
      {showLocation && (
        <div className="detail-modal-overlay">
          <div className="detail-modal">
            <p className="detail-modal-title">You are at work</p>
            <button
              onClick={() => setShowLocation(false)}
              className="detail-modal-back">
              Back
            </button>
          </div>
        </div>
      )}

      {/* Feedback Dialog */}
      {showFeedback && (
        <div className="detail-modal-overlay">
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
                  }}>
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
                  placeholder="Write your comment (100–120 words)..."
                  className="detail-textarea"
                />
                <div className="detail-modal-actions">
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackSent(false);
                      setFeedback("");
                    }}
                    className="detail-modal-back">
                    Back
                  </button>
                  <button
                    disabled={!feedback.trim()}
                    onClick={async () => {
                      // Prepare feedback data
                      const feedbackData = {
                        department: data.department,
                        title: data.wtitle,
                        name: data.wname,
                        feedback_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
                        feedback_text: feedback,
                      };

                      // Send feedback to backend (assumes endpoint exists)
                      try {
                        await fetch("/api/feedback", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(feedbackData),
                        });
                        setFeedbackSent(true);
                        setFeedback("");
                      } catch (err) {
                        // Optionally handle error
                      }
                    }}
                    className="detail-btn">
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
