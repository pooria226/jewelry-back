const User = require("../Model/User.js");
module.exports.currentUser = async (req, res) => {
  try {
    const { id, phone, first_name, last_name, avatar } = req.user;
    res.status(200).json({
      success: true,
      data: { id, phone, first_name, last_name, avatar },
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.all = async (req, res) => {
  try {
    const { role } = req.body;
    const users = await User.find({ role }).select("-code -created_code");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const { first_name, last_name, avatar, phone, role, isActive, isVerifyd } =
      req.body;
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
