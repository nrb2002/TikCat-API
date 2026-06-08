const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find();
};

const getSingleUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found!");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const createUser = async (data) => {
  return await User.create(data);
};

const updateUser = async (id, data) => {
  delete data.googleId;
  delete data.email;

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
};
