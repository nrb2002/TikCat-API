const request = require("supertest");
const app = require("../app");
const service = require("../services/dashboard.service");
jest.mock("../services/dashboard.service");

describe("Dashboard", () => {
  test("GET /dashboard", async () => {
    service.getDashboardStats.mockResolvedValue({
      users: 10,
      events: 5,
    });

    const res = await request(app).get("/dashboard");

    expect(res.statusCode).toBe(200);
  });
});
