const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: [3, "Fullname must be at least 3 characters long 1"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  contactno: {
    type: Number,
    required: true,
    unique: true,
  },
});

adminSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.AUTH_TOKEN);
  return token;
};

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
