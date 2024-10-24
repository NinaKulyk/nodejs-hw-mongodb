import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';

export const emailClient = nodemailer.createTransport({
  host: env(ENV_VARS.SMTP_HOST),
  port: env(ENV_VARS.SMTP_PORT),
  secure: false,
  auth: {
    user: env(ENV_VARS.SMTP_USERNAME),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
});
