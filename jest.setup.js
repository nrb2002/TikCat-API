process.env.JWT_SECRET = "testsecret";

/**
 * Mock authentication middleware
 */
jest.mock("../middleware/authenticate", () => {
  return jest.fn((req, res, next) => {
    req.user = {
      _id: "6845a123abc4567890123456",
      role: "admin",
    };
    next();
  });
});

/**
 * Mock authorization middleware
 */
jest.mock("../middleware/authorize", () => {
  return jest.fn(() => {
    return (req, res, next) => next();
  });
});