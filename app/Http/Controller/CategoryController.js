const Category = require("../Model/Category");

module.exports.index = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { title, model } = req.body;
    await Category.create({ title, model, user: req.user.id });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ success: false, errors: error });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title,
      },
      { omitUndefined: true, new: true }
    );
    await category.save();
    res.status(200).json({ success: true, data: "successfully" });
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndRemove(id);
    res.status(200).json({ success: true, data: "successfully" });
  } catch (error) {
    res.status(200).json({ success: false, errors: error.errors });
  }
};
