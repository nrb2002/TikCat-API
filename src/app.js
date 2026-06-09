// Import dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

// Error handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

/* =========================
   PASSPORT CONFIGURATION
========================= */

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Later you can find/create a user in MongoDB here
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/* =========================
   STATIC FILES
========================= */

app.use(express.static(path.join(__dirname, "../public")));

/* =========================
   API ROUTES
========================= */

// Homepage route
app.use("/", require("./routes/index"));

// Other API routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/events", require("./routes/events.routes"));
app.use("/tickets", require("./routes/tickets.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/venues", require("./routes/venues.routes"));
app.use("/categories", require("./routes/categories.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

// Swagger Docs
app.use("/api-docs", require("./routes/swagger.routes"));

/* =========================
   GITHUB AUTH ROUTES
========================= */

// Start GitHub Login
app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

// GitHub Callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    req.session.user = req.user;

    res.redirect("/");
  },
);

// Logout
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

// Current logged-in user
app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.status(200).json(req.user);
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    uptime: process.uptime(),
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

module.exports = app;
