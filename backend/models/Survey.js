const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["star", "emoji", "slider", "choice", "text"],
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
});

const SurveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    questions: [QuestionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Survey", SurveySchema);
