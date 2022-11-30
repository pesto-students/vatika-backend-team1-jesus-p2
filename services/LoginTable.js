const User = require("../models/User");
const bcrypt = require("bcryptjs");

const queryByEmail = (userEmail) => {
  return User.findOne({ email: userEmail });
};

const comparePassword = (userPass, DBPass) => {
  return bcrypt.compare(userPass, DBPass);
};

module.exports = {
  queryByEmail,
  comparePassword,
};
