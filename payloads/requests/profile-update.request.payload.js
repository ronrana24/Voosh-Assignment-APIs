const Joi = require("joi");

const profileUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  bio: Joi.string().min(3),
  phone: Joi.string().length(10),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = profileUpdateSchema;
