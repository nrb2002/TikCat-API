const bcrypt = require("bcrypt"); //bcrypt for password hashing
const User = require("../models/User");

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error();
    error.statusCode = 401;
    error.type = "INVALID_CREDENTIALS";
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error();
    error.statusCode = 401;
    error.type = "INVALID_CREDENTIALS";
    throw error;
  }

  return user;
};

const getAllUsers = async () => {
  return await User.find()
    .select("-password")
    .populate("startups", "name industry foundedYear");
};

const getSingleUser = async (id) => {
  return await User.findById(id)
    .select("-password")
    .populate("startups", "name industry foundedYear");
};

const createUser = async (data) => {
  return await User.create(data);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
