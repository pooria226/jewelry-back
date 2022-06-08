const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    first_name: joi.string().required().messages({
      "any.required": `نام  اجباری است`,
      "string.empty": `نام  باید رشته ای از حروف باشد`,
      "string.base": `نام باید رشته ای از حروف باشد`,
    }),
    last_name: joi.string().required().messages({
      "any.required": `نام خانوادگی اجباری است`,
      "string.empty": `نام خانوادگی باید رشته ای از حروف باشد`,
      "string.base": `نام خانوادگی باید رشته ای از حروف باشد`,
    }),
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره تماس اجباری است`,
      "string.min": `شماره تماس حداقل کارکتر باید یازده رقم باشد `,
      "string.max": `شماره تماس حداکثر کارکتر باید یازده رقم باشد`,
      "string.empty": `شماره تماس باید رشته ای از حروف باشد`,
      "string.base": `شماره تماس باید رشته ای از حروف باشد`,
    }),
    content: joi.string().required().messages({
      "any.required": `متن پیام اجباری است`,
      "string.empty": `متن پیام باید رشته ای از حروف باشد `,
      "string.base": `متن پیام باید رشته ای از حروف باشد `,
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
