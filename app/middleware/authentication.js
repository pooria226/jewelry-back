const jwt = require("jsonwebtoken");
const User = require("../Http/Model/User");
require("dotenv").config();
module.exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "شما اهراز هویت نشدید" });
  }
};
