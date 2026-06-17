// src/tests/orders.get.test.js

require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Order = require("../models/Order");

let adminToken;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const adminLogin = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  adminToken = adminLogin.body.token;
});

describe("ORDER GET ROUTES", () => {
  // Tests: GET /orders

  test("GET /orders", async () => {
    const res = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${adminToken}`);
    console.log("ALL ORDERS:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Tests: GET /orders/:id
  test("GET /orders/:id", async () => {
    const allOrders = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${adminToken}`);

    console.log("ALL ORDERS:", JSON.stringify(allOrders.body, null, 2));

    const orderId = allOrders.body.data[0]._id;

    console.log("ORDER ID:", orderId);

    const res = await request(app)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    console.log("GET ONE ORDER RESPONSE:", res.body);
    //console.log("DATABASE ORDER ID:", allOrders.body.data[0]._id);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  // Close MongoDB connection after all tests complete
  await mongoose.connection.close();
});
