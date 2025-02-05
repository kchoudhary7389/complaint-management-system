const adminModel = require("../models/admin.model");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email }).select("+password");

  if (!admin) {
    return res.status(404).json({ message: "Email or Password incorrect" });
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    return res.status(404).json({ message: "Email or Password incorrect" });
  }

  const token = await admin.generateToken();
  res.cookie("token", token);

  return res.status(200).json({ token, admin });
};

const getAdminProfile = async (req, res, next) => {
  return res.status(200).json({ admin: req.admin });
};

const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, contactno, newPassword } = req.body;
    const admin = await adminModel.findOne({ email, contactno });
    if (!admin) {
      return res.status(404).send({ message: "email or contactno incorrect" });
    }

    const hashedPassword = await adminModel.hashPassword(newPassword);

    admin.password = hashedPassword;
    admin.save();
    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const adminChangePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;

    const adminId = req.admin._id;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both current and new passwords are required!" });
    }

    const admin = await adminModel.findById(adminId).select("+password");

    if (!admin) {
      return res.status(400).json({ message: "Unauthorized 1" });
    }
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "CurrentPassword does not match" });
    }

    const hashedPassword = await adminModel.hashPassword(newPassword);

    admin.password = hashedPassword;
    admin.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  forgotPassword,
  adminChangePassword,
  getAllUsers,
  deleteUser,
};
