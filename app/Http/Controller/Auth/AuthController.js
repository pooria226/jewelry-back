const User = require("../../Model/User.js");
const { v4: uuidv4 } = require("uuid");
const { codeGenerator } = require("../../../../utils/codeGenerator.js");
const { handleSendSms } = require("../../../../utils/sms.js");
const {
  verifyValidator,
  loginValidator,
} = require("../../../validator/authValidator.js");
const { createTokne } = require("../../../../utils/createToken.js");
module.exports.receive = async (req, res) => {
  try {
    const { phone } = req.body;
    const errors = verifyValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ errors: errors, success: false });
    const user = await User.findOne({ phone });
    if (!user) {
      const user = await User.create({
        phone,
        identification: uuidv4() + "-" + Date.now(),
      });
      const code = codeGenerator();
      user.code = code;
      user.created_code = new Date();
      // const { status } = await handleSendSms(
      //   `کد تایید شما ${code}`,
      //   user.phone
      // );
      await user.save();
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
      // const { status } = await handleSendSms(
      //   `کد تایید شما ${code}`,
      //   user.phone
      // );
      await user.save();
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
    console.log("error", error);
    return res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { code, phone, reagent } = req.body;
    const { error } = loginValidator(req.body);
    if (error) return res.status(401).json({ success: false, errors: error });
    const user = await User.findOne({ phone });
    const master = await User.findOne({ identification: reagent });
    const createdCode = new Date(user.created_code).getMinutes();
    const currentTime = new Date().getMinutes();
    if (createdCode + 10 > currentTime) {
      if (code == user.code) {
        const token = await createTokne(user.id);
        user.code = null;
        user.created_code = null;
        user.isVerifyd = true;
        user.save();
        if (master?.counter <= 5) {
          master.counter += 1;
          await master.save();
        }
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
    console.log("error", error);
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
