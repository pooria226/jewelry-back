const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const loginValidator = (data) => {
  const schema = joi.object({
    phone: joi.required(),
  });
  return schema.validate(data);
};
module.exports = { loginValidator };
