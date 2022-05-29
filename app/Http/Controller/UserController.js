const User = require("../Model/User.js");
const {
  storeValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} = require("../../validator/userValidator");
const { upload } = require("../../middleware/multer");
const { isEmpty } = require("lodash");
module.exports.currentUser = async (req, res) => {
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
        const {
          first_name,
          last_name,
          phone,
          role,
          code_meli,
          isVerifyd,
          isActive,
          date_of_birth,
        } = req.body;
        const errors = storeValidator(req.body);
        if (errors.length > 0)
          return res.status(400).json({ success: false, errors: errors });
        const dupUser = await User.findOne({ phone });
        const origin = req.protocol + "://" + req.get("host");
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
        await User.create({
          first_name,
          last_name,
          phone,
          role,
          avatar: origin + "/uploads/" + req.file.filename,
          code_meli,
          isVerifyd,
          isActive,
          date_of_birth,
        });
        return res.status(200).json({
          success: true,
          message: "کاربر با موفقیت اضافه شد",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
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
        } = req.body;
        const origin = req.protocol + "://" + req.get("host");
        const user = await User.findOneAndUpdate(
          id,
          {
            first_name,
            last_name,
            phone,
            role,
            isVerifyd,
            isActive,
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
