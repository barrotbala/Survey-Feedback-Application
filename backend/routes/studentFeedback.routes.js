const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createFeedback } = require("../controllers/studentFeedback.controller");

router.post("/", auth, createFeedback);

module.exports = router;
