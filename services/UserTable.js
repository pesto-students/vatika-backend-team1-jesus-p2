const User = require("../models/User");

const queryUserByEmail = (userEmail) => {
  return User.findOne({ email: userEmail });
};

const newUserEntry = (userName, userEmail, hashPassword,userMobileNo) => {
  const user = new User({
    name: userName,
    email: userEmail,
    password: hashPassword,
    mobileNo:userMobileNo
  });

  return user.save();
};

module.exports = {
  queryUserByEmail,
  newUserEntry,
};
