import createHttpError from 'http-errors';
import { sessionModel } from '../db/models/session.js';
import { userModel } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Auth header is required'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header must be of type Bearer'));
  }

  const session = await sessionModel.findOne({ accessToken: token });

  if (!session) {
    return next(
      createHttpError(401, 'Auth toke is not associated with any session'),
    );
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Auth token is expired'));
  }

  const user = await userModel.findById(session.userId);

  if (!user) {
    return next(
      createHttpError(401, 'No user is associated with this session'),
    );
  }

  req.user = user;

  next();
};
