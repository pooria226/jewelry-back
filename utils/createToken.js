require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.createTokne = async (id, expiresIn = "24h") => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
    algorithm: "HS512",
  });
};
