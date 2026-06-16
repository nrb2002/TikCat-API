// src/tests/events.get.test.js

require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Event = require("../models/Event");

let adminToken;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const adminLogin = await request(app)
    .post("/auth/login")
    .send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

  adminToken = adminLogin.body.token;
});

  // Tests: GET /events
  
describe("EVENT GET ROUTES", () => {

  test("GET /events", async () => {

    const res = await request(app)
      .get("/events");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
  });


  // Tests: GET /events/:id

  test("GET /events/:id", async () => {

    const allEvents = await request(app)
      .get("/events");

    const eventId = allEvents.body.data[0]._id;

    const res = await request(app)
      .get(`/events/${eventId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
  });

});


afterAll(async () => {
    // Close MongoDB connection after all tests complete
  await mongoose.connection.close();
});