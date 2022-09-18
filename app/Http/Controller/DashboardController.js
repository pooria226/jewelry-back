const Blog = require("../Model/Blog");
const Order = require("../Model/Order");
const Product = require("../Model/Product");
const User = require("../Model/User");

module.exports.orders = async (req, res) => {
  try {
    const openOrder = await Order.find({
      user: req?.user?._id,
      status: 1,
      pay: true,
    }).populate({ path: "products" });
    const deliveredOrder = await Order.find({
      user: req?.user?._id,
      status: 2,
      pay: true,
    }).populate({ path: "products" });
    const returnedOrder = await Order.find({
      user: req?.user?._id,
      status: 3,
      pay: true,
    }).populate({ path: "products" });
    res.status(200).json({
      data: { openOrder, deliveredOrder, returnedOrder },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.counter = async (req, res) => {
  try {
    const userLength = await (await User.find()).length;
    const orderLength = await (await Order.find({ status: 1 })).length;
    const blogLength = await (await Blog.find()).length;
    const productLength = await (
      await Product.find({ isDeleted: false })
    ).length;
    res.status(200).json({
      data: { userLength, orderLength, blogLength, productLength },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
