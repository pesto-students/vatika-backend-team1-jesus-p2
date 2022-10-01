const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  category: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 10,
    max: 60,
  },
  maintain: {
    type: String,
    required: true,
  },
  sunlight: {
    type: Number,
    required: true,
  },
  water: {
    type: Number,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
