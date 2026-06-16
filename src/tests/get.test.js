//get.test.js
require("dotenv").config();

console.log("DATABASE:", process.env.MONGODB_URI);
console.log("ADMIN:", process.env.ADMIN_EMAIL);

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");


let userToken;
let adminToken;
let userEmail;

//console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);
//console.log("ADMIN PASSWORD:", process.env.ADMIN_PASSWORD);



beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  userEmail = `user${Date.now()}@mail.com`;

  await request(app)
    .post("/auth/register")
    .send({
      firstName: "Test",
      lastName: "User",
      email: userEmail,
      password: "Password123"
    });

  const userLogin = await request(app)
    .post("/auth/login")
    .send({
      email: userEmail,
      password: "Password123"
    });

  userToken = userLogin.body.token;
    
  const adminLogin = await request(app)
    .post("/auth/login")
    .send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    adminToken = adminLogin.body.token;
    console.log("ADMIN LOGIN RESPONSE:", adminLogin.body);
});


describe("GET ROUTES ONLY", () => {

  test("GET /health", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("GET /users/profile", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });
 
  test("GET /admin/users (GET ALL)", async () => {
    const res = await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });


    test("GET /admin/users/:id (GET ONE)", async () => {

    const allUsers = await request(app)
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`);

    console.log("ALL USERS RESPONSE:", allUsers.body);

    const userId = allUsers.body.data.users[0]._id;

    console.log("USER ID:", userId);

    expect(userId).toBeDefined();

    const res = await request(app)
        .get(`/admin/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);

    console.log("GET ONE RESPONSE:", res.body);

    expect(res.statusCode).toBe(200);
    });
    
  afterAll(async () => {
      // Close MongoDB connection after all tests complete
    await mongoose.connection.close();
    });
    
});