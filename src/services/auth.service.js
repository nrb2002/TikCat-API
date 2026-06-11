const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/appError");

/**
 * Google OAuth
 */
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
      role: "Attendee",
    });
  }

  return user;
};

/**
 * Local Registration
 */
const register = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    role: "Attendee",
  });

  const token = generateToken(user);

  return {
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    },
  };
};

/**
 * Local Login
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return loginUser(user);
};

/**
 * JWT Login Response
 */
const loginUser = async (user) => {
  const token = generateToken(user);

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    },
  };
};

module.exports = {
  findOrCreateUser,
  register,
  login,
  loginUser,
};
