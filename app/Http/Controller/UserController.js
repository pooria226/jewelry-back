const User = require("../Model/User.js");
const File = require("../Model/File.js");

const {
  storeValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} = require("../../validator/userValidator");
const { upload } = require("../../middleware/multer");

module.exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).select(
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
    const user = await User.findById(req.user.id).select("-code -created_code");
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
    const id = req.user.id;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const { first_name, last_name, code_meli, date_of_birth } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        code_meli,
        date_of_birth,
      },
      { omitUndefined: true, new: true }
    );
    res
      .status(200)
      .json({ data: user, message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.avatarUpdate = async (req, res) => {
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
        const origin = req.protocol + "://" + req.get("host");
        await User.findByIdAndUpdate(
          id,
          {
            avatar: origin + "/uploads/" + req.file.filename || undefined,
          },
          { omitUndefined: true, new: true }
        );
        res.status(200).json({ message: "با موفقیت انجام شد", success: true });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.all = async (req, res) => {
  try {
    const { page } = req.params;
    const perPage = 12;
    const { role } = req.body;
    if (role != undefined) {
      const users = await User.find({ role })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ create_at: 1 })
        .select("-code -created_code");
      const users_count = await (await User.find({ role })).length;
      const pages = Math.ceil(users_count / perPage);
      res
        .status(200)
        .json({ success: true, data: { users, pages, count: users_count } });
    } else {
      const users = await User.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ create_at: 1 })
        .select("-code -created_code");
      const users_count = await (await User.find()).length;
      const pages = Math.ceil(users_count / perPage);
      res
        .status(200)
        .json({ success: true, data: { users, pages, count: users_count } });
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
    const user = await User.findById(id);
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
      avatar: image?.name || undefined,
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
    await User.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone,
        role,
        isVerifyd,
        isActive,
        avatar: image?.name || undefined,
        code_meli,
        date_of_birth,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    res
      .status(200)
      .json({ message: "کاربر با موفقیت ویرایش شد", success: true });
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
module.exports.search = async (req, res) => {
  try {
    const { page } = req.params;
    const { query } = req.body;
    const perPage = 12;
    const regex = new RegExp(query, "i");
    const users = await User.find({ fullname: { $regex: regex } })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 })
      .select("-code -created_code");
    const users_count = await (
      await User.find({ fullname: { $regex: regex } })
    ).length;
    const pages = Math.ceil(users_count / perPage);
    res
      .status(200)
      .json({ success: true, data: { users, pages, count: users_count } });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
