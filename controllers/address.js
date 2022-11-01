const Address = require("../models/Address");
const {
  queryByAddress,
  addUserAddress,
  fetchAllUserAddress,
  deleteUserAddress,
} = require("../services/AddressTable");

const addAddress = async (req, res) => {
  const fname = req.body.firstName;

  const userAddressExist = await queryByAddress(fname);
  if (userAddressExist) return res.status(400).send("Address Already Saved");

  const allDetails = {
    userId: req.body.userId,
    userFirstName: req.body.firstName,
    userLastName: req.body.lastName,
    userAddress: req.body.address,
    userApartmentNo: req.body.apartmentNo,
    userCity: req.body.city,
    userState: req.body.state,
    userPincode: req.body.pincode,
  };
  try {
    const savedDetails = await addUserAddress(allDetails);
    res.status(200).send("Address Saved Successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

const fetchAllAddress = async (req, res) => {
  const userId = req.query.userId;

  const allUserAddress = await fetchAllUserAddress(userId);
  if (allUserAddress.length == 0) return res.status(201).send([]);

  res.status(200).send(allUserAddress);
};

const deleteAddress = async (req, res) => {
  const userId = req.query.id;

  const userDeletedAddress = await deleteUserAddress(userId);
  if (userDeletedAddress.length == 0) return res.status(400).send("Not Deleted");

  res.status(200).send(userDeletedAddress);
};

module.exports = {
  addAddress,
  fetchAllAddress,
  deleteAddress,
};
