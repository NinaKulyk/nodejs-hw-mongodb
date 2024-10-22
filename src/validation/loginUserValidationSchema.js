import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required().min(6).max(20),
});
