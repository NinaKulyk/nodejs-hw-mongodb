import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  requestGoogleOauthUrlController,
  requestResetPasswordTokenController,
  resetPasswordController,
  verifyGoogleOauthController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { requestResetPasswordTokenValidationSchema } from '../validation/requestResetPasswordTokenSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';
import { verifyGoogleOauthValidationSchema } from '../validation/verifyGoogleOauthValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordTokenValidationSchema),
  ctrlWrapper(requestResetPasswordTokenController),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post(
  '/request-google-oauth-link',
  ctrlWrapper(requestGoogleOauthUrlController),
);
authRouter.post(
  '/verify-oauth',
  validateBody(verifyGoogleOauthValidationSchema),
  ctrlWrapper(verifyGoogleOauthController),
);

export default authRouter;
