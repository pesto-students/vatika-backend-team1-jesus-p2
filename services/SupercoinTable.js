const queryByEmail = (userEmail) => {
  return SuperCoin.find({ email: userEmail });
};

const updateCoin = (userEmail, userSupercoin) => {
  const coin = new SuperCoin({
    email: userEmail,
    supercoin: userSupercoin,
  });

  return coin.save();
};

module.exports = {
  queryByEmail,
  updateCoin,
};
