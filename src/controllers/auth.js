import { ACCESS_TOKEN_LIVE_TIME } from '../constants/time.js';
import {
  getGoogleOauthLink,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  resetPassword,
  sendResetPasswordToken,
} from '../services/auth.js';

const setupSessionCookies = (session, res) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });
};

export const registerUserController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user },
  });
};

export const loginUserController = async (req, res) => {
  const { body } = req;
  const session = await loginUser(body);

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.cookies.sessionId, req.cookies.sessionToken);

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const requestResetPasswordTokenController = async (req, res) => {
  await sendResetPasswordToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export const requestGoogleOauthUrlController = async (req, res) => {
  const link = await getGoogleOauthLink();

  res.status(200).json({
    status: 200,
    message: 'Password requested oauth link',
    data: { link },
  });
};
