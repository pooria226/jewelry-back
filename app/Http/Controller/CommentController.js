const Comment = require("../Model/Comment");
const Blog = require("../Model/Blog");
const Product = require("../Model/Product");
const { deleteValidator } = require("../../validator/userValidator");
module.exports.all = async (req, res) => {
  try {
    const { page } = req.params;
    const perPage = 12;
    const comments = await Comment.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({
        path: "user",
        select: "phone first_name last_name",
      })
      .sort({ create_at: 1 });
    const comments_count = await (await Comment.find()).length;
    const pages = Math.ceil(comments_count / perPage);
    res.status(200).json({
      success: true,
      data: { comments, pages, count: comments_count },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.publish = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    comment.isPublished = !comment.isPublished;
    await comment.save();
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.answer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(id);
    comment.answer = content;
    comment.answerd_at = Date.now();
    comment.user_answer = req?.user?._id;
    comment.hasAnswered = true;
    await comment.save();
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
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
    const comment = await Comment.findById(id);
    if (comment?.model == "blog") {
      const blog = await Blog.findById(comment?.target?._id);
      const filterd = blog?.comments?.filter((item) => item != id);
      blog.comments = filterd;
      await blog.save();
    }
    if (comment.model == "product") {
      const product = await Product.findById(comment?.target?._id);
      const filterd = product?.comments?.filter((item) => item != id);
      product.comments = filterd;
      await product.save();
    }
    await comment.remove();
    return res.status(200).json({
      success: true,
      message: "دیدگاه با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
