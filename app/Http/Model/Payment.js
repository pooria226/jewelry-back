const mongoose = require("mongoose");

const payment = mongoose.Schema({
  amount: { type: String },
  authority: { type: String },
  ref_id: { type: String },
  success: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Payment = mongoose.model("Payment", payment);

module.exports = Payment;
