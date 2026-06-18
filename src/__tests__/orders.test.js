require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Order = require("../models/Order");

let adminToken;
let createdOrderId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const adminLogin = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  expect(adminLogin.statusCode).toBe(200);
  adminToken = adminLogin.body.token;

  // 🔥 Create test data (IMPORTANT FIX)
  const order = await Order.create({
    event: "Test Event",
    quantity: 2,
  });

  createdOrderId = order._id;
});

describe("ORDER GET ROUTES", () => {
  test("GET /orders should return all orders", async () => {
    const res = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /orders/:id should return single order", async () => {
    const res = await request(app)
      .get(`/orders/${createdOrderId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // safer validation
    expect(res.body.data).toBeDefined();
    expect(res.body.data._id).toBe(String(createdOrderId));
  });
});

afterAll(async () => {
  await Order.findByIdAndDelete(createdOrderId);
  await mongoose.connection.close();
});