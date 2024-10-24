import Joi from 'joi';

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  phoneNumber: Joi.string().pattern(/^\+?[0-9]{7,15}$/),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
}).min(1);
