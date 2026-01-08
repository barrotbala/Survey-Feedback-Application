import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "./Student.css";

export default function SurveyPage() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await api.get(`/surveys/${id}`);
        setSurvey(res.data);
      } catch (err) {
        console.error("Failed to load survey", err);
        alert("Unable to load survey");
      }
    };

    fetchSurvey();
  }, [id]);

  const setAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const submitSurvey = async () => {
    const payload = {
      surveyId: id,
      answers: Object.entries(answers).map(([q, v]) => ({
        questionId: q,
        value: v,
      })),
    };

    await api.post("/responses", payload);
    alert("Thank you for your feedback!");
  };

  if (!survey) return <p>Loading...</p>;

  return (
    <div className="student-page">
      <h1>{survey.title}</h1>

      <div className="feedback-card">
        {survey.questions.map((q) => (
          <div key={q._id} className="question-block">
            <p className="question-text">{q.questionText}</p>

            {/* STAR RATING */}
            {q.type === "star" && (
              <div className="stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={answers[q._id] >= n ? "active" : ""}
                    onClick={() => setAnswer(q._id, n)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {/* EMOJI */}
            {q.type === "emoji" && (
              <div className="emojis">
                {["😡", "😐", "🙂", "😍"].map((e) => (
                  <span
                    key={e}
                    className={answers[q._id] === e ? "active" : ""}
                    onClick={() => setAnswer(q._id, e)}
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}

            {/* SLIDER */}
            {q.type === "slider" && (
              <div className="slider-box">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={answers[q._id] ?? 5}
                  onChange={(e) => setAnswer(q._id, Number(e.target.value))}
                />
                <span>{answers[q._id] ?? 5}</span>
              </div>
            )}

            {/* GOOD / AVG / BAD */}
            {q.type === "choice" && (
              <div className="choices">
                {q.options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={answers[q._id] === opt ? "active" : ""}
                    onClick={() => setAnswer(q._id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* TEXT */}
            {q.type === "text" && (
              <textarea
                placeholder="Share your thoughts..."
                onChange={(e) => setAnswer(q._id, e.target.value)}
              />
            )}
          </div>
        ))}

        <button className="submit-feedback" onClick={submitSurvey}>
          Publish Feedback
        </button>
      </div>
    </div>
  );
}
