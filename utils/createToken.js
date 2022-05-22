require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.createTokne = async (id) => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
    algorithm: "HS512",
  });
};
