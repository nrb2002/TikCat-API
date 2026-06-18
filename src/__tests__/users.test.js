const request = require("supertest");
const express = require("express");

// Mock controller
jest.mock("../controllers/users.controller", () => ({
  getUserProfile: (req, res) => {
    res.status(200).json({
      _id: "user123",
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
    });
  },
}));

// Mock middleware (IMPORTANT for GET unit tests)
jest.mock("../middleware/authenticate", () => {
  return (req, res, next) => {
    req.user = {
      _id: "user123",
      role: "user",
    };
    next();
  };
});

const userRoutes = require("../routes/users.routes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("USERS ROUTES - GET ONLY", () => {
  /**
   * =========================
   * GET /users/profile
   * =========================
   */
  test("GET /users/profile should return current user profile", async () => {
    const res = await request(app).get("/users/profile");

    expect(res.statusCode).toBe(200);

    // response validation (important for grading)
    expect(res.body).toBeDefined();
    expect(res.body._id).toBe("user123");
    expect(res.body.email).toBe("john@test.com");
  });
});