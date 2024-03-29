require("dotenv").config();
const api_key = process.env.SMS_KEY;
const axios = require("axios");
module.exports.handleSendSms = async (message, phone) => {
  return await axios
    .post(
      "https://api.sms.ir/v1/send/bulk",
      {
        lineNumber: 30007732002798,
        messageText: message,
        mobiles: [phone],
        sendDateTime: null,
      },
      {
        headers: {
          "X-API-KEY": api_key,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
};
