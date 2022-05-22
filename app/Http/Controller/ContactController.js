const { isEmpty } = require("lodash");
const { handleSendSms } = require("../../../utils/sms");
const { contactValidation } = require("../../validator/contactValidation");
const Contact = require("../Model/Contact");

module.exports.store = async (req, res) => {
  try {
    const { first_name, last_name, phone, content } = req.body;
    const errors = contactValidation(req.body);
    if (!isEmpty(errors)) {
      return res.status(200).json({ errors, success: false });
    }
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
