const User = require("../Model/User.js");
const _ = require("lodash");
module.exports.currentUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
