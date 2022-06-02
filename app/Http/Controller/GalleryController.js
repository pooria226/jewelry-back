const { upload } = require("../../middleware/multer");
const { deleteValidator } = require("../../validator/galleryValidator");
const File = require("../Model/File");
const Folder = require("../Model/Folder");

module.exports.all = async (req, res) => {
  try {
    const { folder_id } = req.body;
    if (folder_id) {
      const files = await File.find({ folder_id });
      const folders = await Folder.find({ folder_id });
      res.status(200).json({ success: true, data: { folders, files } });
    } else {
      const files = await File.find({ folder_id: { $eq: null } });
      const folders = await Folder.find({ folder_id: { $eq: null } });
      res.status(200).json({ success: true, data: { files, folders } });
    }
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.storeFile = async (req, res) => {
  try {
    upload.uploadArray(req, res, async (err) => {
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
        const { folder_id } = req.body;
        const origin = req.protocol + "://" + req.get("host");
        req?.files.map(async (item, index) => {
          const name = origin + "/uploads/" + item.filename;
          await File.create({ name, folder_id });
        });
        res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.storeFolder = async (req, res) => {
  try {
    const { name, folder_id } = req.body;
    if (folder_id == null) {
      const dupFolder = await Folder.findOne({
        name,
        folder_id: { $eq: null },
      });
      if (dupFolder)
        return res
          .status(400)
          .json({ success: false, data: "فولدری با این نام وجود دارد" });
    } else {
      const dupFolders = await Folder.find({ folder_id });
      const results = dupFolders.filter((item) => item.name == name)[0];
      if (results)
        return res
          .status(400)
          .json({ success: false, data: "فولدری با این نام وجود دارد" });
    }
    await Folder.create({ name, folder_id });
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.updateFolder = async (req, res) => {
  try {
    const { name, folder_id } = req.body;
    if (folder_id == null) {
      const dupFolder = await Folder.findOne({
        name,
        folder_id: { $eq: null },
      });
      if (dupFolder)
        return res
          .status(400)
          .json({ success: false, data: "فولدری با این نام وجود دارد" });
    } else {
      const dupFolders = await Folder.find({ folder_id });
      const results = dupFolders.filter((item) => item.name == name)[0];
      if (results)
        return res
          .status(400)
          .json({ success: false, data: "فولدری با این نام وجود دارد" });
    }
    await Folder.findByIdAndUpdate(
      folder_id,
      {
        name,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ success: true, message: "با موفقیت انجام شد" });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Folder.findByIdAndRemove(id);
    const folders = await Folder.find({ folder_id: id });
    const files = await Folder.find({ folder_id: id });
    folders.map(async (item) => {
      await Folder.findByIdAndRemove(item.id);
    });
    files.map(async (item) => {
      await File.findByIdAndRemove(item.id);
    });
    return res.status(200).json({
      success: true,
      message: "فولدر با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await File.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "فایل با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
