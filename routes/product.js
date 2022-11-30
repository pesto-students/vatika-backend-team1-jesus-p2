const router = require("express").Router();
const {
  addProduct,
  fetchAllProduct,
  fetchProductByName,
} = require("../controllers/product");


router.post("/product", addProduct); //Add Product
router.get("/product", fetchAllProduct); //Fetch All Product
router.get("/product/:name", fetchProductByName); //Fetch Product by Plant Name

module.exports = router;

