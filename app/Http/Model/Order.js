const mongoose = require("mongoose");

const order = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: { type: Array },
  pay: { type: Boolean, default: false },
  status: { type: Number, default: 1 },
  delivery_code: { type: String, default: null },
  verifyed: { type: Boolean, default: false },
  verifyed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Order = mongoose.model("Order", order);

module.exports = Order;

// status
// 1 =  جاری
// 2 =  تحویل شده
// 3 =  مرجوع شده
