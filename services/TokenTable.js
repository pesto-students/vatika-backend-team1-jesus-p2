const Token = require("../models/Token");
const crypto = require("crypto");

const findToken = (id) => {
  return Token.findOne({ userId: id });
};

const newToken = (id) => {
  return new Token({
    userId: id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
};

const findTokenByToken = (id, token) => {
  return Token.findOne({
    userId: id,
    token: token,
  });
};

module.exports = {
  findToken,
  newToken,
  findTokenByToken,
};
