// src/tests/venues.get.test.js

require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Venue = require("../models/Venue");

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

  // Tests: GET /venues
  
describe("VENUE GET ROUTES", () => {

  test("GET /venues", async () => {

    const res = await request(app)
      .get("/venues");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
  });


  // Tests: GET /venues/:id
 
  test("GET /venues/:id", async () => {

    const allVenues = await request(app)
      .get("/venues");

    const venueId = allVenues.body.data[0]._id;

    const res = await request(app)
      .get(`/venues/${venueId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
  });

});


afterAll(async () => {
    // Close MongoDB connection after all tests complete
  await mongoose.connection.close();
});