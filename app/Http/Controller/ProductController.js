const Product = require("../Model/Product");
const File = require("../Model/File");
const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/productValidator");
const { currentPrice } = require("../../../utils/currentPrice");
const Category = require("../Model/Category");
const { pay } = require("../../../utils/goldPrice");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 12;
  try {
    const products = await Product.find({ isDeleted: false })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "category" })
      .populate({ path: "image_origin", select: "id name" })
      .populate({ path: "images", select: "id name" })
      .sort({ created_at: -1 });
    const products_count = await (
      await Product.find({ isDeleted: false })
    ).length;
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
      weight,
      category,
      image_origin,
      images,
      description,
      percentage,
      like,
      discount,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const image = await File.findById(image_origin);
    const price = await currentPrice();
    const variable = await pay(weight, price, percentage);
    const discount_price = Math.round(variable - (variable * discount) / 100);
    await Product.create({
      title,
      slug,
      price: variable,
      weight,
      category,
      image_origin,
      description,
      images: images,
      image_origin: image?.name || undefined,
      percentage,
      like,
      discount,
      discount_price: discount_price,
    });
    res.status(200).json({ success: true, message: "با موفقیت ثبت شد" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      weight,
      category,
      image_origin,
      images,
      description,
      percentage,
      like,
      discount,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const image = await File.findById(image_origin);
    const price = await currentPrice();
    const variable = await pay(weight, price, percentage);
    const discount_price = Math.round(variable - (variable * discount) / 100);
    await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        price: variable,
        weight,
        category,
        image_origin,
        description,
        images: images,
        image_origin: image?.name || undefined,
        percentage,
        like,
        updated_at: Date.now(),
        discount,
        discount_price: discount_price,
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
    // await Product.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.category = async (req, res) => {
  try {
    const categories = await Category.find({ position: "product" });
    return res.status(200).json({ data: categories, success: true });
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
      const variable = await pay(item?.weight, price, item?.percentage);
      item.price = variable;
      item.discount_price = Math.round(
        variable - (variable * item?.discount) / 100
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
