const SuperCoin = require("../models/SuperCoin");
const { queryByEmail, updateCoin } = require("../services/SupercoinTable");

const getSupercoin = async (req, res) => {
  const userEmail = req.query.email;
  const coin = await queryByEmail(userEmail);
  res.send(coin);
};

const updateSupercoin = async (req, res) => {
  userEmail = req.body.email;
  userSupercoin = req.body.supercoin;

  try {
    const savedCoin = await updateCoin(userEmail, userSupercoin);
    res.send(savedCoin);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getSupercoin,
  updateSupercoin,
};
