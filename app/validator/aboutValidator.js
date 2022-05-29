const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    first_name: joi.string().required().messages({
      "any.required": `نام  اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    last_name: joi.string().required().messages({
      "any.required": `نام خانوادگی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    post: joi.string().required().messages({
      "any.required": `متن پیام اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    email: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    telegram: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    whatsapp: joi.string().messages({
      "string.empty": `متن پیام اجباری است`,
    }),
    instagram: joi.string().messages({
      "string.empty": `متن پیام اجباری است`,
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
const showValidator = (data) => {
  const schema = joi.object({
    id: joi.string().required().messages({
      "any.required": `شناسه یکتا اجباری است`,
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
const deleteValidator = (data) => {
  const schema = joi.object({
    id: joi.string().required().messages({
      "any.required": `شناسه یکتا اجباری است`,
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
module.exports = { storeValidator, showValidator, deleteValidator };
