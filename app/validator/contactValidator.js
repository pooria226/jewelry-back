const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    first_name: joi.string().required().messages({
      "any.required": `نام  اجباری است`,
    }),
    last_name: joi.string().required().messages({
      "any.required": `نام خانوادگی اجباری است`,
    }),
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره همراه اجباری است`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
    content: joi.string().required().messages({
      "any.required": `متن پیام اجباری است`,
    }),
  });
  return schema.validate(data, { abortEarly: false });
};
const showValidator = (data) => {
  const schema = joi.object({
    id: joi.string().required().messages({
      "any.required": `شناسه یکتا اجباری است`,
    }),
  });
  return schema.validate(data, { abortEarly: false });
};
const deleteValidator = (data) => {
  const schema = joi.object({
    id: joi.string().required().messages({
      "any.required": `شناسه یکتا اجباری است`,
    }),
  });
  return schema.validate(data, { abortEarly: false });
};
module.exports = { storeValidator, showValidator, deleteValidator };
