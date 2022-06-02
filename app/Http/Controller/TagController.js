const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/tagValidator");
const Tag = require("../Model/Tag");

module.exports.all = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { title } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dupTag = await Tag.findOne({ title });
    if (dupTag != null)
      return res
        .status(400)
        .json({ success: false, message: "برچسبی با این عنوان ثبت شده است" });
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
    const tag = await Tag.findOne({ id });
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
    if (dupTag != null)
      return res
        .status(400)
        .json({ success: false, message: "برچسبی با این عنوان ثبت شده است" });
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
