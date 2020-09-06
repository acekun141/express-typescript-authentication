import * as Joi from "@hapi/joi";

export const LoginDto = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const RegisterDto = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const LogoutDto = Joi.object({
  refreshToken: Joi.string().required()
});

export const RefreshDto = Joi.object({
  refreshToken: Joi.string().required()
})