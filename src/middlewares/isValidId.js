import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
  (isName = 'id') =>
  (req, res, next) => {
    const id = req.params[isName];

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid id'));
    }

    return next();
  };
