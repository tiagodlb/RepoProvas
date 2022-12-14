import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().equal(Joi.ref('password')),
});

export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
