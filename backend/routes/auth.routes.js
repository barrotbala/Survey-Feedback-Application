const express = require("express");
const router = express.Router();

const {
  register,
  login,
  createAdmin,
} = require("../controllers/auth.controller");

// Student
router.post("/register", register);
router.post("/login", login);

// 🔐 Admin creation
router.post("/create-admin", createAdmin);

module.exports = router;
