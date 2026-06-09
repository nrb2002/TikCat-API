const path = require("path");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    // #swagger.ignore = true

    const filePath = path.resolve(__dirname, "../../public/index.html");

    return res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
