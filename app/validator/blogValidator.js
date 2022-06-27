const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "any.required": `عنوان اجباری است`,
      "string.empty": `عنوان باید رشته ای از حروف باشد`,
    }),
    slug: joi.string().required().messages({
      "any.required": `اسلاگ اجباری است`,
      "string.empty": `اسلاگ باید رشته ای از حروف باشد`,
    }),
    content: joi.string().required().messages({
      "any.required": `متن اجباری است`,
      "string.empty": `متن باید رشته ای از حروف باشد`,
    }),
    image_origin: joi.string().required().messages({
      "any.required": `عکس اصلی اجباری است`,
      "string.empty": `عکس اصلی  باید رشته ای از حروف باشد`,
    }),
    tags: joi.array().messages({
      "array.empty": `باید ارائه ای از برچسب ها باشد`,
    }),
    category: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    author: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    like: joi.number().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    view: joi.number().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
  });
  const { error } = schema.validate(data, { abortEarly: false });
  console.log("error", error);
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
      "string.empty": `شناسه یکتا اجباری است`,
    }),
    title: joi.string().messages({
      "any.required": `عنوان اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    slug: joi.string().messages({
      "any.required": `اسلاگ اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    image_origin: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    content: joi.string().messages({
      "any.required": `متن اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    tags: joi.array().messages({
      "array.empty": `باید ارائه ای از برچسب ها باشد`,
    }),
    category: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    author: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    like: joi.number().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    view: joi.number().messages({
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
