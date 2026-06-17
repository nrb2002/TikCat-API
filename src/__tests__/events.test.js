const request = require("supertest");
const app = require("../app");

const Event = require("../models/Event");
jest.mock("../models/Event");

describe("Events GET endpoints", () => {
  test("GET /events", async () => {
    Event.find.mockReturnValue({
      populate() {
        return this;
      },
      sort() {
        return Promise.resolve([
          {
            title: "Conference",
          },
        ]);
      },
    });

    const res = await request(app).get("/events");

    expect(res.statusCode).toBe(200);

    expect(res.body.length).toBe(1);
  });

  test("GET /events/:id", async () => {
    Event.findById.mockReturnValue({
      populate() {
        return this;
      },
      then(resolve) {
        resolve({
          title: "Conference",
        });
      },
    });

    const res = await request(app).get("/events/6845a123abc4567890123456");

    expect(res.statusCode).toBe(200);
  });
});
