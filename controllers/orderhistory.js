const userOrderHistory = (req, res) => {
  res.json({
    order: {
      user_id: req.user._id,
      quantity: 3,
      desc: "will be delivered soon",
    },
  });
};

module.exports = {
  userOrderHistory,
};
