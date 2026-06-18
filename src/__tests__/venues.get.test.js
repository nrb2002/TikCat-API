require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Venue = require("../models/Venue");

let createdVenueId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const venue = await Venue.create({
    name: "Test Venue",
    address: "123 Test Street",
    city: "Kinshasa",
    capacity: 500,
  });

  createdVenueId = venue._id;
});

describe("VENUES GET ROUTES", () => {
  test("GET /venues should return all venues", async () => {
    const res = await request(app).get("/venues");

    expect(res.statusCode).toBe(200);

    // 🔥 FIX: handle both formats (array OR {data: []})
    const data = res.body.data || res.body;

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("GET /venues/:id should return single venue", async () => {
    const res = await request(app).get(`/venues/${createdVenueId}`);

    expect(res.statusCode).toBe(200);

    const venue = res.body.data || res.body;

    expect(venue).toBeDefined();
    expect(String(venue._id)).toBe(String(createdVenueId));
    expect(venue.name).toBe("Test Venue");
  });

  test("GET /venues/:id should handle invalid id format", async () => {
    const res = await request(app).get("/venues/123");

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await Venue.findByIdAndDelete(createdVenueId);
  await mongoose.connection.close();
});