const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/tagValidator");
const Tag = require("../Model/Tag");

module.exports.all = async (req, res) => {
  try {
    const { page } = req.params;
    const perPage = 12;
    const tags = await Tag.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 });
    const tags_count = await (await Tag.find()).length;
    const pages = Math.ceil(tags_count / perPage);
    res.status(200).json({
      data: { tags, pages, count: tags_count },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }

  // const { page } = req.params;
  // const perPage = 10;
  // try {
  //   const blogs = await Blog.find()
  //     .skip((page - 1) * perPage)
  //     .limit(perPage)
  //     .populate({ path: "tags", select: "id title" })
  //     .populate({ path: "category" })
  //     .sort({ create_at: 1 });
  //   const blogs_count = await (await Blog.find()).length;
  //   const pages = Math.ceil(blogs_count / perPage);
  //   res.status(200).json({
  //     data: { blogs, pages, count: blogs_count },
  //     success: true,
  //   });
};
module.exports.store = async (req, res) => {
  try {
    const { title } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dupTag = await Tag.findOne({ title });
    if (dupTag != null)
      return res.status(400).json({
        success: false,
        errors: [{ key: "title", message: "برچسبی با این عنوان ثبت شده است" }],
      });
    await Tag.create({ title, user: req.user.id });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const tag = await Tag.findById(id);
    res.status(200).json({ success: true, data: tag });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dupTag = await Tag.findOne({ title });
    if (dupTag && dupTag._id != id)
      return res.status(400).json({
        success: false,
        errors: [{ key: "title", message: "برچسبی با این عنوان ثبت شده است" }],
      });
    await Tag.findByIdAndUpdate(
      id,
      {
        title,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
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
    await Tag.findByIdAndRemove(id);
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
