const User = require("../Model/User.js");
const File = require("../Model/File.js");
const ZarinpalCheckout = require("zarinpal-checkout");
const {
  storeValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} = require("../../validator/userValidator");
const { upload } = require("../../middleware/multer");
const { isEmpty } = require("lodash");
const Payment = require("../Model/Payment.js");
const zarinpal = ZarinpalCheckout.create(process.env.MERCHANTId, true);
module.exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-code -created_code");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.profile = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).select(
      "-code -created_code"
    );
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.profileUpdate = async (req, res) => {
  try {
    upload.uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              key: "avatar",
              message: " فایل باید با /jpeg|jpg|png|svg/ این پسوند ها باشد",
            },
          ],
        });
      } else {
        const id = req.user.id;
        const errors = updateValidator({ ...req.body, id: id });
        if (errors.length > 0)
          return res.status(400).json({ success: false, errors: errors });
        const { first_name, last_name, code_meli, date_of_birth } = req.body;
        const origin = req.protocol + "://" + req.get("host");
        const user = await User.findOneAndUpdate(
          id,
          {
            first_name,
            last_name,
            avatar: !isEmpty(req.file)
              ? origin + "/uploads/" + req.file.filename
              : undefined,
            code_meli,
            date_of_birth,
          },
          { omitUndefined: true, new: true }
        );
        res.status(200).json({ data: user, success: true });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.walet = async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: "http://localhost:3000/api/user/walet/verify",
      Description: "A Payment from jewelry",
      Mobile: req.user.findById,
    });
    if (result.status == 100) {
      await Payment.create({
        user: req.user.id,
        amount: amount,
        authority: result.authority,
      });
      res.status(200).json({ success: true, data: result.url });
    } else {
      res.status(400).json({ message: "مشکلی پیش امده", success: false });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.verifyWalet = async (req, res) => {
  try {
    const authority = req.query.Authority;
    const status = req.query.Status;
    const payment = await Payment.findOne({ authority });
    if (status == "OK") {
      const result = await zarinpal.PaymentVerification({
        Amount: payment.amount,
        Authority: authority,
      });
      if (result.status == -21) {
        res.redirect("https://jewelry.iran.liara.run/");
      } else {
        payment.ref_id = result.RefID;
        payment.success = true;
        await payment.save();
        const user = await User.findById(payment.user);
        user.walet += parseInt(payment.amount || 0);
        await user.save();
        res.redirect("https://jewelry.iran.liara.run/");
      }
    } else {
      res.redirect("https://jewelry.iran.liara.run/");
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.all = async (req, res) => {
  try {
    const { role } = req.body;
    if (role != undefined) {
      const users = await User.find({ role }).select("-code -created_code");
      res.status(200).json({ success: true, data: users });
    } else {
      const users = await User.find().select("-code -created_code");
      res.status(200).json({ success: true, data: users });
    }
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
    const user = await User.findOne({ id });
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      role,
      code_meli,
      isVerifyd,
      isActive,
      date_of_birth,
      avatar,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dupUser = await User.findOne({ phone });
    if (dupUser)
      return res.status(400).json({
        success: false,
        errors: [
          {
            key: "phone",
            message: "کاربری با این شماره قبلا ثبت نام کرده",
          },
        ],
      });
    const image = await File.findById(avatar);
    await User.create({
      first_name,
      last_name,
      phone,
      role,
      avatar: image.name || null,
      code_meli,
      isVerifyd,
      isActive,
      date_of_birth,
    });
    return res.status(200).json({
      success: true,
      message: "کاربر با موفقیت اضافه شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const {
      first_name,
      last_name,
      phone,
      role,
      isVerifyd,
      isActive,
      code_meli,
      date_of_birth,
      avatar,
    } = req.body;
    const image = await File.findById(avatar);
    const user = await User.findOneAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone,
        role,
        isVerifyd,
        isActive,
        avatar: image.name || undefined,
        code_meli,
        date_of_birth,
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ data: user, success: true });
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
    await User.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
