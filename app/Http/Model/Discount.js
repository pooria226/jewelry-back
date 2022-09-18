const mongoose = require("mongoose");

const discount = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  code: { type: String, default: null },
  percentage: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Discount = mongoose.model("Discount", discount);

module.exports = Discount;
