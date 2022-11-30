const router = require("express").Router();
const { getSupercoin, updateSupercoin } = require("../controllers/supercoin");

router.get("/supercoin", getSupercoin); //Fetch User Supercoin
router.post("/supercoin", updateSupercoin); //Update User Supercoin

module.exports = router;
