const Survey = require("../models/Survey");

// ADMIN: Create survey
exports.createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ADMIN: get all responses
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate("survey");
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();
    res.json({ totalSurveys });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// STUDENT: Get all surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// STUDENT: Get survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
