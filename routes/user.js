const router = require("express").Router();
const { userEmailVerify, userSignUp, userLogin } = require("../controllers/user");


router.get("/verify", userEmailVerify); //New User EmailVerification
router.post("/signup", userSignUp); //New User Signup
router.post("/login", userLogin); //Existing User Login

module.exports = router;
