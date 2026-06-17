require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existingAdmin = await User.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    firstName: "Johnny",
    lastName: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
}

createAdmin();
