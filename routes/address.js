const router = require("express").Router();
const Address = require("../model/Address");

//Add User Address
router.post("/address", async (req, res) => {
  const userAddressExist = await Address.findOne({
    firstName: req.body.firstName,
  });
  if (userAddressExist) return res.send("Address Already Saved");
  // console.log(req.body);

  const details = new Address({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    apartmentNo: req.body.apartmentNo,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
  });
  try {
    const savedDetails = await details.save();
    res.send("Address Saved Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Fetch All Address
router.get("/address", async (req, res) => {
  const allUserAddress = await Address.find({ email: req.query.email });
  console.log("Fetch All Address API Called");
  if (allUserAddress.length == 0) return res.send([]);
  res.send(allUserAddress);
});

//Delete One Address
router.delete("/address", async (req, res) => {
  const userDeletedAddress = await Address.deleteOne({ _id: req.query.id });
  console.log("Deleted One Address API Called");
  // console.log(userDeletedAddress);
  if (userDeletedAddress.length == 0) return res.send("Not Deleted");
  res.send(userDeletedAddress);
});

module.exports = router;
