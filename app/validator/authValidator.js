const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const verifyValidator = (data) => {
  const schema = joi.object({
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره همراه اجباری است`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
  });
  return schema.validate(data, { abortEarly: false });
};
const loginValidator = (data) => {
  const schema = joi.object({
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره همراه اجباری است`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
    code: joi.string().required().min(5).max(5).messages({
      "any.required": `کد اجباری است`,
      "string.min": `حداقل باید پنج رقم باشد`,
      "string.max": `حداکثر باید پنج رقم باشد`,
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = { verifyValidator, loginValidator };
