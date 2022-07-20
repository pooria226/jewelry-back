const Order = require("../Model/Order");

module.exports.orders = async (req, res) => {
  try {
    const openOrder = await Order.find({
      user: req?.user?._id,
      status: 1,
      pay: true,
    });
    const deliveredOrder = await Order.find({
      user: req?.user?._id,
      status: 2,
      pay: true,
    });
    const returnedOrder = await Order.find({
      user: req?.user?._id,
      status: 3,
      pay: true,
    });
    res.status(200).json({
      data: { openOrder, deliveredOrder, returnedOrder },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
