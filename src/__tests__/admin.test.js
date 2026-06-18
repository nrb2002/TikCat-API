const request = require("supertest");
const app = require("../app");

// Models (adjust paths to your project structure)
const User = require("../models/User");
const Ticket = require("../models/Ticket");

describe("ADMIN ROUTES - GET endpoints only", () => {
  /**
   * =========================
   * USERS - GET ALL
   * =========================
   */
  describe("GET /admin/users", () => {
    it("should return all users", async () => {
      await User.insertMany([
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@test.com",
          role: "user",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@test.com",
          role: "organizer",
        },
      ]);

      const res = await request(app).get("/admin/users");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it("should return empty array when no users exist", async () => {
      const res = await request(app).get("/admin/users");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  /**
   * =========================
   * USERS - GET BY ID
   * =========================
   */
  describe("GET /admin/users/:id", () => {
    it("should return a single user", async () => {
      const user = await User.create({
        firstName: "Alex",
        lastName: "Kim",
        email: "alex@test.com",
        role: "user",
      });

      const res = await request(app).get(`/admin/users/${user._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe("alex@test.com");
    });

    it("should return 400 for invalid ObjectId", async () => {
      const res = await request(app).get("/admin/users/123");

      expect(res.statusCode).toBe(400);
    });
  });

  /**
   * =========================
   * TICKETS - GET ALL
   * =========================
   */
  describe("GET /admin/tickets", () => {
    it("should return all tickets", async () => {
      await Ticket.insertMany([
        { event: "Concert A", status: "valid" },
        { event: "Concert B", status: "valid" },
      ]);

      const res = await request(app).get("/admin/tickets");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  /**
   * =========================
   * TICKETS - GET BY ID
   * =========================
   */
  describe("GET /admin/tickets/:id", () => {
    it("should return a single ticket", async () => {
      const ticket = await Ticket.create({
        event: "Festival X",
        status: "valid",
      });

      const res = await request(app).get(`/admin/tickets/${ticket._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.event).toBe("Festival X");
    });

    it("should return 400 for invalid ticket id", async () => {
      const res = await request(app).get("/admin/tickets/invalid-id");

      expect(res.statusCode).toBe(400);
    });
  });

 
});