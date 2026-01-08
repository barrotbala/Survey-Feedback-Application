import { useState } from "react";
import api from "../../api/axios";
import "./Admin.css";

const QUESTION_TYPES = [
  { label: "⭐ Star Rating", value: "star" },
  { label: "🙂 Emoji Rating", value: "emoji" },
  { label: "🔢 Slider (0–10)", value: "slider" },
  { label: "👍 Good / Average / Bad", value: "choice" },
  { label: "📝 Text Feedback", value: "text" },
];

export default function CreateSurvey() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", type: "star", options: [] },
    ]);
  };

  const updateQuestion = (i, field, value) => {
    const updated = [...questions];
    updated[i][field] = value;

    if (field === "type" && value === "choice") {
      updated[i].options = ["Good", "Average", "Bad"];
    }

    setQuestions(updated);
  };

  const submitSurvey = async (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    if (questions.some((q) => !q.questionText.trim())) {
      alert("Fill all question fields");
      return;
    }

    const survey = {
      title: e.target.title.value,
      subject: e.target.subject.value,
      questions,
    };

    await api.post("/admin/survey", survey);
    alert("Survey Created Successfully");
    setQuestions([]);
    e.target.reset();
  };

  return (
    <div className="admin-page">
      <h1>Create Survey</h1>

      <form className="survey-builder" onSubmit={submitSurvey}>
        <div className="form-group">
          <label>Survey Title</label>
          <input name="title" placeholder="Enter survey title" required />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input name="subject" placeholder="Enter subject" required />
        </div>

        <h3>Questions</h3>

        {questions.map((q, i) => (
          <div key={i} className="question-card">
            <input
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                updateQuestion(i, "questionText", e.target.value)
              }
            />

            <select
              value={q.type}
              onChange={(e) => updateQuestion(i, "type", e.target.value)}
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {q.type === "choice" && (
              <div className="option-preview">
                {q.options.map((op) => (
                  <span key={op}>{op}</span>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addQuestion}>
          + Add Question
        </button>

        <button className="submit-btn">Create Survey</button>
      </form>
    </div>
  );
}
