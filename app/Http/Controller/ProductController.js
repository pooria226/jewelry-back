const { upload } = require("../../middleware/multer");
const Product = require("../Model/Product");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 10;
  try {
    const products = await Product.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "categories" })
      .sort({ create_at: 1 });
    const products_count = await (await Product.find()).length;
    const pages = Math.ceil(products_count / perPage);
    res.status(200).json({
      data: { products, pages, count: products_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    upload.uploadArray(req, res, async (err) => {
      console.log("req.files", req.files);
    });
    upload.uploadImageBlog(req, res, async (err) => {
      const { title, slug, price, weight, category } = req.body;
      console.log("req.file", req.file);
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
