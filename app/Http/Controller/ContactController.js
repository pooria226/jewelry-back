const { handleSendSms } = require("../../../utils/sms");
const {
  storeValidator,
  deleteValidator,
  showValidator,
} = require("../../validator/contactValidator");
const Contact = require("../Model/Contact");

module.exports.all = async (req, res) => {
  try {
    const { page } = req.params;
    const perPage = 12;
    const contacts = await Contact.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 });
    const contact_count = await (await Contact.find()).length;
    const pages = Math.ceil(contact_count / perPage);
    res.status(200).json({
      data: { contacts, pages, count: contact_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const contact = await Contact.findOne({ id });
    res.status(200).json({ data: contact, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { first_name, last_name, phone, content } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ errors: errors, success: false });
    await Contact.create({ first_name, last_name, phone, content });
    const { status } = await handleSendSms(
      `پیام شما با موفقیت ثبت شد به زودی با شما ارتباط میگیریم`,
      phone
    );
    if (status == 200) {
      res
        .status(200)
        .json({ message: "پیام شما با موفقیت ثبت شد", success: true });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    await Contact.findByIdAndRemove(id);
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
