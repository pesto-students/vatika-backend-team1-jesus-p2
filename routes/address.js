const router = require("express").Router();
const {
  addAddress,
  fetchAllAddress,
  deleteAddress,
} = require("../controllers/address");


router.get("/address", fetchAllAddress); //Fetch All Address
router.post("/address", addAddress); //Add User Address
router.delete("/address", deleteAddress); //Delete One Address

module.exports = router;
