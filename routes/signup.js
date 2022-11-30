const router = require("express").Router();
const { createNewUser, verifyUser } = require("../controllers/signup");

router.post("/", createNewUser); //Add New User
router.get("/:id/verify/:token/", verifyUser); //Verify User

module.exports = router;
