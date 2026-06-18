const request = require("supertest");
const app = require("../app");

const service = require("../services/dashboard.service");

jest.mock("../services/dashboard.service");

describe("Dashboard GET endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /dashboard/stats should return dashboard stats", async () => {
    const res = await request(app).get("/dashboard/stats");

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.message).toBe(
      "Dashboard stats retrieved successfully!"
    );

    // 🔥 correct path (IMPORTANT)
    expect(res.body.data).toBeDefined();

    expect(res.body.data.users).toBeDefined();
    expect(res.body.data.events).toBeDefined();
  });
});