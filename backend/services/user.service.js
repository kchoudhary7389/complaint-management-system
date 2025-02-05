const userModel = require("../models/user.model");

module.exports.createUser = async ({
  fullname,
  email,
  password,
  contactno,
}) => {
  if (!fullname || !email || !password || !contactno) {
    throw new Error("All Fields are required");
  }

  const user = await userModel.create({
    fullname,
    email,
    password,
    contactno,
  });
  return user;
};
