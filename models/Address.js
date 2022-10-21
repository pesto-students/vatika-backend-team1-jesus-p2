const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressDetails = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: false,
  },

  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  apartmentNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model("Address", AddressDetails);
module.exports = Address;
