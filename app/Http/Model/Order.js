const mongoose = require("mongoose");

const order = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  pay: { type: Boolean, default: false },
  status: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Order = mongoose.model("Order", order);

module.exports = Order;

// status
// 1 =  خرید نشده
// 2 = ثبت شد
// 3 = در حال اماده سازی
// 4 = تحویل به پیک
// 5 = دریافت
