//authorize.js

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const error = new Error();
        error.statusCode = 401;
        error.type = "UNAUTHENTICATED";
        throw error;
      }

      if (!allowedRoles.includes(req.user.role)) {
        const error = new Error();
        error.statusCode = 403;
        error.type = "FORBIDDEN";
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
