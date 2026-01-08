const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { submitResponse } = require("../controllers/response.controller");

// STUDENT: submit survey response
router.post("/", auth, submitResponse);

module.exports = router;
