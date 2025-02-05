const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");

const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, contactno } = req.body;
  // console.log(fullname, email, password, contactno);

  const isUserExist = await userModel.findOne({ email: email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
    contactno,
  });

  const token = await user.generateToken();

  return res.status(200).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "Email or Password incorrect" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(404).json({ message: "Email or Password incorrect" });
  }

  const token = await user.generateToken();
  res.cookie("token", token);

  return res.status(200).json({ token, user });
};

const getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, contactno, newPassword } = req.body;
    const user = await userModel.findOne({ email, contactno });

    if (!user) {
      return res.status(400).json({ message: "Email or contact incorrect" });
    }

    const hashedPassword = await userModel.hashPassword(newPassword);

    user.password = hashedPassword;
    user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;

    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both current and new passwords are required!" });
    }

    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Unauthorized 1" });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "CurrentPassword does not match" });
    }

    const hashedPassword = await userModel.hashPassword(newPassword);

    user.password = hashedPassword;
    user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};
const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { fullname, contactno } = req.body;

    const userId = req.user._id;

    if (!fullname || !contactno) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingUserData = await userModel.findOne({
      contactno,
      _id: { $ne: userId },
    });
    if (existingUserData) {
      return res.status(404).json({ message: "Contact Number already exists" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    user.fullname = fullname;
    user.contactno = contactno;
    user.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};
const getUserProfileByid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  changePassword,
  updateUserProfile,
  getUserProfileByid,
};
