const User = require("../models/User");

const queryByEmail = (userEmail) => {
  return User.findOne({ email: userEmail });
};

const addNewUser = (uName, userEmail, hashPassword) => {
  return new User({
    userName: uName,
    email: userEmail,
    password: hashPassword,
  }).save();
};

const queryByUserId = (userId) => {
  return User.findOne({ _id: userId });
};

const updateUser = (userId) => {
  return User.updateOne({ _id: userId }, { verified: true });
};

module.exports = {
  queryByEmail,
  addNewUser,
  queryByUserId,
  updateUser,
};
