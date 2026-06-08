const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
  Responsibilities:

  Create JWT tokens
  Find or create OAuth users
  Logout logic
  Token validation

 */

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const findOrCreateUser = async (profile) => {
  let user = await User.findOne({
    googleId: profile.id,
  });

  if (!user) {
    user = await User.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      googleId: profile.id,
      profileImage: profile.photos?.[0]?.value,
    });
  }

  return user;
};

module.exports = {
  generateToken,
  findOrCreateUser,
};
