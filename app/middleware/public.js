const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");
const User = require("../Http/Model/User");
require("dotenv").config();
module.exports.public = async (req, res, next) => {
  const token = req?.headers?.authorization?.split("Bearer ")[1];
  if (!isEmpty(token)) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  }
  next();
};
