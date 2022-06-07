const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "any.required": `عنوان اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    slug: joi.string().required().messages({
      "any.required": `اسلاگ اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    price: joi.number().required().messages({
      "any.required": `قیمت اجباری است`,
      "number.empty": `باید عدد باشد`,
    }),
    weight: joi.number().required().messages({
      "any.required": `وزن اجباری است`,
      "number.empty": `باید عدد باشد`,
    }),
    image_origin: joi.string().required().messages({
      "any.required": `عکس اصلی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    images: joi.array().messages({
      "array.empty": `باید ارائه ای از عکس ها باشد`,
    }),
    category: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    carat: joi.number().required().messages({
      "any.required": `عیار طلا اجباری است`,
      "number.empty": `باید عدد باشد`,
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
    price: joi.number().messages({
      "any.required": `قیمت اجباری است`,
      "number.empty": `باید عدد باشد`,
    }),
    weight: joi.number().messages({
      "any.required": `وزن اجباری است`,
      "number.empty": `باید عدد باشد`,
    }),
    image_origin: joi.string().messages({
      "any.required": `عکس اصلی اجباری است`,
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    images: joi.array().messages({
      "array.empty": `باید ارائه ای از عکس ها باشد`,
    }),
    category: joi.string().messages({
      "string.empty": `باید رشته ای از حروف باشد`,
    }),
    carat: joi.number().messages({
      "any.required": `عیار طلا اجباری است`,
      "number.empty": `باید عدد باشد`,
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
};