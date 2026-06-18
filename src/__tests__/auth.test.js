const request = require("supertest");
const express = require("express");

// We mock passport BEFORE importing routes
jest.mock("passport", () => {
  return {
    authenticate: jest.fn(() => (req, res, next) => next()),
  };
});

// Mock controller
jest.mock("../controllers/auth.controller", () => ({
  googleCallback: (req, res) => {
    res.status(200).json({
      success: true,
      token: "fake-jwt-token",
      user: { id: "123", email: "test@test.com" },
    });
  },
}));

const authRoutes = require("../routes/auth.routes");

const app = express();
app.use("/auth", authRoutes);

describe("AUTH ROUTES - GET ONLY", () => {
  /**
   * =========================
   * GET /auth/google
   * =========================
   */
  it("should trigger google oauth redirect middleware", async () => {
    const res = await request(app).get("/auth/google");

    // Passport mock just calls next(), so we expect it to NOT crash
    expect(res.statusCode).not.toBe(500);
  });

  /**
   * =========================
   * GET /auth/google/callback
   * =========================
   */
  it("should return JWT after google callback", async () => {
    const res = await request(app).get("/auth/google/callback");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
});