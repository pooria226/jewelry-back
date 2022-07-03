require("dotenv").config();
const api_key = process.env.NEXT_PUBLIC_APP_BASE_TALA;
const axios = require("axios");
module.exports.goldPrice = async () => {
  return await axios
    .post(`http://nerkh-api.ir/api/${api_key}/gold/`)
    .catch((err) => {
      console.log(err);
    });
};
