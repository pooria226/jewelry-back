const Comment = require("../Model/Comment");
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
    await Comment.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "دیدگاه با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
