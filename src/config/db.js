const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
