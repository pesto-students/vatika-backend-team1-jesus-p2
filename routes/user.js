const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const emailVerification = require("../utils/nodemailer");
const bcrypt = require("bcryptjs");

//New User EmailVerification
router.get("/verify", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Registered");

  const otp = emailVerification(req.body.email);
  res.status(200).send(otp.toString());
});

//New User Signup
router.post("/signup", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Registered");
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Existing User Login
router.post("/login", async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) return res.status(400).send("Email Does Not Exists");

  const validPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!validPass) return res.status(400).send("Invalid Password");

  //CreateToken
  const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN);
  res.header("auth-token", token).send(token);
});

module.exports = router;
