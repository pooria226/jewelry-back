const User = require("../../Model/User.js");
const { codeGenerator } = require("../../../utils/codeGenerator.js");
const { createTokne } = require("../../../utils/createToken.js");
const { handleSendSms } = require("../../../utils/sms.js");
const { verifyValidator } = require("../../validator/verifyValidator.js");
const { isEmpty } = require("lodash");
module.exports.receive = async (req, res) => {
  try {
    const { phone } = req.body;
    const errors = verifyValidator(req.body);
    if (!isEmpty(errors))
      return res.status(200).json({ errors, success: false });
    const user = await User.findOne({ phone });
    if (!user) {
      await User.create({ phone });
      const code = codeGenerator();
      user.code = code;
      user.created_code = new Date();
      const { status } = await handleSendSms(
        `کد تایید شما ${code}`,
        user.phone
      );

      if (status == 1) {
        user.save();
        res.status(200).json({
          message: "لطفا کد تایید را وارد کنید",
          success: true,
        });
      }
    } else {
      const code = codeGenerator();
      user.code = code;
      user.created_code = new Date();
      const { status } = await handleSendSms(
        `کد تایید شما ${code}`,
        user.phone
      );
      if (status == 200) {
        user.save();
        res.status(200).json({
          message: "لطفا کد تایید را وارد کنید",
          success: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { code, phone } = req.body;
    const user = await User.findOne({ phone });
    const createdCode = new Date(user.created_code).getMinutes();
    const currentTime = new Date().getMinutes();
    if (createdCode + 2 > currentTime) {
      if (code == user.code) {
        const token = await createTokne(user._id);
        user.code = null;
        user.created_code = null;
        user.save();
        res
          .status(200)
          .json({ message: "خوش اومدی", success: true, token: token });
      }
    } else {
      res
        .status(400)
        .json({ message: "کد فعال سازی منقضی شده است", success: false });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
