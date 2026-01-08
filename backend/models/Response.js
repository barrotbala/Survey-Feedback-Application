const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        value: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
