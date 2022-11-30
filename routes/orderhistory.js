const router = require("express").Router();
const { userOrderHistory } = require("../controllers/orderhistory");

router.get("/orderhistory", userOrderHistory); //get orderhistory

module.exports = router;
