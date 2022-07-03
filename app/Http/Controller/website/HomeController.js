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
