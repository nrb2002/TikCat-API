const request = require("supertest");
const app = require("../app");

const categoryService = require("../services/categories.service");

jest.mock("../services/categories.service");


describe("Categories GET endpoints", () => {


  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /categories should return all categories", async () => {


    categoryService.getAllCategories.mockResolvedValue([
      {
        _id: "6845a123abc4567890123456",
        name: "Technology",
        description: "Technology events"
      }
    ]);



    const res = await request(app)
      .get("/categories");



    expect(res.statusCode).toBe(200);



    expect(res.body).toHaveLength(1);



    expect(res.body[0].name)
      .toBe("Technology");


  });




  test("GET /categories/:id should return category by id", async () => {


    categoryService.getCategoryById.mockResolvedValue({

      _id:"6845a123abc4567890123456",

      name:"Technology",

      description:"Technology events"

    });



    const res = await request(app)
      .get("/categories/6845a123abc4567890123456");



    expect(res.statusCode)
      .toBe(200);



    expect(res.body.name)
      .toBe("Technology");


  });

  test("GET /categories/:id should reject invalid id", async()=>{
    const res = await request(app).get("/categories/123");
    
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});