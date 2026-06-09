const errorHandler = (err, req, res, next) => {
  console.error(err);

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    });
  }

  // Authentication errors
  if (err.type === "MISSING_TOKEN" || err.type === "UNAUTHENTICATED") {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Authorization errors
  if (err.type === "FORBIDDEN") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  // JWT invalid token
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  // JWT expired token
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Default fallback
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;
