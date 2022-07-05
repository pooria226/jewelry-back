const Blog = require("../../Model/Blog");
const Category = require("../../Model/Category");
const Tag = require("../../Model/Tag");
module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 1;
  try {
    const blogs = await Blog.find({ isPublished: true })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" })
      .populate({ path: "category" })
      .sort({ create_at: 1 });
    const blogs_count = await (await Blog.find({ isPublished: true })).length;
    const pages = Math.ceil(blogs_count / perPage);
    res.status(200).json({
      data: { blogs, pages, count: blogs_count },
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
    const perPage = 1;
    const regex = new RegExp(query, "i");
    const blogs = await Blog.find({
      isPublished: true,
      title: { $regex: regex },
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 })
      .select("-code -created_code")
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" });
    const blogs_count = await (
      await Blog.find({ isPublished: true, title: { $regex: regex } })
    ).length;
    const pages = Math.ceil(blogs_count / perPage);
    res
      .status(200)
      .json({ success: true, data: { blogs, pages, count: blogs_count } });
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
