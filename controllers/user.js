const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailVerification = require("../utils/nodemailer");
const { queryUserByEmail, newUserEntry } = require("../services/UserTable");

const userEmailVerify = async(req, res) => {
  const userEmail = req.body.email;

  const emailExists =await queryUserByEmail(userEmail);
  if (emailExists) return res.status(400).send("Email Already Registered");

  const otp = emailVerification(userEmail);
  res.status(200).send(otp.toString());
};

const userSignUp =async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userMobileNo=req.body.mobileNo

  const emailExists = await queryUserByEmail(userEmail);
  if (emailExists) return res.status(400).send("Email Already Registered");

  //Hash Password
  const salt =await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(userPassword, salt);

  try {
    const savedUser = await newUserEntry(userName, userEmail, hashPassword,userMobileNo);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const userLogin = async(req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const userExists = await queryUserByEmail(userEmail);
  if (!userExists) return res.status(400).send("Email Does Not Exists");

  const validPass = await bcrypt.compare(userPassword, userExists.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //CreateToken
  const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN);
  res.header("auth-token", token).send(token);
};

module.exports = {
  userEmailVerify,
  userSignUp,
  userLogin,
};
