const Faq = require("../Model/Faq");
const {
  storeValidator,
  showValidator,
  deleteValidator,
  updateValidator,
} = require("../../validator/faqValidator");

module.exports.all = async (req, res) => {
  try {
    const { page } = req.params;
    const perPage = 12;
    const faq = await Faq.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 });
    const faq_count = await (await Faq.find()).length;
    const pages = Math.ceil(faq_count / perPage);
    res.status(200).json({
      data: { faq, pages, count: faq_count },
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Faq.create({ question, answer });
    res.status(200).json({
      message: "با موفقیت انجام شد",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const faq = await Faq.findById(id);
    res.status(200).json({
      data: faq,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Faq.findByIdAndUpdate(
      id,
      {
        question,
        answer,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Faq.findByIdAndRemove(id);
    res.status(200).json({
      message: "با موفقیت انجام شد",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "مشکلی پیش امده", success: false });
  }
};
