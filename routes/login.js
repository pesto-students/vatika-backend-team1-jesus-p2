const router = require("express").Router();
const { loginUser } = require("../controllers/login");

router.post("/", loginUser); //Login User

module.exports = router;
