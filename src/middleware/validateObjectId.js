const mongoose = require("mongoose");

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!value) {
      return res.status(400).json({
        success:false,
        message:`Missing ${paramName} parameter`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName}`,
      });
    }

    next();
  };
};

module.exports = validateObjectId;
