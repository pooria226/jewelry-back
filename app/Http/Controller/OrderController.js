const Order = require("../Model/Order.js");
const Payment = require("../Model/Payment.js");
const zarinpalCheckout = require("zarinpal-checkout");
const zarinpal = zarinpalCheckout.create(process.env.MERCHANTId, true);
const bcrypt = require("bcrypt");
const { codeGenerator } = require("../../../utils/codeGenerator.js");
const Address = require("../Model/Address.js");
const Product = require("../Model/Product.js");
const { currentPrice } = require("../../../utils/currentPrice.js");
const { pay } = require("../../../utils/goldPrice.js");
const Discount = require("../Model/Discount.js");
const { handleSendSms } = require("../../../utils/sms.js");
const User = require("../Model/User.js");
module.exports.ordersAll = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      pay: false,
    }).populate({
      path: "products",
    });

    res.status(200).json({ data: orders, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.ordersPay = async (req, res) => {
  try {
    const { orderId } = req.params;
    const address = await Address.find({
      user: req?.user?._id,
      selected: true,
    });
    const orders = await Order.findById(orderId).populate({
      path: "products",
      select: "title price",
    });
    const price = await currentPrice();
    orders?.products?.map(async (item, index) => {
      const product = await Product.findById(item);
      const variable = await pay(product?.weight, price, product?.percentage);

      product.price = variable;
      product.discount_price = Math.round(
        variable - (variable * product?.discount) / 100
      );
      await product.save();
    });
    const order_update = await Order.findById(orderId).populate({
      path: "products",
    });
    const discount = await Discount.findById(order_update?.discount);
    const product_price = order_update.products.reduce((acc, item) => {
      if (item?.discount != 0) {
        return (acc += item.discount_price);
      } else {
        return (acc += item.price);
      }
    }, 0);
    const sum = Math.round(
      product_price - (product_price * discount?.percentage || 0) / 100
    );
    if (address.length == 0) {
      return res
        .status(200)
        .json({ success: false, message: "ادرسی برای خود انتخاب نکردید" });
    }
    const result = await zarinpal.PaymentRequest({
      Amount: sum,
      CallbackURL: "http://localhost:3001/api/orders/verify",
      Description: "A Payment from Yazdan Gold",
      Mobile: req.user.phone,
    });
    if (result.status == 100) {
      await Payment.create({
        user: req.user._id,
        amount: sum,
        authority: result.authority,
        orders: order_update._id,
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
    const user = await User.findById(payment?.user);
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
        await Discount.findByIdAndRemove(order?.discount);
        const address = await Address.findOne({
          user: payment?.user,
          selected: true,
        });

        const code = codeGenerator();
        const code_hash = await bcrypt.hash(code.toString(), 10);
        order.pay = true;
        order.status = 1;
        order.delivery_code = code_hash;
        order.address = { ...address };
        order.useDiscount = true;
        await order.save();
        await handleSendSms(
          `درخواست شما با موفقیت ثبت شد. کد تحویل شما: ${code}`,
          user.phone
        );
        res.redirect("http://localhost:3000/dashboard");
      }
    } else {
      res.redirect("http://localhost:3000/dashboard");
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
//    https://jewelry.iran.liara.run/dashboard
