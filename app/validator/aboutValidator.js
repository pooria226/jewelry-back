const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    first_name: joi.string().required().messages({
      "any.required": `نام اجباری است`,
      "string.empty": `نام باید رشته ای از حروف باشد`,
    }),
    last_name: joi.string().required().messages({
      "any.required": `نام خانوادگی اجباری است`,
      "string.empty": `نام خانوادگی باید رشته ای از حروف باشد`,
    }),
    post: joi.string().required().messages({
      "any.required": `صمت اجباری است`,
      "string.empty": `صمت باید رشته ای از حروف باشد`,
    }),
    email: joi.string().email().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
      "string.email": `ایمیل باید معتبر باشد`,
    }),
    telegram: joi.string().messages({
      "string.empty": `ادرس تلگرام باید رشته ای از حروف باشد`,
    }),
    whatsapp: joi.string().messages({
      "string.empty": `ادرس واتس اپ باید رشته ای از حروف باشد`,
    }),
    instagram: joi.string().messages({
      "string.empty": `ادرس اینستاگرام باید رشته ای از حروف باشد`,
    }),
    avatar: joi.string().required().messages({
      "any.required": `تصویر پروفایل اجباری است`,
      "string.empty": `تصویر پروفایل باید رشته ای از حروف باشد`,
    }),
  });
  const { error } = schema.validate(data, { abortEarly: false });
  console.log(error);
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
const updateValidator = (data) => {
  const schema = joi.object({
    id: joi.string().required().messages({
      "any.required": `شناسه یکتا اجباری است`,
    }),
    first_name: joi.string().messages({
      "any.required": `نام  اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    last_name: joi.string().messages({
      "any.required": `نام خانوادگی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    post: joi.string().messages({
      "any.required": `متن پیام اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    email: joi.string().email().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
      "string.email": `ایمیل باید معتبر باشد`,
    }),
    telegram: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    whatsapp: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    instagram: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    avatar: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
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
module.exports = {
  storeValidator,
  showValidator,
  deleteValidator,
  updateValidator,
};
