const Discount = require("../Model/Discount");
const Order = require("../Model/Order");

module.exports.all = async (req, res) => {
  try {
    const discounts = await Discount.find({
      user: req?.user?._id,
    });
    res.status(200).json({
      data: discounts,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.use = async (req, res) => {
  try {
    const { code, order_id } = req.body;
    const discount = await Discount.findOne({ code: code });
    if (discount?.user.toString() != req?.user?._id?.toString()) {
      return res
        .status(200)
        .json({ message: "کد تخفیف مربوط به این کاربر نیست", success: false });
    }
    const createdTime = new Date(discount?.created_at).getDate();
    const currentTime = new Date().getDate();
    if (createdTime + 1 < currentTime) {
      return res
        .status(200)
        .json({ message: "کد تخفیف منقضی شده است", success: false });
    }
    const order = await Order.findById(order_id).populate({ path: "products" });
    if (!order) {
      return res
        .status(200)
        .json({ message: "سبد خرید شما خالی است", success: false });
    }
    order.discount = discount?._id;
    await order.save();
    const product_price = order?.products.reduce((acc, item) => {
      if (item?.discount != 0) {
        return (acc += item.discount_price);
      } else {
        return (acc += item.price);
      }
    }, 0);
    const sum = Math.round(
      product_price - (product_price * discount?.percentage) / 100
    );
    res.status(200).json({
      data: sum,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
