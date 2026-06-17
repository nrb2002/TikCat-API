process.env.JWT_SECRET = "testsecret";

jest.mock("../middleware/authenticate", () => {
  return (req, res, next) => {
    req.user = {
      _id: "6845a123abc4567890123456",
      role: "admin",
    };
    next();
  };
});

jest.mock("../middleware/authorize", () => {
  return (...roles) => {
    return (req, res, next) => {
      next();
    };
  };
});
