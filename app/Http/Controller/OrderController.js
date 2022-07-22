const Order = require("../Model/Order.js");
const Payment = require("../Model/Payment.js");
const zarinpalCheckout = require("zarinpal-checkout");
const zarinpal = zarinpalCheckout.create(process.env.MERCHANTId, true);
const bcrypt = require("bcrypt");
const { codeGenerator } = require("../../../utils/codeGenerator.js");
module.exports.ordersAll = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      pay: false,
    });
    res.status(200).json({ data: orders, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.ordersPay = async (req, res) => {
  try {
    const { orderId } = req.params;
    let amount = 0;
    const orders = await Order.findById(orderId).populate({
      path: "products",
      select: "title price",
    });
    const product_price = orders.products.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
    amount = product_price;
    const result = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: "https://jewelry-back.iran.liara.run/api/orders/verify",
      Description: "A Payment from Yazdan Gold",
      Mobile: req.user.phone,
    });
    if (result.status == 100) {
      await Payment.create({
        user: req.user._id,
        amount: amount,
        authority: result.authority,
        orders: orders.id,
      });
      res.status(200).json({ success: true, data: result.url });
    } else {
      res.status(400).json({ message: "مشکلی پیش امده", success: false });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.verifyOrder = async (req, res) => {
  try {
    const authority = req.query.Authority;
    const status = req.query.Status;
    const payment = await Payment.findOne({ authority });
    if (status == "OK") {
      const result = await zarinpal.PaymentVerification({
        Amount: payment.amount,
        Authority: authority,
      });
      if (result.status == -21) {
        res.redirect("https://jewelry.iran.liara.run/dashboard");
      } else {
        payment.ref_id = result.RefID;
        payment.success = true;
        await payment.save();
        const order = await Order.findById(payment.orders);
        const code = codeGenerator();
        console.log("code", code);
        const code_hash = await bcrypt.hash(code.toString(), 10);
        order.pay = true;
        order.status = 1;
        order.delivery_code = code_hash;
        await order.save();
        res.redirect("https://jewelry.iran.liara.run/dashboard");
      }
    } else {
      res.redirect("https://jewelry.iran.liara.run/dashboard");
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
