import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Student.css";

export default function Dashboard() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.get("/surveys").then((res) => setSurveys(res.data));
  }, []);

  return (
    <div className="student-page">
      <h1>Available Surveys</h1>

      <div className="student-survey-grid">
        {surveys.map((s) => (
          <Link
            key={s._id}
            to={`/student/survey/${s._id}`}
            className="student-survey-card"
          >
            <h3>{s.title}</h3>
            <p>{s.subject}</p>
            <span>Give Feedback →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
