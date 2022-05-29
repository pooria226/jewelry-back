const { handleSendSms } = require("../../../utils/sms");
const {
  storeValidator,
  deleteValidator,
  showValidator,
} = require("../../validator/aboutValidator");
const Team = require("../Model/Team");

module.exports.all = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ data: teams, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
// module.exports.show = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { error } = showValidator(req.params);
//     if (error) return res.status(401).json({ success: false, errors: error });
//     const contact = await Contact.findOne({ id });
//     res.status(200).json({ data: contact, success: true });
//   } catch (error) {
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
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
    } = req.body;
    const { error } = storeValidator(req.body);
    if (error) return res.status(200).json({ errors: error, success: false });
    await Team.create({
      first_name,
      last_name,
      email,
      post,
      telegram,
      whatsapp,
      instagram,
    });
    res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
// module.exports.delete = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { error } = deleteValidator(req.params);
//     if (error) return res.status(401).json({ success: false, errors: error });
//     await Contact.findByIdAndRemove(id);
//     res.status(200).json({ message: "با موفقیت انجام شد", success: true });
//   } catch (error) {
//     res.status(400).json({ message: "مشکلی پیش امده", success: false });
//   }
// };
