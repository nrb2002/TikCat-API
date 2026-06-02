const errorHandler = (err, req, res, next) => {
  console.error(err);

  // MongoDB duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Authentication errors
  if (err.type === "INVALID_CREDENTIALS") {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Authorization errors
  // Missing token / unauthenticated
  if (err.type === "MISSING_TOKEN" || err.type === "UNAUTHENTICATED") {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Forbidden
  if (err.type === "FORBIDDEN") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Default fallback
  return res.status(err.statusCode || 500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
