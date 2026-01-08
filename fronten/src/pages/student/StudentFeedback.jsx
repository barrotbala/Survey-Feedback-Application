import { useState } from "react";
import api from "../../api/axios";
import "./Student.css";

export default function StudentFeedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const submitFeedback = async () => {
    if (!message) {
      alert("Please write feedback");
      return;
    }

    await api.post("/student-feedback", {
      rating,
      message,
    });

    alert("Thank you for your feedback ❤️");
    setRating(0);
    setMessage("");
  };

  return (
    <div className="student-page">
      <h1>Student Feedback</h1>

      <div className="feedback-card">
        <p>How was your overall experience?</p>

        {/* STAR RATING */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={rating >= n ? "active" : ""}
              onClick={() => setRating(n)}
            >
              ★
            </span>
          ))}
        </div>

        {/* TEXT */}
        <textarea
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="submit-feedback" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
