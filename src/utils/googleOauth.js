import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';
import fs from 'node:fs';
import path from 'node:path';

const googleConfigPath = path.join(process.cwd(), 'google.json');

const googleOauthParams = JSON.parse(
  fs.readFileSync(googleConfigPath).toString(),
);

const client = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_OAUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_OAUTH_SECRET),
  redirectUri: env(ENV_VARS.GOOGLE_OAUTH_REDIRECT_URI),
});
