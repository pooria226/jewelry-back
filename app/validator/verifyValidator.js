module.exports.verifyValidator = ({ phone }) => {
  const message = {};
  if (!phone) {
    message.phone = "شماره تماس اجباری است";
  }
  return message;
};
