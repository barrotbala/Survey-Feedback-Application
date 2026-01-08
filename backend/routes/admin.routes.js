const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createSurvey,
  getAdminDashboard,
  getAllResponses, // 👈 ADD
} = require("../controllers/survey.controller");

router.post("/survey", auth, admin, createSurvey);
router.get("/dashboard", auth, admin, getAdminDashboard);

// ✅ NEW: get all responses
router.get("/responses", auth, admin, getAllResponses);

module.exports = router;
