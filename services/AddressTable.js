const Address = require("../models/Address");

const queryByAddress = (fname) => {
  return Address.findOne({ firstName: fname });
};

const addUserAddress = (allDetails) => {
  const details = new Address({
    userId: allDetails.userId,
    firstName: allDetails.userFirstName,
    lastName: allDetails.userLastName,
    address: allDetails.userAddress,
    apartmentNo: allDetails.userApartmentNo,
    city: allDetails.userCity,
    state: allDetails.userState,
    pincode: allDetails.userPincode,
  });

  return details.save();
};

const fetchAllUserAddress = (userId) => {
  return Address.find({ userId: userId });
};

const deleteUserAddress = (userId) => {
  return Address.deleteOne({ _id: userId });
};

module.exports = {
  queryByAddress,
  addUserAddress,
  fetchAllUserAddress,
  deleteUserAddress,
};
