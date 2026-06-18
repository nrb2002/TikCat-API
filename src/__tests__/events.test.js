const request = require("supertest");
const app = require("../app");

const Event = require("../models/Event");

jest.mock("../models/Event");

describe("Events GET endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * =========================
   * GET /events
   * =========================
   */
  test("GET /events should return all events", async () => {
    const mockEvents = [
      { title: "Conference" },
      { title: "Workshop" },
    ];

    Event.find.mockImplementation(() => ({
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue(mockEvents),
    }));

    const res = await request(app).get("/events");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe("Conference");

    expect(Event.find).toHaveBeenCalledTimes(1);
  });

  /**
   * =========================
   * GET /events/:id
   * =========================
   */
  test("GET /events/:id should return single event", async () => {
    const mockEvent = { title: "Conference" };

    Event.findById.mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue(mockEvent),
    }));

    const res = await request(app).get(
      "/events/6845a123abc4567890123456"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Conference");

    expect(Event.findById).toHaveBeenCalledWith(
      "6845a123abc4567890123456"
    );
  });
});