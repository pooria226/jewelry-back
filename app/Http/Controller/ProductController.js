const Product = require("../Model/Product");
const File = require("../Model/File");
const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/productValidator");
const { currentPrice } = require("../../../utils/currentPrice");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 12;
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
      price,
      weight,
      category,
      image_origin,
      images,
      description,
      percentage,
      like,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const image = await File.findById(image_origin);
    await Product.create({
      title,
      slug,
      price,
      weight,
      category,
      image_origin,
      description,
      images: images,
      image_origin: image?.name || undefined,
      percentage,
      like,
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
      price,
      weight,
      category,
      image_origin,
      images,
      description,
      percentage,
      like,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const image = await File.findById(image_origin);

    await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        price,
        weight,
        category,
        image_origin,
        description,
        images: images,
        image_origin: image?.name || undefined,
        percentage,
        like,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Product.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.priceCorrecdddtion = async (req, res) => {
  try {
    const products = await Product.find();
    const price = await currentPrice();
    console.log("price", price);
    products.map(async (item) => {
      item.price = Math.round(
        item.weight * price + (item.weight * price * item.percentage) / 100
      );
      await item.save();
    });
    return res.status(200).json({
      success: true,
      message: "با موفقیت انجام شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی ccccپیش امده", success: false });
  }
};

module.exports.publish = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(
      id,
      {
        isPublished: true,
        published_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    return res.status(200).json({
      success: true,
      message: "با موفقیت انجام شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.unPublish = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(
      id,
      {
        isPublished: false,
        published_at: null,
      },
      { omitUndefined: true, new: true }
    );
    return res.status(200).json({
      success: true,
      message: "با موفقیت انجام شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.search = async (req, res) => {
  try {
    const { page } = req.params;
    const { query } = req.body;
    const perPage = 12;
    const regex = new RegExp(query, "i");
    const products = await Product.find({ title: { $regex: regex } })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 })
      .select("-code -created_code");
    const products_count = await (
      await Product.find({ title: { $regex: regex } })
    ).length;
    const pages = Math.ceil(products_count / perPage);
    res.status(200).json({
      success: true,
      data: { products, pages, count: products_count },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
