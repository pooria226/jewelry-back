const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const storeValidator = (data) => {
  const schema = joi.object({
    image: joi.string().required().messages({
      "any.required": `عکس اجباری است`,
      "string.empty": `عکس باید رشته ای از حروف باشد`,
      "string.base": `عکس باید رشته ای از حروف باشد`,
    }),
    link: joi.string().messages({
      "string.empty": `لینک باید رشته ای از حروف باشد`,
    }),
    position: joi
      .string()
      .required()
      .valid("homeSlider", "homeLaser", "homeBanner")
      .messages({
        "any.required": `محل اسلایدر اجباری است`,
        "string.empty": `باید رشته ای از حروف باشد`,
        "any.only": `باید از محل تعریف شده باشد`,
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
      "string.empty": `شناسه یکتا اجباری است`,
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
    image: joi.string().messages({
      "any.required": `عکس اجباری است`,
      "string.empty": `عکس باید رشته ای از حروف باشد`,
      "string.base": `عکس باید رشته ای از حروف باشد`,
    }),
    link: joi.string().messages({
      "string.empty": `لینک باید رشته ای از حروف باشد`,
    }),
    position: joi
      .string()
      .required()
      .valid("homeSlider", "homeLaser", "homeBanner")
      .messages({
        "any.required": `محل اسلایدر اجباری است`,
        "string.empty": `باید رشته ای از حروف باشد`,
        "any.only": `باید از محل تعریف شده باشد`,
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
      "string.empty": `شناسه یکتا اجباری است`,
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
};
