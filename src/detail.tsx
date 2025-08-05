import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Accept both `department` and `detail` keys
  const data = state?.department || state?.detail;

  const [showLocation, setShowLocation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (!data) return <p>No data found. Please go back.</p>;

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
            <h3 className="detail-modal-title">Leave your feedback</h3>
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
                onClick={() => setShowFeedback(false)}
                className="detail-modal-back">
                Back
              </button>
              <button
                onClick={() => {
                  console.log("Feedback submitted:", feedback);
                  setShowFeedback(false);
                }}
                className="detail-btn">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
