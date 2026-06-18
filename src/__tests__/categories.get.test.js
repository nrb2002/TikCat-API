const request = require("supertest");
const app = require("../app");

const categoryService = require("../services/categories.service");

jest.mock("../services/categories.service");

describe("Categories GET endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * GET ALL CATEGORIES
   */
  test("GET /categories should return all categories", async () => {
    categoryService.getAllCategories.mockResolvedValue([
      {
        _id: "6845a123abc4567890123456",
        name: "Technology",
        description: "Technology events",
      },
    ]);

    const res = await request(app).get("/categories");

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);

    expect(res.body.data.length).toBe(1);

    expect(res.body.data[0].name).toBe("Technology");
  });

  /**
   * GET CATEGORY BY ID
   */
  test("GET /categories/:id should return category by id", async () => {
    categoryService.getCategoryById.mockResolvedValue({
      _id: "6845a123abc4567890123456",
      name: "Technology",
      description: "Technology events",
    });

    const res = await request(app).get(
      "/categories/6845a123abc4567890123456"
    );

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    // 🔥 IMPORTANT FIX: always use data wrapper
    expect(res.body.data).toBeDefined();

    expect(res.body.data.name).toBe("Technology");
  });

  /**
   * INVALID ID FORMAT
   */
  test("GET /categories/:id should reject invalid id", async () => {
    const res = await request(app).get("/categories/123");

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });
});