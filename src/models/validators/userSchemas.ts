import Joi from 'Joi'

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(), 
})

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
})
