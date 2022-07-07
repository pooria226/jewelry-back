const { isEmpty } = require("lodash");
const Product = require("../../Model/Product");
const Category = require("../../Model/Category");
const Tag = require("../../Model/Tag");
const User = require("../../Model/User");
var ObjectId = require("mongoose").Types.ObjectId;
module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 12;
  try {
    const products = await Product.find({ isPublished: true, isDeleted: false })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "category" })
      .sort({ create_at: 1 });
    const products_count = await (
      await Product.find({ isPublished: true, isDeleted: false })
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
// module.exports.show = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const user = req.user;
//     const blog = await Blog.findOne({ slug: slug })
//       .populate({ path: "tags", select: "id title" })
//       .populate({ path: "author", select: "id first_name last_name" })
//       .populate({ path: "category" });
//     const likedItem = user?.favorite_blog.filter(
//       (item) => item.title == blog.title
//     )[0];
//     blog.view += 1;
//     await blog.save();
//     res.status(200).json({
//       success: true,
//       data: { blog, liked: !isEmpty(likedItem) ? true : false },
//     });
//   } catch (error) {
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
// module.exports.search = async (req, res) => {
//   try {
//     let finder;
//     const { page } = req.params;
//     const { query, category, tags } = req.body;
//     const perPage = 9;
//     const regex = new RegExp(query, "i");
//     if (query && !category && !tags) {
//       finder = { title: regex };
//     }
//     if (!query && category && !tags) {
//       finder = { category: category };
//     }
//     if (!query && !category && tags) {
//       finder = { tags: tags };
//     }
//     if (query && category && !tags) {
//       finder = { title: regex, category: category };
//     }
//     if (!query && category && tags) {
//       finder = { tags: tags, category: category };
//     }
//     if (query && !category && tags) {
//       finder = { title: regex, category: category };
//     }
//     if (query && category && tags) {
//       finder = { title: regex, category: category, tags: tags };
//     }
//     console.log("finder", finder);
//     const blogs = await Blog.find(finder)
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .select("-code -created_code")
//       .populate({ path: "tags", select: "id title" })
//       .populate({ path: "author", select: "id first_name last_name" })
//       .populate({ path: "category" });
//     const blogs_count = await (await Blog.find(finder)).length;
//     const pages = Math.ceil(blogs_count / perPage);
//     res
//       .status(200)
//       .json({ success: true, data: { blogs, pages, count: blogs_count } });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
// module.exports.category = async (req, res) => {
//   try {
//     const categories = await Category.find({ position: "blog" });
//     return res.status(200).json({ data: categories, success: true });
//   } catch (error) {
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
// module.exports.tag = async (req, res) => {
//   try {
//     const tags = await Tag.find();
//     return res.status(200).json({ data: tags, success: true });
//   } catch (error) {
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
// module.exports.like = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     const user = await User.findById(req.user.id).populate({
//       path: "favorite_blog",
//       select: "id title",
//     });
//     const likedItem = user?.favorite_blog.filter(
//       (item) => item.title == blog.title
//     )[0];
//     if (likedItem) {
//       user.favorite_blog = user?.favorite_blog.filter(
//         (item) => item.title != blog.title
//       )[0];
//       blog.like -= 1;
//     } else {
//       user.favorite_blog = [...user.favorite_blog, blog._id];
//       blog.like += 1;
//     }
//     await user.save();
//     await blog.save();
//     return res.status(200).json({
//       data: { blog, liked: !isEmpty(likedItem) ? true : false },
//       message: "با موفقیت انجام شد",
//       success: true,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
