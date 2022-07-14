const Favorite = require("../Model/Favorite");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 12;
  try {
    const favorites = await Favorite.find({ user: req?.user?._id })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "product_id" })
      .sort({ created_at: -1 });
    const favorites_count = await (await Favorite.find()).length;
    const pages = Math.ceil(favorites_count / perPage);
    res.status(200).json({
      data: { favorites, pages, count: favorites_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findOneAndRemove({ product_id: id, user: req?.user?._id });
    return res.status(200).json({
      success: true,
      message: "محصول با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
