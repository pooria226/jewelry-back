const { isEmpty } = require("lodash");
const Blog = require("../../Model/Blog");
const Category = require("../../Model/Category");
const Like = require("../../Model/Like");
const Tag = require("../../Model/Tag");
const User = require("../../Model/User");
var ObjectId = require("mongoose").Types.ObjectId;
module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 9;
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
module.exports.show = async (req, res) => {
  try {
    const { slug } = req.params;
    let liked = false;
    const blog = await Blog.findOne({ slug: slug })
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" })
      .populate({ path: "category" });
    blog.view += 1;
    await blog.save();
    const target = await Like.findOne({
      user: req?.user?._id,
      target_id: blog?._id,
    });
    if (target) {
      liked = true;
    }
    res.status(200).json({
      success: true,
      data: { blog, liked: liked },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.search = async (req, res) => {
  try {
    let finder = {};
    const { page } = req.params;
    const { query, category, tags } = req.body;
    const perPage = 9;
    const regex = new RegExp(query, "i");

    if (query) {
      finder.title = regex;
    }
    if (category) {
      finder.category = category;
    }
    if (tags) {
      finder.tags = tags;
    }
    const blogs = await Blog.find(finder)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select("-code -created_code")
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "author", select: "id first_name last_name" })
      .populate({ path: "category" });
    const blogs_count = await (await Blog.find(finder)).length;
    const pages = Math.ceil(blogs_count / perPage);
    res
      .status(200)
      .json({ success: true, data: { blogs, pages, count: blogs_count } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.category = async (req, res) => {
  try {
    const categories = await Category.find({ position: "blog" });
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
module.exports.like = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const dup_like = await Like.findOne({
      user: req.user?._id,
      target_id: blog?._id,
    });
    if (dup_like) {
      await dup_like.remove();
      blog.like -= 1;
      await blog.save();
      return res.status(200).json({
        data: { blog, liked: false },
        message: "با موفقیت انجام شد",
        success: true,
      });
    } else {
      await Like.create({
        target_id: blog?._id,
        position: "blog",
        user: req?.user?._id,
      });
      blog.like += 1;
      await blog.save();
      return res.status(200).json({
        data: { blog, liked: true },
        message: "با موفقیت انجام شد",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.news = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ create_at: 1 })
      .limit(5);
    return res.status(200).json({
      data: blogs,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
