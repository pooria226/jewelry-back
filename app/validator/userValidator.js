const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    first_name: joi.string().required().messages({
      "any.required": `نام اجباری است`,
    }),
    last_name: joi.string().required().messages({
      "any.required": `نام خانوادگی اجباری است`,
    }),
    phone: joi.string().required().min(11).max(11).messages({
      "any.required": `شماره همراه اجباری است`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
    role: joi.string().messages({
      "any.required": `سطح درسترسی  اجباری است`,
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
      "string.empty": `نام اجباری است`,
    }),
    last_name: joi.string().messages({
      "string.empty": `باید رشته از حروف باشد`,
    }),
    phone: joi.string().min(11).max(11).messages({
      "string.empty": `باید رشته از حروف باشد`,
      "string.min": `حداقل کارکتر باید یازده رقم باشد`,
      "string.max": `حداکثر کارکتر باید یازده رقم باشد`,
    }),
    role: joi.string().messages({
      "string.empty": `باید رشته از حروف باشد`,
    }),
    avatar: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    isActive: joi.boolean(),
    isVerifyd: joi.boolean(),
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
const orderStoreValidator = (data) => {
  const schema = joi.object({
    products: joi.array().required().messages({
      "any.required": `محصولات اجباری است`,
      "array.empty": `باید ارائه ای از محصولات باشه`,
      "array.base": `باید ارائه ای از محصولات باشه`,
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
  deleteValidator,
  showValidator,
  updateValidator,
  orderStoreValidator,
};
