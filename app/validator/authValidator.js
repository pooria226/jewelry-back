const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const verifyValidator = (data) => {
  const schema = joi.object({
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره همراه اجباری است`,
      "string.base": `شماره همراه اجباری است`,
      "string.empty": `شماره همراه اجباری است`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
  });
  const { error } = schema.validate(data, { abortEarly: false });
  const array = [];
  console.log("error", error);
  if (error) {
    error.details.map((item, index) => {
      array.push({
        key: item.path[0],
        message: item.message,
      });
    });
  }
  return array;
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
  const { error } = schema.validate(data, { abortEarly: false });
  const array = [];
  if (error) {
    error.details.map((item, index) => {
      array.push({
        key: item.path[0],
        message: item.message,
      });
    });
  }
  return array;
};

module.exports = { verifyValidator, loginValidator };
