import Joi from 'joi';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});
