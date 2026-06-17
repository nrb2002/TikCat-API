// src/tests/tickets.get.test.js

require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Ticket = require("../models/Ticket");

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

describe("TICKET GET ROUTES", () => {
  // Tests: GET /tickets

  test("GET /tickets", async () => {
    const res = await request(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${adminToken}`);
    console.log("ALL TICKETS:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Tests: GET /tickets/:id
  test("GET /tickets/:id", async () => {
    const allTickets = await request(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${adminToken}`);

    console.log("ALL TICKETS:", JSON.stringify(allTickets.body, null, 2));

    const ticketId = allTickets.body.data[0]._id;

    console.log("TICKET ID:", ticketId);

    const res = await request(app)
      .get(`/tickets/${ticketId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    console.log("GET ONE TICKET RESPONSE:", res.body);
    //console.log("DATABASE TICKET ID:", allTickets.body.data[0]._id);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  // Close MongoDB connection after all tests complete
  await mongoose.connection.close();
});
