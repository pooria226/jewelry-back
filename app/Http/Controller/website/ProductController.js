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
module.exports.news = async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true })
      .sort({ create_at: 1 })
      .limit(10)
      .populate({ path: "category" })
      .sort({ create_at: 1 });
    return res.status(200).json({
      data: products,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
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
module.exports.search = async (req, res) => {
  try {
    let finder = {};
    const { page } = req.params;
    const { query, category, weightFrom, weightTo, priceFrom, priceTo } =
      req.body;
    const perPage = 9;
    const regex = new RegExp(query, "i");
    if (query) {
      finder.title = regex;
    }
    if (category) {
      finder.category = category;
    }

    if (weightFrom && !weightTo) {
      finder.weight = { $gte: weightFrom };
    }
    if (!weightFrom && weightTo) {
      finder.weight = { $lte: weightTo };
    }
    if (weightFrom && weightTo) {
      finder.weight = { $gte: weightFrom, $lt: weightTo };
    }

    if (priceFrom && !priceTo) {
      finder.price = { $gte: priceFrom };
    }
    if (!priceFrom && priceTo) {
      finder.price = { $lte: priceTo };
    }
    if (priceFrom && priceTo) {
      finder.price = { $gte: priceFrom, $lt: priceTo };
    }

    console.log("finder", finder);
    const products = await Product.find(finder)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select("-code -created_code")
      .populate({ path: "category" });
    const products_count = await (await Product.find(finder)).length;
    const pages = Math.ceil(products_count / perPage);
    res.status(200).json({
      success: true,
      data: { products, pages, count: products_count },
    });
  } catch (error) {
    console.log(error);
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
