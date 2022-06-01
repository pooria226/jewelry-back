const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    postal_address: joi.string().required().messages({
      "any.required": `ادرس پستی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    province: joi.string().required().messages({
      "any.required": `استان اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    city: joi.string().required().messages({
      "any.required": `شهر اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    plaque: joi.string().required().messages({
      "any.required": `پلاک اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    postal_code: joi.string().required().min(10).max(10).messages({
      "any.required": `کد پستی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
      "string.min": `حداقل کارکتر باید ده رقم باشد`,
      "string.max": `حداکثر کارکتر باید ده رقم باشد`,
    }),
    unit: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_name: joi.string().required().messages({
      "any.required": `نام گیرنده اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_lastname: joi.string().required().messages({
      "any.required": `نام خانوادگی گیرنده اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_phone: joi.string().required().messages({
      "any.required": `شماره تماس  گیرنده اجباری است`,
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
    postal_address: joi.string().messages({
      "any.required": `ادرس پستی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    province: joi.string().messages({
      "any.required": `استان اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    city: joi.string().messages({
      "any.required": `شهر اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    plaque: joi.string().messages({
      "any.required": `پلاک اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    postal_code: joi.string().min(10).max(10).messages({
      "any.required": `کد پستی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
      "string.min": `حداقل کارکتر باید ده رقم باشد`,
      "string.max": `حداکثر کارکتر باید ده رقم باشد`,
    }),
    unit: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_name: joi.string().messages({
      "any.required": `نام گیرنده اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_lastname: joi.string().messages({
      "any.required": `نام خانوادگی گیرنده اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    recipient_phone: joi.string().messages({
      "any.required": `شماره تماس  گیرنده اجباری است`,
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
  updateValidator,
  deleteValidator,
};
