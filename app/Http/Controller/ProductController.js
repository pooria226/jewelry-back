const Product = require("../Model/Product");
const File = require("../Model/File");
const {
  storeValidator,
  showValidator,
  updateValidator,
} = require("../../validator/productValidator");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 10;
  try {
    const products = await Product.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "category" })
      .populate({ path: "image_origin", select: "id name" })
      .populate({ path: "images", select: "id name" })
      .sort({ created_at: -1 });
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
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const product = await Product.findById(id);
    res.status(200).json({ data: product, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const {
      title,
      slug,
      carat,
      price,
      weight,
      category,
      image_origin,
      images,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });

    await Product.create({
      title,
      slug,
      price,
      weight,
      category,
      image_origin,
      images: images,
      carat,
    });
    res.status(200).json({ success: true, message: "با موفقیت ثبت شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      carat,
      price,
      weight,
      category,
      image_origin,
      images,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const prodcut = await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        carat,
        price,
        weight,
        category,
        image_origin,
        images,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    console.log("prodcut", prodcut);
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
