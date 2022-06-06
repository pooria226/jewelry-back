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
    recipient_phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره تماس  گیرنده اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
      "string.min": ` شماره تماس حداقل کارکتر باید یازده رقم باشد `,
      "string.max": ` شماره تماس حداکثر کارکتر باید یازده رقم باشد`,
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
      "string.empty": `ادرس پستی باید رشته ای از حروف باشد`,
    }),
    province: joi.string().messages({
      "any.required": `استان اجباری است`,
      "string.empty": `استان باید رشته ای از حروف باشد`,
    }),
    city: joi.string().messages({
      "any.required": `شهر اجباری است`,
      "string.empty": `شهر باید رشته ای از حروف باشد`,
    }),
    plaque: joi.string().messages({
      "any.required": `پلاک اجباری است`,
      "string.empty": `پلاک باید رشته ای از حروف باشد`,
    }),
    postal_code: joi.string().min(10).max(10).messages({
      "any.required": `کد پستی اجباری است`,
      "string.empty": `کد پستی باید رشته ای از حروف باشد`,
      "string.min": `کد پستی حداقل کارکتر باید ده رقم باشد`,
      "string.max": `کد پستی حداکثر کارکتر باید ده رقم باشد`,
    }),
    unit: joi.string().messages({
      "string.empty": `واحد باید رشته ای از حروف باشد`,
    }),
    recipient_name: joi.string().messages({
      "any.required": `نام گیرنده اجباری است`,
      "string.empty": `نام گیرنده باید رشته ای از حروف باشد`,
    }),
    recipient_lastname: joi.string().messages({
      "any.required": `نام خانوادگی گیرنده اجباری است`,
      "string.empty": ` نام خانوادگی باید رشته ای از حروف باشد`,
    }),
    recipient_phone: joi.string().min(11).max(11).messages({
      "any.required": `شماره تماس  گیرنده اجباری است`,
      "string.empty": ` شماره تماس باید رشته ای از حروف باشد`,
      "string.min": ` شماره تماس حداقل کارکتر باید یازده رقم باشد `,
      "string.max": ` شماره تماس حداکثر کارکتر باید یازده رقم باشد`,
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
