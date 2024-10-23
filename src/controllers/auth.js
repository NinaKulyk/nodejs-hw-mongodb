import { ACCESS_TOKEN_LIVE_TIME } from '../constants/time.js';
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
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

  res.json({
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
