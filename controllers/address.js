const Address = require("../models/Address");
const {
  queryByAddress,
  addAddress,
  fetchAllAddress,
  deleteUserAddress,
} = require("../services/AddressTable");

const addAddress = async (req, res) => {
  const fname = req.body.firstName;

  const userAddressExist = await queryByAddress(fname);
  if (userAddressExist) return res.send("Address Already Saved");

  const allDetails = {
    userEmail: req.body.email,
    userFirstName: req.body.firstName,
    userLastName: req.body.lastName,
    userAddress: req.body.address,
    userApartmentNo: req.body.apartmentNo,
    userCity: req.body.city,
    userState: req.body.state,
    userPincode: req.body.pincode,
  };
  try {
    const savedDetails = await addAddress(allDetails);
    res.send("Address Saved Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchAllAddress = async (req, res) => {
  const userEmail = req.query.email;

  const allUserAddress = await fetchAllAddress(userEmail);
  if (allUserAddress.length == 0) return res.send([]);

  res.send(allUserAddress);
};

const deleteAddress = async (req, res) => {
  const userId = req.query.id;

  const userDeletedAddress = await deleteUserAddress(userId);
  if (userDeletedAddress.length == 0) return res.send("Not Deleted");

  res.send(userDeletedAddress);
};

module.exports = {
  addAddress,
  fetchAllAddress,
  deleteAddress,
};
