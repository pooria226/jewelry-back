const jwt = require("jsonwebtoken");
const User = require("../Http/Model/User");
module.exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const { id } = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findOne({ _id: id });
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "شما اهراز هویت نشدید" });
  }
};
