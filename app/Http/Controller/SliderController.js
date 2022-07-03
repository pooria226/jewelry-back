const {
  storeValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} = require("../../validator/SliderValidation");
const File = require("../Model/File");
const Slider = require("../Model/Slider");

module.exports.all = async (req, res) => {
  try {
    const { position } = req.body;
    const sliders = await Slider.find({ position });
    res.status(200).json({
      data: sliders,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { image, position, link } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const img = await File.findById(image);
    await Slider.create({
      position,
      user: req.user.id,
      image: img?.name || undefined,
      link,
    });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const slider = await Slider.findById(id);
    res.status(200).json({ success: true, data: slider });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, position, link } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const img = await File.findById(image);
    await Slider.findByIdAndUpdate(
      id,
      {
        position,
        user: req.user.id,
        image: img?.name || undefined,
        link,
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Slider.findByIdAndRemove(id);
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
