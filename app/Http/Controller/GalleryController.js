const File = require("../Model/File");
const Folder = require("../Model/Folder");

module.exports.index = async (req, res) => {
  const { folder_id } = req.body;
  try {
    if (folder_id) {
      const files = await File.find({ folder_id: folder_id });
      const folders = await Folder.find({ folder_id: folder_id });
      res.status(200).json({ success: true, data: { files, folders } });
    } else {
      const files = await File.find({
        folder_id: { $eq: null },
      });
      const folders = await Folder.find();
      res.status(200).json({ success: true, data: { files, folders } });
    }
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
module.exports.storeFile = async (req, res) => {
  try {
    const { folder_id } = req.body;
    req?.files.map(async (item, index) => {
      const name = req.get("origin") + "/uploads/" + item.filename;
      if (folder_id) {
        await File.create({ name, folder_id });
      } else {
        await File.create({ name });
      }
    });
    res.status(200).json({ success: true, data: "successfuly" });
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
module.exports.storeFolder = async (req, res) => {
  try {
    const { name, folder_id } = req.body;
    const dupFolder = await Folder.findOne({ name });
    if (dupFolder)
      return res
        .status(400)
        .json({ success: false, data: "فولدری با این نام وجود دارد" });
    if (folder_id) {
      await Folder.create({ name, folder_id });
    } else {
      await Folder.create({ name });
    }
    res.status(200).json({ success: true, data: "successfuly" });
  } catch (error) {
    res.status(200).json({ success: false, errors: error });
  }
};
