const { showValidator } = require("../../validator/blogValidator.js");
const Order = require("../Model/Order.js");
const bcrypt = require("bcrypt");
module.exports.ordersAll = async (req, res) => {
  try {
    const { status } = req.body;
    const { page } = req.params;
    let finder = {};
    const perPage = 12;
    if (status == 0) {
      finder = {};
    }
    if (status == 1) {
      finder.status = 1;
    }
    if (status == 2) {
      finder.status = 2;
    }
    if (status == 3) {
      finder.status = 3;
    }

    const orders = await Order.find(finder)
      .populate({
        path: "user",
      })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 });
    const orders_count = await (await Order.find(finder)).length;
    const pages = Math.ceil(orders_count / perPage);
    res.status(200).json({
      data: { orders, pages, count: orders_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const order = await Order.findById(id).populate({
      path: "user",
    });
    res.status(200).json({ data: order, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const order = await Order.findById(id);
    const isEqual = await bcrypt.compare(code || "", order.delivery_code);
    if (isEqual) {
      order.delivery_code = null;
      order.verifyed = true;
      order.verifyed_at = Date.now();
      order.status = 2;
      await order.save();
      res
        .status(200)
        .json({ success: true, message: "کد تحویل وارد شده صحیح  بود" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "کد تحویل وارد شده صحیح نبود" });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
