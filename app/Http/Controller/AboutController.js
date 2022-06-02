const {
  storeValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} = require("../../validator/aboutValidator");
const Team = require("../Model/Team");
const File = require("../Model/File");

module.exports.all = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ data: teams, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.store = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      post,
      telegram,
      whatsapp,
      instagram,
      avatar,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(200).json({ errors: errors, success: false });
    const image = await File.findById(avatar);
    await Team.create({
      first_name,
      last_name,
      email,
      post,
      telegram,
      whatsapp,
      instagram,
      avatar: image.name || null,
    });
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
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
    const team = await Team.findOne({ id });
    res.status(200).json({ data: team, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      post,
      telegram,
      whatsapp,
      instagram,
      avatar,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const image = await File.findById(avatar);
    await Team.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        email,
        post,
        telegram,
        whatsapp,
        instagram,
        avatar: image.name || undefined,
        updated_at: Date.now(),
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
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
    await Team.findByIdAndRemove(id);
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
