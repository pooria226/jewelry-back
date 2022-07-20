const Product = require("../../Model/Product");
const Category = require("../../Model/Category");
const Like = require("../../Model/Like");
const Favorite = require("../../Model/Favorite");
const Order = require("../../Model/Order");
const Comment = require("../../Model/Comment");
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
    const products = await Product.find({ isPublished: true, isDeleted: false })
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
module.exports.show = async (req, res) => {
  try {
    const { slug } = req.params;
    let liked = false;
    let favorite = false;
    let inOrder = false;
    const product = await Product.findOne({ slug: slug })
      .populate({
        path: "category",
      })
      .populate({
        path: "images",
        select: "id name",
      })
      .populate({
        path: "comments",
        match: { isPublished: true },
        populate: {
          path: "user",
          select: "id first_name last_name avatar",
        },
      })
      .populate({
        path: "comments",
        match: { isPublished: true },
        populate: {
          path: "user_answer",
          select: "id first_name last_name avatar",
        },
      });
    if (!product)
      return res
        .status(400)
        .json({ message: "مشکلی پیش امده", success: false });
    product.view = product?.view + 1;
    await product.save();
    const target = await Like.findOne({
      user: req?.user?._id,
      target_id: product?._id,
    });
    const favorite_target = await Favorite.findOne({
      user: req?.user?._id,
      product_id: product?._id,
    });
    const order_target = await Order.findOne({
      user: req?.user?._id,
      products: product?._id,
      pay: false,
    });
    if (target) {
      liked = true;
    }
    if (favorite_target) {
      favorite = true;
    }
    if (order_target) {
      inOrder = true;
    }
    res.status(200).json({
      success: true,
      data: { product, liked: liked, favorite: favorite, inOrder: inOrder },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.like = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate({
        path: "category",
      })
      .populate({
        path: "images",
        select: "id name",
      });
    const dup_like = await Like.findOne({
      user: req.user?._id,
      target_id: product?._id,
    });
    if (dup_like) {
      await dup_like.remove();
      product.like -= 1;
      await product.save();
      return res.status(200).json({
        data: { product, liked: false },
        message: "با موفقیت انجام شد",
        success: true,
      });
    } else {
      await Like.create({
        target_id: product?._id,
        position: "product",
        user: req?.user?._id,
      });
      product.like += 1;
      await product.save();
      return res.status(200).json({
        data: { product, liked: true },
        message: "با موفقیت انجام شد",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.favorite = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const dup_favorite = await Favorite.findOne({
      user: req.user?._id,
      product_id: product?._id,
    });
    if (dup_favorite) {
      await dup_favorite.remove();
      return res.status(200).json({
        message: "با موفقیت انجام شد",
        success: true,
      });
    } else {
      await Favorite.create({
        product_id: product?._id,
        user: req?.user?._id,
      });
      return res.status(200).json({
        message: "با موفقیت انجام شد",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.order = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const order = await Order.findOne({ user: req?.user?._id, pay: false });
    if (order) {
      const dupItem = order.products.filter(
        (item) => item?._id.toString() == product?._id.toString()
      );
      if (dupItem.length > 0) {
        const filterdItem = order.products.filter(
          (item) => item?._id.toString() != product?._id.toString()
        );
        order.products = filterdItem;
        await order.save();
      } else {
        order.products.push({
          _id: product?._id,
          title: product?.title,
          price: product?.price,
          image_origin: product?.image_origin,
          weight: product?.weight,
          slug: product?.slug,
          increase_at: Date.now(),
        });
        await order.save();
      }
    } else {
      await Order.create({
        user: req?.user?._id,
        products: [
          {
            _id: product?._id,
            title: product?.title,
            price: product?.price,
            image_origin: product?.image_origin,
            weight: product?.weight,
            slug: product?.slug,
            increase_at: Date.now(),
          },
        ],
      });
    }
    return res.status(200).json({
      message: "با موفقیت انجام شد",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.addComment = async (req, res) => {
  try {
    const { content, slug } = req.body;
    const product = await Product.findOne({ slug });
    console.log("product", product);
    const comment = await Comment.create({
      content: content,
      user: req?.user?._id,
      model: "product",
      target: {
        _id: product?._id,
        title: product?.title,
        category: product?.category?.title,
        image_origin: product?.image_origin,
      },
    });
    product.comments = [...product?.comments, comment._id];
    await product.save();
    return res.status(200).json({
      message: "دیدگاه شما با موفقیت ثبت شد و پس از بررسی منتشر می شود",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
