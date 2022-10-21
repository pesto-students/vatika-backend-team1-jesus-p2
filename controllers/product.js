const Product = require("../models/Product");
const {
  queryAllProduct,
  queryProductByName,
  newProductEntry,
} = require("../services/ProductTable");

const addProduct = async (req, res) => {
  const productName = req.body.name;

  const productExists = await queryProductByName(productName);
  if (productExists) return res.status(400).send("Product Already Exists");

  const allDetails = {
    productName: req.body.name,
    productPrice: req.body.price,
    productDesc: req.body.description,
    productRating: req.body.rating,
    productCategory: req.body.category,
    productKingdom: req.body.kingdom,
    productMaintain: req.body.maintain,
    productSunlight: req.body.sunlight,
    productWater: req.body.water,
    productImage: req.body.image,
  };
  try {
    const savedProduct = await newProductEntry(allDetails);
    res.status(201).send(`${savedProduct.name} Inserted Successfully in DB`);
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchAllProduct = async (req, res) => {
  const allProducts = await queryAllProduct();
  if (allProducts.length == 0)
    return res.status(201).send("No Product to Display");
  res.status(200).send(allProducts);
};

const fetchProductByName = async (req, res) => {
  const productName = req.params.name;
  const product = await queryProductByName(productName);
  if (product === null) return res.status(201).send("No Products to Display");
  res.status(200).send(product);
};

module.exports = {
  addProduct,
  fetchAllProduct,
  fetchProductByName,
};
