const Order = require("../Model/Order.js");
const Payment = require("../Model/Payment.js");
const zarinpalCheckout = require("zarinpal-checkout");
const zarinpal = zarinpalCheckout.create(process.env.MERCHANTId, true);
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
      CallbackURL: "http://localhost:3001/api/orders/verify",
      Description: "A Payment from jewelry",
      Mobile: req.user.phone,
    });
    if (result.status == 100) {
      await Payment.create({
        user: req.user.id,
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
        res.redirect("http://localhost:3000/dashboard");
      } else {
        payment.ref_id = result.RefID;
        payment.success = true;
        await payment.save();
        const order = await Order.findById(payment.orders);
        order.pay = true;
        order.status = 1;
        await order.save();
        res.redirect("http://localhost:3000/dashboard");
      }
    } else {
      res.redirect("http://localhost:3000/dashboard");
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
