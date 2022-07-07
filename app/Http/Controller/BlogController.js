const Blog = require("../Model/Blog");
const File = require("../Model/File");
const User = require("../Model/User");
const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/blogValidator");
const Category = require("../Model/Category");
const Tag = require("../Model/Tag");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 12;
  try {
    const blogs = await Blog.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" })
      .populate({ path: "category" })
      .sort({ create_at: 1 });
    const blogs_count = await (await Blog.find()).length;
    const pages = Math.ceil(blogs_count / perPage);
    res.status(200).json({
      data: { blogs, pages, count: blogs_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.store = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      tags,
      category,
      image_origin,
      like,
      view,
      author,
      description,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ errors: errors, success: false });
    const dup_blog = await Blog.findOne({ title });
    if (dup_blog)
      return res.status(400).json({
        errors: [{ key: "title", message: "مقاله ای با این نام ثبت شده است" }],
        success: false,
      });
    /// handle slug condition
    const image = await File.findById(image_origin);
    const authorUser = await User.findById(author);
    await Blog.create({
      title,
      slug,
      content,
      tags,
      category,
      author: {
        _id: authorUser?._id,
        fullname: authorUser?.first_name + " " + authorUser?.last_name,
      },
      like,
      view,
      image_origin: image?.name || undefined,
      description,
    });
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
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
    const blog = await Blog.findById(id)
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" })
      .populate({ path: "category" });
    res.status(200).json({ data: blog, success: true });
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
      content,
      tags,
      category,
      author,
      image_origin,
      like,
      view,
      description,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const image = await File.findById(image_origin);
    const authorUser = await User.findById(author);
    await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        tags,
        category,
        author: {
          _id: authorUser?._id,
          fullname: authorUser?.first_name + " " + authorUser?.last_name,
        },
        like,
        view,
        image_origin: image?.name || undefined,
        updated_at: Date.now(),
        description,
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
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
    await Blog.findByIdAndRemove(id);
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
    const categories = await Category.find();
    return res.status(200).json({ data: categories, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.tag = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json({ data: tags, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.publish = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(
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
    await Blog.findByIdAndUpdate(
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
module.exports.userBloger = async (req, res) => {
  try {
    const users = await User.find({ role: "bloger" });
    return res.status(200).json({
      data: users,
      success: true,
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
    const blogs = await Blog.find({ title: { $regex: regex } })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 })
      .select("-code -created_code");
    const blogs_count = await (
      await Blog.find({ title: { $regex: regex } })
    ).length;
    const pages = Math.ceil(blogs_count / perPage);
    res
      .status(200)
      .json({ success: true, data: { blogs, pages, count: blogs_count } });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
