import { useEffect, useState } from "react";
import api from "../../api/axios";
import SurveyChart from "../../components/SurveyChart";
import "./Admin.css";

export default function AdminDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    api.get("/surveys").then((res) => setSurveys(res.data));
    api.get("/admin/responses").then((res) => setResponses(res.data));
  }, []);

  // ✅ FIXED RESPONSE COUNT
  const responseCount = (surveyId) =>
    responses.filter((r) => r.survey === surveyId || r.survey?._id === surveyId)
      .length;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-stats">
        <div className="stat-box">
          <h2>{surveys.length}</h2>
          <p>Total Surveys</p>
        </div>

        <div className="stat-box">
          <h2>{responses.length}</h2>
          <p>Total Responses</p>
        </div>
      </div>

      <SurveyChart
        title="Survey Participation"
        labels={surveys.map((s) => s.title)}
        values={surveys.map((s) => responseCount(s._id))}
      />

      <div className="survey-grid">
        {surveys.map((s) => (
          <div key={s._id} className="survey-card">
            <h4>{s.title}</h4>
            <p>{s.subject}</p>
            <strong>{responseCount(s._id)} Responses</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
