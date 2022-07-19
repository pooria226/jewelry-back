const mongoose = require("mongoose");
const address = new mongoose.Schema({
  postal_address: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  plaque: { type: String, required: true },
  postal_code: { type: String, required: true },
  unit: { type: String, required: false },
  recipient_name: { type: String, required: true },
  recipient_lastname: { type: String, required: true },
  recipient_phone: { type: String, required: true },
  selected: { type: Boolean, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Address = mongoose.models.Address || mongoose.model("Address", address);

module.exports = Address;
