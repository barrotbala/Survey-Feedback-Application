const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllSurveys,
  getSurveyById,
} = require("../controllers/survey.controller");

// GET all surveys
router.get("/", auth, getAllSurveys);

// ✅ GET survey by ID (THIS WAS MISSING)
router.get("/:id", auth, getSurveyById);

module.exports = router;
