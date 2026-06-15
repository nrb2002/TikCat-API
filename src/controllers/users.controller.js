const service = require("../services/users.service");

/**
 * =========================
 * GET PROFILE
 * =========================
 */
const getUserProfile = async (req, res) => {
  const user = await service.getProfile(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
};

/**
 * =========================
 * UPDATE PROFILE
 * =========================
 */
const updateProfile = async (req, res) => {
  const user = await service.updateProfile(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

/*=========================
 * CHANGE PASSWORD
 * ========================*/
const changePassword = async (req, res) => {
  const result = await service.changePassword(
    req.user._id,
    req.body.currentPassword,
    req.body.newPassword,
    req.body.confirmPassword,
  );

  res.status(200).json(result);
};

/*********************************
 * GET ALL USERS
 * ADMIN ONLY
 ********************************/
const getAllUsers = async (req, res) => {
  const result = await service.getAllUsers();

  res.status(200).json(result);
};

/*********************************
 * GET SINGLE USER
 * ADMIN ONLY
 ********************************/
const getUserById = async (req, res) => {
  // console.log("1 - controller reached");

  // res.status(200).json({
  //   success:true,
  //   message:"controller works"
  // });



  const result = await service.getSingleUser(req.params.id);

  res.status(200).json(result);
};

/*********************************
 * UPDATE USER
 * ADMIN ONLY
 ********************************/
const updateUser = async (req, res) => {
  const result = await service.updateUser(req.params.id, req.body);

  res.status(200).json(result);
};

/*********************************
 * DELETE USER
 * ADMIN ONLY
 ********************************/
const deleteUser = async (req, res) => {
  const result = await service.deleteUser(req.params.id);

  res.status(200).json(result);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateProfile,
  changePassword,
};
