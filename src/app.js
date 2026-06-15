// Load environment variables
require("dotenv").config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

// Passport configuration
require("./config/passport");

// Error handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

/* =========================
   STATIC FILES
========================= */

app.use(express.static(path.join(__dirname, "../public")));

/* =========================
   API ROUTES
========================= */

// Homepage
app.use("/", require("./routes/index"));

// Authentication
app.use("/auth", require("./routes/auth.routes"));

// Users
app.use("/users", require("./routes/users.routes"));

// Admins
app.use("/admin", require("./routes/admin.routes"));

// Events
app.use("/events", require("./routes/events.routes"));

// Tickets
app.use("/tickets", require("./routes/tickets.routes"));

// Orders
app.use("/orders", require("./routes/orders.routes"));

// Venues
app.use("/venues", require("./routes/venues.routes"));

// Categories
app.use("/categories", require("./routes/categories.routes"));

// Dashboard
app.use("/dashboard", require("./routes/dashboard.routes"));

// Swagger Documentation
app.use("/api-docs", require("./routes/swagger.routes"));



app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl, res.statusCode);
  next();
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "online",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(errorHandler);

module.exports = app;
