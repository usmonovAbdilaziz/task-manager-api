const Joi = require("joi");

const createUserValidator = (data) => {
  const admin = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("USER", "ADMIN").default("USER"),
  });
  return admin.validate(data);
};
const loginUserValidator = (data) => {
  const admin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return admin.validate(data);
};
const signinUserValidator = (data) => {
  const admin = Joi.object({
    email: Joi.string().email().required(),
  });
  return admin.validate(data);
};
const changePasswordUserValidator = (data) => {
  const admin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    otp: Joi.string().length(6).required(),
  });
  return admin.validate(data);
};
const updateUserValidator = (data) => {
  const admin = Joi.object({
    fullName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid("USER", "ADMIN").default("USER"),
  });
  return admin.validate(data);
};

module.exports = {
  createUserValidator,
  loginUserValidator,
  signinUserValidator,
  updateUserValidator,
  changePasswordUserValidator,
};
