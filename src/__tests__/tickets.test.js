require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Ticket = require("../models/Ticket");

let adminToken;
let createdTicketId;

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

  // 🔥 CREATE TEST DATA (IMPORTANT FIX)
  const ticket = await Ticket.create({
    event: "Test Event",
    status: "valid",
  });

  createdTicketId = ticket._id;
});

describe("TICKET GET ROUTES", () => {
  test("GET /tickets should return all tickets", async () => {
    const res = await request(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /tickets/:id should return single ticket", async () => {
    const res = await request(app)
      .get(`/tickets/${createdTicketId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.data).toBeDefined();
    expect(res.body.data._id).toBe(String(createdTicketId));
    expect(res.body.data.event).toBe("Test Event");
  });
});

afterAll(async () => {
  await Ticket.findByIdAndDelete(createdTicketId);
  await mongoose.connection.close();
});