const Response = require("../models/Response");

// Submit survey response
exports.submitResponse = async (req, res) => {
  try {
    const { surveyId, answers } = req.body;

    if (!surveyId || !answers || !answers.length) {
      return res.status(400).json({ message: "Invalid response data" });
    }

    const response = await Response.create({
      survey: surveyId,
      student: req.user.id, // from JWT
      answers,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      response,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
