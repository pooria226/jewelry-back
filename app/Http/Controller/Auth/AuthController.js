const User = require("../../Model/User.js");
const { codeGenerator } = require("../../../../utils/codeGenerator.js");
const { createTokne } = require("../../../../utils/createToken.js");
const { handleSendSms } = require("../../../../utils/sms.js");
const {
  verifyValidator,
  loginValidator,
} = require("../../../validator/authValidator.js");
module.exports.receive = async (req, res) => {
  try {
    const { phone } = req.body;
    const { error } = verifyValidator(req.body);
    if (error) return res.status(200).json({ errors: error, success: false });
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
      user.save();
      return res.status(200).json({
        message: "لطفا کد تایید را وارد کنید",
        success: true,
        code: code,
      });
      // if (status == 200) {
      //   user.save();
      //   return res.status(200).json({
      //     message: "لطفا کد تایید را وارد کنید",
      //     success: true,
      //     code: code,
      //   });
      // }
    } else {
      const code = codeGenerator();
      user.code = code;
      user.created_code = new Date();
      const { status } = await handleSendSms(
        `کد تایید شما ${code}`,
        user.phone
      );
      user.save();
      return res.status(200).json({
        message: "لطفا کد تایید را وارد کنید",
        success: true,
        code: code,
      });
      // if (status == 200) {
      //   user.save();
      //   return res.status(200).json({
      //     message: "لطفا کد تایید را وارد کنید",
      //     success: true,
      //     code: code,
      //   });
      // }
    }
  } catch (error) {
    return res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { code, phone } = req.body;
    const { error } = loginValidator(req.body);
    if (error) return res.status(401).json({ success: false, errors: error });
    const user = await User.findOne({ phone });
    const createdCode = new Date(user.created_code).getMinutes();
    const currentTime = new Date().getMinutes();
    if (createdCode + 10 > currentTime) {
      if (code == user.code) {
        const token = await createTokne(user.id);
        user.code = null;
        user.created_code = null;
        user.isVerifyd = true;
        user.save();
        return res
          .status(200)
          .json({ message: "خوش اومدی", success: true, token: token });
      } else {
        return res
          .status(400)
          .json({ message: "کد فعال سازی منقضی شده است", success: false });
      }
    } else {
      return res
        .status(400)
        .json({ message: "کد فعال سازی منقضی شده است", success: false });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
