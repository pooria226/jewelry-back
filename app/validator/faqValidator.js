const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const storeValidator = (data) => {
  const schema = joi.object({
    question: joi.string().required().messages({
      "any.required": `سوال  اجباری است`,
      "string.empty": `سوال باید رشته ای از حروف باشد`,
      "string.base": `سوال باید رشته ای از حروف باشد`,
    }),
    answer: joi.string().required().messages({
      "any.required": `جواب  اجباری است`,
      "string.empty": `جواب باید رشته ای از حروف باشد`,
      "string.base": `جواب باید رشته ای از حروف باشد`,
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
    question: joi.string().messages({
      "any.required": `سوال  اجباری است`,
      "string.empty": `سوال باید رشته ای از حروف باشد`,
      "string.base": `سوال باید رشته ای از حروف باشد`,
    }),
    answer: joi.string().messages({
      "any.required": `جواب  اجباری است`,
      "string.empty": `جواب باید رشته ای از حروف باشد`,
      "string.base": `جواب باید رشته ای از حروف باشد`,
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
  showValidator,
  updateValidator,
  deleteValidator,
};
