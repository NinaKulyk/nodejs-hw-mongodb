const errorHandlerMiddleware = (err, rew, res, next) => {
  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
  next();
};

export default errorHandlerMiddleware;
