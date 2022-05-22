module.exports.contactValidation = ({
  first_name,
  last_name,
  phone,
  content,
}) => {
  const message = {};

  if (!first_name) {
    message.first_name = "نام اجباری است";
  }
  if (!last_name) {
    message.last_name = "نام خانوادگی اجباری است";
  }
  if (!phone) {
    message.phone = "شماره تماس اجباری است";
  }
  if (!content) {
    message.content = "پیام اجباری است";
  }
  return message;
};
