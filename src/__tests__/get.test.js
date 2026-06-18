require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

let userToken;
let adminToken;
let userEmail;
let createdUserId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  userEmail = `user${Date.now()}@mail.com`;

  const register = await request(app).post("/auth/register").send({
    firstName: "Test",
    lastName: "User",
    email: userEmail,
    password: "Password123",
  });

  expect(register.statusCode).toBe(201);

  createdUserId = register.body.user._id;

  const userLogin = await request(app).post("/auth/login").send({
    email: userEmail,
    password: "Password123",
  });

  expect(userLogin.statusCode).toBe(200);
  userToken = userLogin.body.token;

  const adminLogin = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  expect(adminLogin.statusCode).toBe(200);
  adminToken = adminLogin.body.token;
});

describe("GET ROUTES ONLY (INTEGRATION)", () => {
  test("GET /health should return success", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("GET /users/profile should return user profile", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email");
  });

  test("GET /admin/users should return users list", async () => {
    const res = await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0);
  });

  test("GET /admin/users/:id should return specific user", async () => {
    const usersRes = await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    const user = usersRes.body.users.find(
      (u) => u.email === userEmail
    );

    expect(user).toBeDefined();

    const res = await request(app)
      .get(`/admin/users/${user._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(user._id);
  });
});

afterAll(async () => {
  await User.findByIdAndDelete(createdUserId);
  await mongoose.connection.close();
});