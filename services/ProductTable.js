const Product = require("../models/Product");

const queryAllProduct = () => {
  return Product.find();
};

const queryProductByName = (productName) => {
  return Product.findOne({ name: productName });
};

const newProductEntry = (allDetails) => {
  const product = new Product({
    name: allDetails.productName,
    price: allDetails.productPrice,
    description: allDetails.productDesc,
    rating: allDetails.productRating,
    category: allDetails.productCategory,
    discount: allDetails.productDiscount,
    maintain: allDetails.productMaintain,
    sunlight: allDetails.productSunlight,
    water: allDetails.productWater,
    image: allDetails.productImage,
  });

  return product.save();
};

module.exports = { queryAllProduct, queryProductByName, newProductEntry };
