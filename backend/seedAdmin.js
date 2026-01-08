const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@college.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
}

createAdmin();
