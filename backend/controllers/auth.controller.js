const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");

/* =========================
   STUDENT REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    res.status(201).json({
      message: "Student registered successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   LOGIN (STUDENT + ADMIN)
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   CREATE ADMIN (POST API)
========================= */
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 Secret key validation (SECURITY)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminEmail: admin.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
