const StudentFeedback = require("../models/StudentFeedback");

exports.createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const feedback = await StudentFeedback.create({
      student: req.user.id,
      rating,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
