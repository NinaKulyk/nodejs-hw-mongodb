import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.config({
  cloud_name: env(ENV_VARS.CLOUD_NAME),
  api_key: env(ENV_VARS.API_KEY),
  api_secret: env(ENV_VARS.API_SECRET),
});

export const saveImageToCloudinary = async (file) => {
  const res = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);

  return res.secure_url;
};
