const Favorite = require("../../Model/Favorite");
const Order = require("../../Model/Order");
const Slider = require("../../Model/Slider");
module.exports.all = async (req, res) => {
  try {
    const homeSlider = await Slider.find({ position: "homeSlider" });
    const homeLaser = await Slider.find({ position: "homeLaser" });
    const homeBanner = await Slider.find({ position: "homeBanner" });
    res.status(200).json({
      success: true,
      data: {
        homeSlider,
        homeLaser,
        homeBanner,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.favoriteLength = async (req, res) => {
  try {
    const favorites = await (
      await Favorite.find({ user: req?.user?._id })
    ).length;
    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.orderLength = async (req, res) => {
  try {
    if (req?.user) {
      const order = await Order.findOne({ user: req?.user?._id });
      res.status(200).json({
        success: true,
        data: order?.products?.length || 0,
      });
    } else {
      res.status(400).json({ message: "مشکلی پیش امده", success: false });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
