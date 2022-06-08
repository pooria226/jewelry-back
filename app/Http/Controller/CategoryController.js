const {
  storeValidator,
  showValidator,
  updateValidator,
} = require("../../validator/categoryValidator");
const Category = require("../Model/Category");

module.exports.all = async (req, res) => {
  try {
    const perPage = 12;
    const { page } = req.params;
    const { parent_id } = req.body;
    if (parent_id) {
      const categories = await Category.find({ parent_id })
        .skip((page - 1) * perPage)
        .populate({ path: "parent_id" })
        .limit(perPage)
        .sort({ create_at: 1 });
      const categories_count = await (
        await Category.find({ parent_id })
      ).length;
      const pages = Math.ceil(categories_count / perPage);
      res.status(200).json({
        data: { categories, pages, count: categories_count, category: false },
        success: true,
      });
    } else {
      const categories = await Category.find({ parent_id: { $eq: null } })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ create_at: 1 });
      const categories_count = await (
        await Category.find({ parent_id: { $eq: null } })
      ).length;
      const pages = Math.ceil(categories_count / perPage);
      res.status(200).json({
        data: { categories, pages, count: categories_count, category: true },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { title, parent_id } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dupCategory = await Category.findOne({ title });
    if (dupCategory)
      return res.status(400).json({
        success: false,
        errors: [
          {
            key: "title",
            message: "دسته بندی ای با این عنوان ذخیره شده است",
          },
        ],
      });
    await Category.create({ title, user: req.user._id, parent_id });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const category = await Category.findById(id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Category.findByIdAndUpdate(
      id,
      {
        title,
        updated_at: Date.now(),
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
    const errors = updateValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Category.findByIdAndRemove(id);
    const categories = await Category.find({ parent_id: id });
    categories.map(async (item) => {
      await Category.findByIdAndRemove(item._id);
    });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
