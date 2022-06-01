const mongoose = require("mongoose");

const payment = mongoose.Schema({
  amont: { type: String },
  payment_code: { Type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Payment = mongoose.model("Payment", payment);

module.exports = Payment;
