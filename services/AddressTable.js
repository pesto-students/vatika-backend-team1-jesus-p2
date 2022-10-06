const Address = require("../models/Address");

const queryByAddress = (fname) => {
  return Address.findOne({ firstName: fname });
};


const addAddress = (allDetails) => {
  const details = new Address({
    email: allDetails.userEmail,
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


const fetchAllAddress=(userEmail)=>{
   return Address.find({ email: userEmail })
}

const deleteUserAddress=(userId)=>{
    return  Address.deleteOne({ _id: userId});
}

module.exports = {
  queryByAddress,
  addAddress,
  fetchAllAddress,
  deleteUserAddress,
};
