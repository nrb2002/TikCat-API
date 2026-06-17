const request = require("supertest");
const app = require("../app");

const User = require("../models/User");


jest.mock("../models/User");


describe("Users GET endpoints",()=>{


afterEach(()=>{
 jest.clearAllMocks();
});



test("GET /admin/users", async()=>{


User.find.mockReturnValue({

select:jest.fn()
.mockResolvedValue([
 {
  firstName:"John",
  lastName:"Doe"
 }
])

});


const res =
await request(app)
.get("/admin/users");



expect(res.statusCode)
.toBe(200);



expect(res.body.success)
.toBe(true);



});





test("GET /admin/users/:id",async()=>{


User.findById.mockReturnValue({

select:jest.fn()
.mockResolvedValue({

firstName:"John"

})

});



const res =
await request(app)
.get("/admin/users/6845a123abc4567890123456");



expect(res.statusCode)
.toBe(200);



});



});